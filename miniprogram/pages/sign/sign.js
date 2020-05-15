const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    timestamp: 0,
    integral: 10,
    objectId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let current = Bmob.User.current()
    console.log(current)
    this.setData({
      days: current.days,
      timestamp: current.timestamp,
      objectId: current.objectId
    })

  },
  /**
   * 签到
   */
  signin: function(e){
    let currentTime = Math.round(new Date() / 1000)
    console.log(currentTime)
    let objectId = this.data.objectId
    let timestamp = this.data.timestamp
    let days = this.data.days
    let diff = currentTime - timestamp
    console.log(diff)

    if(diff <= 86400){
      const query = Bmob.Query('_User');
      query.set('id', objectId ) 
      query.set('days', days + 1)
      query.set('timestamp', currentTime)
      query.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  test: function(e){
    wx.chooseAddress({
      success (res) {
        console.log(res)
      }
    })
  }
})