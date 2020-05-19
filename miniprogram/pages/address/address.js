// pages/address/address.js
Page({
  data: {
    defaultIndex: 0,
    address: []
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
    let that = this
    wx.getStorage({
      key: 'address',
      success: function(res){
        that.setData({
          address: res.data
        })
      },
    })
    wx.getStorage({
      key: 'defaultIndex',
      success: function(res) {
        that.setData({
          defaultIndex: res.data
        })
      }
    })
  },
  onShow: function(options){
    let that = this
    wx.getStorage({
      key: 'address',
      success: function(res){
        that.setData({
          address: res.data
        })
      }
    })
  },

  choose: function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      defaultIndex: index
    });
    wx.setStorage({
      data: index,
      key: 'defaultIndex',
    })
  }
  

  
})