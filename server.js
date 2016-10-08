let derby = require('derby')
let run = require('./src/server')

let app = derby.createApp('feedbackcoach', 'server.js')

app.use(require('derby-debug'))
app.serverUse(module, 'derby-stylus')

app.loadViews(__dirname + '/views')
app.loadStyles(__dirname + '/styles')

app.component(require('d-connection-alert'))
app.component(require('d-before-unload'))

app.get('/', (page, model, params, next) => {
  page.render('index.html')
})

run(app, {port: 9000}, (err) => {
  if (err) {
    console.log('Error:', err)
  }
})
