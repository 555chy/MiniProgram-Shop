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


  goLogin: function(e){
    wx.navigateTo({
      url: '../login/login',
    })
  
  },
  //退出登录
  logout: function(e){
    Bmob.User.logout()
    wx.showLoading({
      title: '加载中',
    })

    let that = this
    setTimeout(function () {
      wx.hideLoading()
      that.setData({
        isLogin: false
      })
    }, 2000)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  
})