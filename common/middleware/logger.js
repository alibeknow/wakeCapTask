const morgan = require('morgan');

module.exports = morgan((tokens, req, res) => {
  return [
    `<pid : ${process.pid}> <${process.env.NODE_ENV}>`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
});
