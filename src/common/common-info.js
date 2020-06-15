import { message } from 'antd';

global.commonInfo = {
  success: function(msg, timer, callback) {
    message.destroy();
    message.success(msg, timer, callback)
  },

  error: function(msg, timer, callback) {
    message.destroy();
    message.error(msg, timer, callback);
  },

  warning: function(msg, timer, callback) {
    message.destroy();
    message.warning(msg, timer, callback);
  },


  info: function(msg, timer, callback) {
    message.destroy();
    message.info(msg, timer, callback);
  },

}
