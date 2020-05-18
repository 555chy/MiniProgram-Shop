// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      name: "bob",
      mobile: "1378956758",
      district: "福建省福州市",
      detail: "详细信息"
    }
  },
  add: function() {
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
    });
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})