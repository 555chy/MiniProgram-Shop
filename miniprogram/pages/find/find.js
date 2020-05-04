// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [
      {
        name: "关注公众号",
        description: "掌握更多环保资讯",
        btn: "去看看",
        color: "#4CD87B",
      },
      {
        name: "上门回收",
        description: "手机家电大件废品上门收",
        btn: "去下单",
        color: "#FFAA71",
      },
    ],
    currentTab: 0,
    tabs: [
      {
        text: "最新推荐"
      },
      {
        text: "环保百科"
      },
      {
        text: "生活达人"
      },
      {
        text: "环保动态"
      }
    ]
  },
  changeTab: function(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentTab: e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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