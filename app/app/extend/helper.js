//获取前台传来的参数对象
function getParams(ctx){
    let paramsObject ={}
    const method = ctx.request.method;
    if(method === 'GET'){
        paramsObject = (ctx.query);
    }else if(method === 'POST'){
        paramsObject = (ctx.request.body);
    }
    return paramsObject;
}

module.exports = {
    getParams:getParams,
}