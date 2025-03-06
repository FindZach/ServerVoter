const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({ changeOrigin: true, secure: false });

proxy.on('error', (err, req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error: ' + err.message);
});

http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const target = queryObject.target || 'https://minecraft-server-list.com';
    proxy.web(req, res, { target });
}).listen(8191, () => {
    console.log('Proxy server running on port 8191');
});