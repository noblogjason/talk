'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_jason';

  // add your config here
  config.middleware = [];


  config.security = { // 貌似没用
    domainWhiteList: ['null', null, 'http://localhost:5200'],
    //methodnoallow:{enable:true},
    csrf: { enable: false },  //直接关闭
  };
  config.cors = {
    //origin: '*',  //如果设置这个，那domainWhiteList就不会起作用了,  
    origin: 'http://localhost:5200',  
    allowHeaders: 'Content-Type, Accept,x-csrf-token, Authorization, Cookie',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    maxAge: '1728000',
    credentials: true
  };

  config.csrf = {
    headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token,
    ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: false,
  };


  return config;
};

