const express = require('express');
const app = express();
const path = require("path")

const port = process.env.PORT ? process.env.PORT : 8081

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

app.use("/", express.static(__dirname + '../../../web/dist/')); //serves the index.html

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname + "../../../web/dist/index.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}); //listens on port 3000 -> http://localhost:3000/