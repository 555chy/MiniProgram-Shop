//app.js
const Bmob = require('utils/Bmob-2.2.4.min.js');

App({
  onLaunch: function () {
    //数据库初始化
    wx.cloud.init({env:"develop-os46v",traceUser:true})  
    Bmob.initialize('edab414f3a6ca27a','cyd293','a042d2f13a55b1fd706a203029434632')
   
  },
  globalData: {
    Bmob: Bmob
  },
  
})
