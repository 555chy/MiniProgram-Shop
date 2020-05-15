const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headimg:"",
    username: "用户名",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    email:""
  },
  //获取用户微信信息
  getUserInfo: function(e){
    let {avatarUrl, nickName} = e.detail.userInfo
    if(avatarUrl != null){
      this.setData({
        headimg: avatarUrl,
        username: nickName
      })
    }else{
      wx.showToast({
        title: '获取信息失败'
      })
    }
  },
 
  /**
   * 点击注册
   */
  register: function(e){
    let username = this.data.username
    let password = this.data.password
    let confirmPassword = this.data.confirmPassword
    let email = this.data.email
    let phone = this.data.phoneNumber

    if(password !== confirmPassword){
      wx.showToast({
        title: '两次密码输入不一致'
      })
      return
    }
    // 邮箱正则,手机号正则

    let params = {
      username,
      password,
      email,
      phone
    }
   
    Bmob.User.register(params).then(res =>{
      wx.showToast({
        title: '注册成功',
      })
    }).catch(err =>{
      wx.showToast({
        title: err.error,
        duration: 3000
      })
    })
  },
 
  //input变化监听
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

  getConfirm: function(e){
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  getPhoneNumber: function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  getEmail: function(e){
    this.setData({
      email: e.detail.value
    })
  }

})