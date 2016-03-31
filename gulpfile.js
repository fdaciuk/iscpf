'use strict'

const gulp = require('gulp')
const fs = require('fs')
const pkg = require('./package.json')

gulp.task('update-readme', (done) => {
  fs.readFile('README.md', 'utf8', (err, file) => {
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
  const date = new Date(Date.now())
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
  const createNewVersion = [
    'gulp update-readme',
    'npm run build',
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
    .then(() => execCommand(createNewVersion, 'Create new Version...'))
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


