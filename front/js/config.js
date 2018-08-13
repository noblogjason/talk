// ajax config
(function (){
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(xhr) {
            //xhr.setRequestHeader('x-csrf-token', $.cookie("csrfToken") || '');
        },
    });
})()
var config = {
    domain: "http://localhost:7001",
    wsdomain: "ws://localhost:8001",
    ws: {},
    userName: "",
    maxConnections: 3,
    rooms: [],
}