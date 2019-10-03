import config from "../config"
const app = require("express")();
const server = require("http").createServer(app);
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use("/", require("./routes"));


function StartHttp(){
    server.listen(config.PORT, ()=> {
        console.log(`Start server At ${config.PORT}`);
    })
}

module.exports = {
    server,
    StartHttp
};