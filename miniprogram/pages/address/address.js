// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [{
      name: "bob",
      mobile: "1378956758",
      district: "福建省福州市鼓楼区",
      detail: "这是一个山上的地址"
    },{
      name: "tina",
      mobile: "18985632454",
      district: "福建省福州市台江区",
      detail: "这是一个闹市的地址，而且地址很长很长"
    }]
  },
  add: function() {
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
    });
  },
  select: function(event) {
    const addr = this.data.address[event.currentTarget.dataset.index];
    console.log(addr)
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