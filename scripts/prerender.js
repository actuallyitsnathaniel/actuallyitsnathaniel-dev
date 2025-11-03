/**
 * Simple prerendering script for SEO
 *
 * This script:
 * 1. Starts a local server with the built files
 * 2. Uses Puppeteer to render the React app
 * 3. Captures the HTML after React hydration
 * 4. Injects it into the index.html file
 *
 * Run after build: node scripts/prerender.js
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, '../build');
const INDEX_PATH = join(BUILD_DIR, 'index.html');

// Check if build exists
if (!existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('🚀 Starting prerender process...\n');

// Start a simple static file server
const server = createServer((request, response) => {
  return handler(request, response, {
    public: BUILD_DIR,
    cleanUrls: false,
  });
});

const PORT = 3333;

server.listen(PORT, async () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);

  try {
    // Dynamic import of puppeteer
    const puppeteer = await import('puppeteer');

    console.log('🌐 Launching browser...');
    const browser = await puppeteer.default.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport for desktop rendering
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('📄 Loading page...');
    await page.goto(`http://localhost:${PORT}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait extra time for React to fully hydrate and GitHub API to potentially load
    console.log('⏳ Waiting for React hydration...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the rendered HTML
    console.log('📦 Capturing HTML...');

    // Get content directly from the DOM (more reliable)
    const bodyContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML : '';
    });

    const html = await page.content();

    await browser.close();
    console.log('✅ Browser closed');

    // Extract the root div content - find content between <div id="root"> and </div> followed by any whitespace and script
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>[\s\n]*(?:<script|<!--|$)/);

    if (!bodyContent || !bodyContent.trim()) {
      console.warn('⚠️  Warning: Could not extract rendered content. Root div appears empty.');
      console.warn('   This might happen if React takes too long to render.');
      console.warn('   The build will continue, but try increasing the wait time if needed.');
    } else {
      console.log('✅ Successfully captured rendered content');

      // Read the original build index.html
      const originalHtml = readFileSync(INDEX_PATH, 'utf-8');

      // Replace empty root div with rendered content
      const prerenderedHtml = originalHtml.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${bodyContent}</div>`
      );

      // Write back to index.html
      writeFileSync(INDEX_PATH, prerenderedHtml, 'utf-8');

      console.log('✅ Prerendered HTML injected into build/index.html');
      console.log('\n📊 Stats:');
      console.log(`   Original size: ${originalHtml.length} bytes`);
      console.log(`   Prerendered size: ${prerenderedHtml.length} bytes`);
      console.log(`   Added content: ${bodyContent.length} bytes`);
    }

    console.log('\n✨ Prerendering complete!');

  } catch (error) {
    console.error('\n❌ Error during prerendering:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure puppeteer is installed: npm install puppeteer --save-dev');
    console.error('2. Check that the build completed successfully');
    console.error('3. Try increasing the timeout if your site is slow to load');
    process.exit(1);
  } finally {
    server.close();
    process.exit(0);
  }
});

// Handle errors
server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});
