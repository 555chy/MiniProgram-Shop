const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    phone: '',
    smsCode: '',
    time: "获取验证码",
    totalTime: 3,
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

  verify: function (e) {
    Bmob.requestSmsCode(params).then(res => {
      console.log(res)
      that.setData({
        smsId: res.smsId
      })

    }).catch(err => {
      console.log(err)
    })
  },
  getCode: function (options) {
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

})