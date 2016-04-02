'use strict'

const fs = require('fs')
const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const header = require('gulp-header')
const standard = require('gulp-standardize')
const exec = require('child_process').exec
const pkg = require('./package.json')

const coreFiles = 'src/is-cpf.js'
const allFiles = [].concat(coreFiles, 'gulpfile.js')

const banner = () => {
  return [
    '/**!',
    ' * <%= pkg.name %> - v<%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' * <%= pkg.homepage %>',
    '',
    ' * <%= new Date( Date.now() ) %>',
    ' * <%= pkg.license %> (c) <%= pkg.author %>',
    '*/',
    ''
  ].join('\n')
}

gulp.task('lint', () => {
  gulp.src(allFiles)
    .pipe(standard())
    .pipe(standard.reporter('snazzy'))
    .pipe(standard.reporter('fail'))
})

gulp.task('uglify', () => {
  gulp.src(coreFiles)
    .pipe(concat('is-cpf.min.js'))
    .pipe(uglify())
    .pipe(header(banner(), { pkg: pkg }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('update-readme', (done) => {
  fs.readFile('README.md', 'utf8', (err, file) => {
    if (err) throw err
    const updateVersion = file.split('\n').reduce((acc, line) => {
      const versionLine = line.includes('//cdn.rawgit.com/fdaciuk/iscpf')
      let newLine = line
      if (versionLine) {
        newLine = line.replace(/\/v([\d.]+)\//, `/v${pkg.version}/`)
      }
      return acc.concat(newLine)
    }, [])

    fs.writeFile('README.md', updateVersion.join('\n'), done)
  })
})

gulp.task('deploy', done => {
  const execCommand = (command, message) => {
    console.log(`- ${message}`)
    return new Promise((resolve, reject) => {
      exec(command.join(' && '), (err, stdout, stderr) => {
        if (err) return reject(err)
        return resolve(stdout)
      })
    })
  }

  const syncRepository = [
    'git pull origin master --force'
  ]
  const createBuild = [
    'gulp lint',
    'npm run build'
  ]
  const createNewVersion = [
    'gulp update-readme',
    'git add .',
    'git commit -m "Build new version"',
    'git tag -f v' + pkg.version
  ]
  const updateMainBranch = [
    'git push origin master --tags'
  ]
  const npmPublish = [
    'npm publish'
  ]

  execCommand(syncRepository, 'Sync repository...')
    .then(() => execCommand(createBuild, 'Create build...'))
    .then(() => execCommand(createNewVersion, 'Create new version...'))
    .then(() => execCommand(updateMainBranch, 'Update master branch...'))
    .then(() => execCommand(npmPublish, 'Publish on NPM...'))
    .then(() => {
      console.log('Done!')
      process.exit(0)
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
})
