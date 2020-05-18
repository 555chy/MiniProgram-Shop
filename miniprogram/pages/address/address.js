// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Math.round(new Date() / 1000))

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('address', function(data) {
      console.log(data)
    })
  },
})