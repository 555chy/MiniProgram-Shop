// pages/service/service.js
Page({

  data: {
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('service', data => {
      console.log(data)
      this.setData({
        content: data.service.array
      });
    
    })

  },

  callPhone: function(e){
    let index = e.currentTarget.dataset.index
    let phone = this.data.content[index].phone
    console.log(phone)
    wx.makePhoneCall({
      phoneNumber: phone,
    })

    
  }

 
})