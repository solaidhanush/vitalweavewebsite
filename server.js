const http = require('http');
const fs = require('fs');
const path = require('path');

let port = parseInt(process.env.PORT || 4173, 10);
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  
  const filePath = path.join(__dirname, decodeURIComponent(reqPath));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

function startServer(currentPort) {
  server.listen(currentPort, () => {
    console.log(`\n🚀 Server is running at: http://localhost:${currentPort}/`);
    console.log(`   - Home:               http://localhost:${currentPort}/index.html`);
    console.log(`   - RPM & Chronic Care: http://localhost:${currentPort}/rpm-chronic-care.html`);
    console.log(`   - Sleep Apnea:        http://localhost:${currentPort}/sleep-apnea.html`);
    console.log(`   - Cardiovascular ECG: http://localhost:${currentPort}/cardiovascular-ecg.html`);
    console.log(`   - AI/ML Digital Twin: http://localhost:${currentPort}/ai-ml-digital-twin.html\n`);
    console.log(`Press Ctrl + C to stop the server anytime.\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is in use, trying port ${port + 1}...`);
    port++;
    startServer(port);
  } else {
    console.error('Server error:', err);
  }
});

startServer(port);
