// pages/address/address.js
Page({
  data: {
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
        console.log(that.data.address)
      },
    
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
    let index = e.currentTarget.dataset.index
    console.log(index)
  }
  

  
})