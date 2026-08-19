const http = require('http');

const loginData = JSON.stringify({
  email: '7778889990',
  password: 'password123'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Login:", data);
    const token = JSON.parse(data).token;
    if (token) {
      http.get({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/me',
        headers: { 'Authorization': 'Bearer ' + token }
      }, (res2) => {
        let data2 = '';
        res2.on('data', chunk => data2 += chunk);
        res2.on('end', () => {
          console.log("Me:", data2);
        });
      });
    }
  });
});
req.write(loginData);
req.end();
