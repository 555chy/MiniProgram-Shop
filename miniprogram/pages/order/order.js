// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tabs: [
      {
        text: "上门回收",
        emptyTip: "您还没有上门回收的订单哦~",
        emptyBtn: "来单上门回收吧"
      },
      {
        text: "商城订单",
        emptyTip: "您还没有商城的订单哦~",
        emptyBtn: "快去商城购买吧"
      }
    ],
    isEmpty: true,
    emptyTip: "",
    emptyBtn: ""
  },
  changeTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index,
      emptyTip: this.data.tabs[index].emptyTip,
      emptyBtn: this.data.tabs[index].emptyBtn
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      emptyTip: this.data.tabs[this.data.currentTab].emptyTip,
      emptyBtn: this.data.tabs[this.data.currentTab].emptyBtn,
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