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
    phoneNumber:""
  },
  onLoad: function(options){
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('userInfo', function(data) {
      let res = JSON.parse(data)
      that.setData({
        headimg: res.avatarUrl,
        username: res.nickName,
      })

    })
  },
  //获取用户微信信息
  getUserInfo: function(e){
    console.log(e)
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
  register: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    let username = this.data.username
    let password = this.data.password
    let confirmPassword = this.data.confirmPassword
    let phone = this.data.phoneNumber
    let headimg = this.data.headimg

    if(password !== confirmPassword){
      wx.showToast({
        title: '两次密码输入不一致'
      })
      return
    }
  
    let params = {
      username,
      password,
      mobilePhoneNumber: phone,
      headUrl: headimg,
      admin: false,
      money: 0,
      days: 0,
      integral: 0
    }
    var that = this
    Bmob.User.register(params).then(res =>{
      setTimeout(function () {
        wx.hideLoading()
        wx.showToast({
          title: '注册成功',
        })
        setTimeout(()=>{
          Bmob.User.login(that.data.username, that.data.password).then(res =>{
            wx.reLaunch({
              url: '../mine/mine',
            })
          }).catch(err =>{
            console.log(err)
          })
        },1500)
       
      }, 2000)
    }).catch(err => {
      wx.hideLoading()
      let code = err.code
      var title = ""
      if(code == 202){
        title = "用户名已经注册,请更换后再注册"
      }else{
        title = err.error
      }
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 3000
      })
    })
  },
  goLogin: function(e) {
    wx.navigateBack()
  },
 
  //input变化监听
  getUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  getPassword: function(e) {
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
})