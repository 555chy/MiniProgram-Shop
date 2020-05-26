// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this.setData({
      currentTab: e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goto: function(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    if(index === 0){

    }else{
      wx.navigateTo({
        url: '../through/through',
      })
    }
  }
})