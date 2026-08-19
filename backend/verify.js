const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, res => {
  console.log(`Health Check statusCode: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

const syncOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/sync/manual',
  method: 'POST'
};

const syncReq = http.request(syncOptions, res => {
  console.log(`Sync Check statusCode: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

syncReq.on('error', error => {
  console.error(error);
});

syncReq.end();
