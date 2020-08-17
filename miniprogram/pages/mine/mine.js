// pages/mine/mine.js
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isAdmin: false,
    username: '',
    headUrl: 'https://img-blog.csdnimg.cn/20200526193223489.png',
    money: 0,
  },

  goLogin: function (e) {
    wx.navigateTo({
      url: '../login/login',
    })

  },
  //退出登录
  logout: function (e) {
    wx.showModal({
      title: '提示',
      content: '确认退出登录?',
      success(res) {
        if (res.confirm) {
          Bmob.User.logout()
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.reLaunch({
              url: '../login/login',
            })
          }, 2000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let current = Bmob.User.current()
    if (current != null) {
      this.setData({
        isLogin: true,
        isAdmin: current.admin,
        username: current.username,
        headUrl: current.headUrl
      })
    }
  },
  goOrderShop: function (e) {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  goAddress: function(e){
    wx.navigateTo({
      url: '../address/address',
    })
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     if(res.data == null || res.data.length == 0){
    //       wx.navigateTo({
    //         url: '../addressAdd/addressAdd',
    //       })
    //     }else{
    //       wx.navigateTo({
    //         url: '../address/address',
    //       })
    //     }
       
    //   },
    //   fail: (err)=>{
    //     console.log(err)
    //     wx.navigateTo({
    //       url: '../addressAdd/addressAdd',
    //     })
    //   }
    // })
  },
  goMyGift: function(e){
    let isLogin = this.data.isLogin
    if(isLogin){
      wx.navigateTo({
        url: '../myGift/myGift',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  
  },

  onShareAppMessage: function(options){
    return{
      imageUrl: '../../icon/share.jpg',
      path:'/pages/home/home'
    }
  }
})