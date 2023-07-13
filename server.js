// server.js
let express = require('express')
let serveStatic = require('serve-static')
let history = require('connect-history-api-fallback')

let app = express()
let port = process.env.PORT || 5000

// redirect to use correct protocol when on production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })
}

app.use(history())
app.use(serveStatic(__dirname.concat('/dist')))

app.listen(port)
console.log('server started ' + port)
