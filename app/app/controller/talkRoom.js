'use strict';

const Controller = require('egg').Controller;
const common = require('../extend/helper.js');
const commonData = require('../extend/data.js');

class TalkRoomController extends Controller {
  async login() {
    const {ctx,app} = this;
    let data = common.getParams(ctx);
    const responseData = {
      success: true,
      errorCode:111000,
      msg: null,
      data: {
        userName: data.userName
      }
    }
    
    ctx.session.userName = data.userName;
    this.ctx.body = responseData;
  }
  async createRoom() {
    const {ctx,app} = this;
    let data = common.getParams(ctx);
    const responseData = {
      success: true,
      errorCode:111000,
      msg: null,
      data: {
        roomNumber: data.roomNumber,
        userName: ctx.session.userName
      }
    }
    commonData.userName = ctx.session.userName;
    this.ctx.body = responseData;
  }
}

module.exports = TalkRoomController;
