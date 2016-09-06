'use strict'

const http = require('http')
const builder = require('./factory/builder')

http.createServer((req, res) => {
  res.end(builder(`
    let a = 123
  `, 'test'))
}).listen(12306, () => {
  console.log('run as 12306')
})
