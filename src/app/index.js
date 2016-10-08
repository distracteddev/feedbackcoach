let derby = require('derby')
let app = derby.createApp('feedbackcoach', __filename)

app.use(require('derby-debug'))
app.serverUse(module, 'derby-stylus')

app.loadViews(__dirname + '/../../views')
app.loadStyles(__dirname + '/../../styles')

// app.component(require('d-connection-alert'))
// app.component(require('d-before-unload'))

app.get('/', (page, model, params, next) => {
  page.render('index.html')
})

module.exports = app
