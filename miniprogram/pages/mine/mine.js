// pages/mine/mine.js
const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    username:"",
    headUrl:"../../icon/head.png",
    money: 0,
    items: [
      {
        icon: "icon-location",
        text: "我的订单",
        rightIcon: "icon-xiala",
      },
      {
        icon: "icon-location",
        text: "关于我们",
        rightIcon: "icon-xiala",
      },
      {
        icon: "icon-location",
        text: "帮助中心",
        rightIcon: "icon-xiala",
      },
      {
        icon: "icon-location",
        text: "设置",
        rightIcon: "icon-xiala",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goLogin: function(e){
    wx.navigateTo({
      url: '../login/login',
    })
  
  },

  onLoad: function (options) {
    let current = Bmob.User.current()
    if(current != null){
      this.setData({
        isLogin: true,
        username: current.username
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let current = Bmob.User.current()
    if(current != null){
      this.setData({
        isLogin: true,
        username: current.username
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  
})