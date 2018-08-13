'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/createRoom', controller.talkRoom.createRoom);
  router.get('/createRoom', controller.talkRoom.createRoom);
  router.post('/login', controller.talkRoom.login);
};
