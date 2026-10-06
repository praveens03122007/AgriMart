/**
 * AgriMart development/static server.
 *
 * This server intentionally serves the current demo as static assets only.
 * It does not expose REST endpoints or persist application data. The API
 * contract documented in README.md is therefore a forward-looking backend
 * contract for a subsequent implementation/review.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

// Keep MIME handling explicit so the browser receives the expected content
// type for each asset used by the single-page application.
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Ignore query parameters when resolving static asset paths.
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Missing assets are a normal 404; filesystem failures are surfaced as
      // a generic 500 without leaking internal paths to the browser.
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        console.error('[AgriMart Static Server]', err);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 AgriMart Local Server running at http://localhost:${PORT}/`);
});
