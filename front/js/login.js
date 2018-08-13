$(function(){
    document.getElementById("login").addEventListener("click", function () {
        var userName = document.getElementById("user-name").value;
        loginSystem(userName);
    })

    function loginSystem(userName){
        $.ajax({
            type: 'POST',
            url: config.domain + "/login",
            data: {
                userName: userName
            },
            success: function (json) {
                if (json.success) {
                    config.userName = json.data.userName;
                    console.log("登陆成功")
                    window.location.href = window.location.origin + "/index.html";
                }
            }
        })
    }
})