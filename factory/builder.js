'use strict'


const fs = require('fs')
const path = require('path')
const cp = require('child_process')

module.exports = (fileContent, fileName) => {
  if (fs.existsSync(`${__dirname}/${fileName}`)) {
    let files = fs.readdirSync(`${__dirname}/${fileName}`)
    files.map(item => {
      fs.unlinkSync(`${__dirname}/${fileName}/${item}`)
    })
    fs.rmdirSync(`${__dirname}/${fileName}`)
  }
  fs.mkdirSync(`${__dirname}/${fileName}`)
  fs.writeFileSync(`${__dirname}/${fileName}/${fileName}.js`, fileContent)
  fs.writeFileSync(`${__dirname}/${fileName}/gulpfile.js`, `
    const gulp = require('../../node_modules/gulp')
    const flatten = require('../../node_modules/gulp-flatten')
    const babel = require('../../node_modules/gulp-babel')

    gulp.task('default', () =>
      gulp.src('${fileName}.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(flatten())
      .pipe(gulp.dest('./'))

    )
  `)
  cp.execSync(`cd ${__dirname}/${fileName}; gulp`)
  return fs.readFileSync(`${__dirname}/${fileName}/${fileName}.js`).toString()
}
