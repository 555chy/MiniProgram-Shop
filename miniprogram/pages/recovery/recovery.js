
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isShow: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //立即提交
  commit: function(e){
    // wx.navigateTo({
    //   url: '../reserve/reserve',
    // })
    wx.switchTab({
      url: '../home/home',
    })
  }
})