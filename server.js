let run = require('./src/server')
let app = require('./src/app')

run(app, {port: 9000}, (err) => {
  if (err) {
    throw err
  }
})
