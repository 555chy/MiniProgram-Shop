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
  toRecovery: function() {
    wx.navigateTo({
      url: '../recovery/recovery',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      emptyTip: this.data.tabs[this.data.currentTab].emptyTip,
      emptyBtn: this.data.tabs[this.data.currentTab].emptyBtn,
    })
  }
})