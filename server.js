let derby = require('derby')
let run = require('./src/server')

let app = derby.createApp('feedbackcoach', 'server.js')

app.get('/', (page, model, params, next) => {
  console.log('meow route')
  page.render('Meow')
})

run(app, {port: 9000}, (err) => {
  if (err) {
    console.log('Error:', err)
  }
})
