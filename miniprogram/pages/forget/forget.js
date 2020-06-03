const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    smsCode: '',
    password: '',
    time: "获取验证码",
    totalTime: 60,
    currentTime: 0,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTime: this.data.totalTime
    })
  },

  getPhone: function (e) {
    let phone = e.detail.value
    this.setData({
      phone
    })
  },
  getPassword: function(e){
    let password = e.detail.value
    this.setData({
      password
    })
  },
  getVerifyCode: function(e){
    let smsCode = e.detail.value
    this.setData({
      smsCode
    })

  },

  getSmsCode: function () {
    var that = this
    let phone = this.data.phone
    if(phone.length == ''){
      wx.showToast({
        title: '请输入手机号',
      })
      return
    }

    let params = {
      mobilePhoneNumber: this.data.phone
    }
    Bmob.requestSmsCode(params).then(res => {
      wx.showToast({
        title: '发送成功',
      })
      that.wait()
      
    }).catch(err => {
      wx.showToast({
        title: err.error,
        icon: 'none'
      })
    })
  },

  wait: function () {
    var that = this;
    var currentTime = that.data.currentTime;
    that.setData({
      time: currentTime + '秒',
      disabled: true
    })
    var interval = setInterval(function () {
      that.setData({
        time: (currentTime - 1) + '秒'
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新获取',
          currentTime: that.data.totalTime,
          disabled: false
        })
      }
    }, 1000)
  },

  verify: function (e) {
    
    let {password, phone, smsCode} = this.data

    if(password == ''){
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }

    if(phone == ''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if(smsCode == ''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    let data = {
      mobilePhoneNumber: phone
    }

    Bmob.verifySmsCode(smsCode, data).then(res =>{
      wx.showToast({
        title: '密码设置成功',
      })
    }).catch(err =>{
      wx.showToast({
        title: err.error,
        icon: 'none'
      })
    })
    
  }

})