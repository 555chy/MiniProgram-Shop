const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    smsCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getPhone: function(e){
    let phone = e.detail.value
    this.setData({
      phone
    })
  },

  verify: function(e){
    let phone = this.data.phone

    Bmob.requestSmsCode(params).then(res => {
      console.log(res)
      that.setData({
        smsId: res.smsId
      })

    }).catch(err => {
      console.log(err)
    })
    
    
  }

})