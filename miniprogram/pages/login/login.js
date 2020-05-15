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
    
    Bmob.User.login(this.data.username,this.data.password).then(res =>{
      console.log(res)
      wx.switchTab({
        url: '../mine/mine',
      })

    }).catch(err =>{
      console.log(err)
      let code = err.code
      var message = ""
      if(code === 101){
        message = "用户名或密码错误"
      }else{
        message = err.error
      }
      wx.showToast({
        title: message
      })
      
    })
  }

 
})