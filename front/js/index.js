//
$(function () {
 
    // 跳转登陆
    if(!$.cookie("EGG_SESS")) {
        window.location.href = window.location.origin + "/login.html" 
    }


    document.getElementById("room-go").addEventListener("click", function () {
        var roomNumber = document.getElementById("room-number").value;
        linkTalkRoom(roomNumber);
    })
    
   
    function linkTalkRoom(roomNumber) {
        $.ajax({
            type: 'POST',
            url: config.domain + "/createRoom",
            data: {
                roomNumber: roomNumber,
                
            },
            success: function (json) {
                if (json.success) {
                    config.userName = json.data.userName;
                    createTalkRoomPanel(json.data.roomNumber)
                }
            }
        })
    }
    function createTalkRoomPanel(roomNumber) {
        if (config.rooms.length == config.maxConnections) {
            alert("创建的聊天是到达上限")
            return
        } else if ($.inArray(roomNumber, config.rooms) != -1){
            alert("不能创建重复的聊天室")
            return
        }
        var panel = $("#mother-card").clone().show().attr("id",roomNumber);
        panel.find(".card-title").text(roomNumber)
        $("#rooms").children(".row").append(panel);
        
        config.rooms.push(roomNumber)
        
        connectWs(panel, roomNumber, config.userName);
    }
    function connectWs (panel, roomNumber, userName) {
        config.ws = new WebSocket(config.wsdomain + "/"+userName + "/" + roomNumber);
        
        console.log(config.ws);
        
        var ws = config.ws;
        ws.onopen = function(){
            console.log('websocket open');
            panel.find(".card-text").text("欢迎来到聊天室（连接成功）")
        }
        ws.onclose = function(){
            console.log('websocket close');
        }
        ws.onmessage = function(e){
            // console.log(e);
            var result = JSON.parse(e.data);
            var template = $("<li class='list-group-item'><span class='userName'></span><span class='date'></span><span class='content'></span></li>")
            template.find(".userName").text(result.userName+":  ");
            template.find(".content").text(result.content);
            panel.find(".saying-board").append(template);
        }
        panel.find("button[name='talk-send']").click(function(){
            var txt = panel.find("input[name='talk-content']").val();
            var sendContent = {
                content: txt
            }
            ws.send(JSON.stringify(sendContent));
        })

    }
    
})