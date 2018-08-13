let ws = require("nodejs-websocket")
const commonData = require('./app/extend/data.js');
module.exports = app => {
    app.beforeStart(async () => {   
        let server = ws.createServer(function (conn) {
            console.log("New connection------------------------------------------------------")
            const pathArr = conn.path.split('/');
            const userName = pathArr[1];
            const roomNumber = parseInt(pathArr[2]);
            conn.userName = userName;
            conn.roomNumber = roomNumber;
            conn.on("text", function (data) {
                console.log("Received ")
                const sendContent = JSON.parse(data);
                const {content} = sendContent;
                const result = {
                    userName: conn.userName,
                    content: content,
                    date: new Date().toLocaleString()
                }
                
                conn.server.connections.forEach(connection => {
                    if (connection.roomNumber == conn.roomNumber) {
                        connection.sendText(JSON.stringify(result))
                    }
                });
               
            })
            conn.on("close", function (code, reason) {
                console.log("Connection closed")
            })
        }).listen(8001)
    });
};