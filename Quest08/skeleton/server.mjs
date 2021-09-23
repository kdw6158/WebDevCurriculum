import http from 'http';

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (req.url === '/') {
      res.end('<div>Hello World!!</div>');
    } else if (req.url === '/foo') {
      let bar = 'barbar';
      res.end(`<div>Hello, ${bar} </div>`);
    } else if (req.url === '/pic/show') {
      console.log('show');
    } else if (req.url === '/pic/download') {
      console.log('download');
    }
  } else {
    if (req.url === '/foo') {
      res.end('bar');
    } else if (req.url === '/pic/upload') {
      console.log('pic upload');
    }
  }
});

server.listen(8001, () => {
  console.log('Server is running');
});

// server.on('listening', () => {});
