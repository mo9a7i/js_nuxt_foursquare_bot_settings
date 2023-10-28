const app = require('express')()
const bodyParser = require('body-parser')
const swarmRoutes = require("./swarm.js")

// Express Settings
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var timeout = require('connect-timeout');
app.use(timeout(1000*60*30));

// Swarm Route
app.use("/swarm", swarmRoutes)

// General Index Message
app.get('/' ,(req, res) => {
    res.write('Hey!');
    res.end()
})

module.exports = { path: '/api', handler: app }

