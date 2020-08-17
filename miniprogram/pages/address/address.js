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
        console.log(res)
        that.setData({
          address: res.data
        })
      }
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
    let address = this.data.address[index]
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
      success: function (e) {
        e.eventChannel.emit('editaddress', {
          address,
          index
        })
      }
    })
  },

  setting: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      defaultIndex: index
    });
    wx.setStorage({
      data: index,
      key: 'defaultIndex',
    })
  },
  
  delete: function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success (res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index;
          let address = that.data.address
          address.splice(index,1)
          if(index == that.data.defaultIndex){
            that.setData({
              address,
              defaultIndex: 0
            })
            wx.setStorage({
              data: 0,
              key: 'defaultIndex',
            })
          }else{
            that.setData({
              address,
            })
          }
            wx.setStorage({
              data: address,
              key: 'address',
              success: function(e){
                wx.showToast({
                  title: '删除成功',
                })
              }
          })
        } 
      }
    })
  
  
   

  

  }


  

  
})