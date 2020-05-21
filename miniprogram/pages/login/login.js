const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  getUsername: function(e){
    this.setData({
      username: e.detail.value
    })
  },

  getPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 进入注册界面
   */
  goRegister: function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 登录
   */
  login: function(e){
    wx.showLoading({
      title: '加载中',
    })
    Bmob.User.login(this.data.username,this.data.password).then(res =>{
      console.log(res)
      setTimeout(function () {
        wx.hideLoading()
        wx.switchTab({
          url: '../mine/mine',
        })
      }, 2000)
    

    }).catch(err =>{
      console.log(err)
      wx.hideLoading()
      let code = err.code
      var message = ""
      if(code === 101){
        message = "用户名或密码错误"
      }else{
        message = err.error
      }
      wx.showToast({
        title: message,
        icon: 'none'
      })
      
    })
  }

 
})