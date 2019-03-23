const http = require('http');
const fs = require('fs');
const url = require('url');

'ipa/getsamles/1234567890'

http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'GET' && !parsedUrl.pathname.startsWith('/api/')) {
    staticServer(request, response, parsedUrl);
  } else if (request.method === 'POST') {
    postData(request, response, parsedUrl)
  }
}).listen(3000, () => {
  console.log('Server is working at 3000 port');
})

function staticServer(request, response, parsedUrl) {
  let filename = parsedUrl.pathname.slice(1);
  filename = filename ? `public/${filename}` : 'public/index.html';
  const fileStream = fs.createReadStream(filename);
  fileStream.on('open', () => {
      fileStream.pipe(response);
    })
    .on('error', (error) => {
      console.log(error);
      response.statusCode = 404;
      response.end('Resource mising');
    })
}

function postData(request, response, parsedUrl) {
  let data = '';
  request.on('data', chunk => {
    data += chunk.toString();
  })
  request.on('end', () => {
    response.setHeader('content-type', 'application/json');
    response.statusCode = 404;
    fs.writeFileSync('userdata.json', data);
    response.end(data);
  })
}