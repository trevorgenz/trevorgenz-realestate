/**
 * Deploy to Hostinger — run with: node deploy.mjs
 * Zips the project and deploys via Hostinger API
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ZIP_PATH = path.join(__dirname, '_deploy.zip');
const DOMAIN = 'trevorgenz.realestate'; // update once domain is live on Hostinger
const API_TOKEN = 'PubA4XXZezjKojBJQCOcLIBfKn6TZYD0aXOiCD0A63b20df1';
const MCP_SERVER = 'C:\\Users\\trevo\\AppData\\Roaming\\npm\\node_modules\\hostinger-api-mcp\\src\\servers\\all.js';

const EXCLUDE = ['node_modules', '.next', 'out', '_deploy.zip', '.git', 'start-dev.cmd'];

async function createZip() {
  console.log('📦 Creating deployment zip...');
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(ZIP_PATH);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      const mb = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`✅ Zip created: ${mb} MB`);
      resolve();
    });

    archive.on('error', reject);
    archive.pipe(output);

    archive.glob('**/*', {
      cwd: __dirname,
      ignore: EXCLUDE.map(e => `${e}/**`).concat(EXCLUDE),
      dot: true,
    });

    archive.finalize();
  });
}

async function deployViaMcp() {
  console.log('🚀 Deploying to Hostinger...');

  return new Promise((resolve, reject) => {
    const server = spawn('node', [MCP_SERVER], {
      env: { ...process.env, API_TOKEN },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const rl = createInterface({ input: server.stdout });
    let initialized = false;

    rl.on('line', (line) => {
      if (!line.trim()) return;
      try {
        const msg = JSON.parse(line);

        if (!initialized && msg.result?.protocolVersion) {
          initialized = true;
          const req = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: {
              name: 'hosting_deployJsApplication',
              arguments: {
                domain: DOMAIN,
                archivePath: ZIP_PATH,
                removeArchive: true,
              },
            },
          };
          server.stdin.write(JSON.stringify(req) + '\n');
          console.log('📡 Upload started — this may take a minute...');
        }

        if (msg.id === 2) {
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            const result = JSON.parse(msg.result?.content?.[0]?.text || '{}');
            resolve(result);
          }
          server.kill();
        }
      } catch {
        // non-JSON line, ignore
      }
    });

    server.stderr.on('data', (d) => {
      const text = d.toString().trim();
      if (text && !text.includes('[INFO]') && !text.includes('Initialized') && !text.includes('starting')) {
        console.log('  ', text);
      }
    });

    server.on('error', reject);

    server.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'deploy-script', version: '1.0.0' } },
    }) + '\n');
  });
}

async function main() {
  try {
    await createZip();
    const result = await deployViaMcp();
    console.log('\n✅ Deployment triggered!');
    console.log(`   Check ${DOMAIN} in 2-3 minutes.`);
    if (result?.buildUuid) console.log(`   Build ID: ${result.buildUuid}`);
  } catch (err) {
    console.error('\n❌ Deploy failed:', err.message);
    if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);
    process.exit(1);
  }
}

main();
