//index.js
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    
  },

  onLoad: function(){

    let BmobSocketIo = new Bmob.Socket("4d7bba7512733061b4ca6c9f9b0a50d9")
    BmobSocketIo.updateTable("_User");
    BmobSocketIo.onInitListen = function () {
      //订阅Chat表的数据更新事件
      BmobSocketIo.updateTable("_User"); //聊天记录表
    };

    //监听服务器返回的更新表的数据
    BmobSocketIo.onUpdateTable = function (tablename, data) {

      if (tablename == "_User") {
        console.log(data);
      }
    };  
    

    // setTimeout(()=>{
    //   wx.reLaunch({
    //     url: '../home/home',
    //   })
    // },2000)

  }



  




})