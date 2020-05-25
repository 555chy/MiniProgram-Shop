// pages/through/through.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [{
      name: '小蔡',
      phone: '13338533196'
    }, {
      name: '小吴',
      phone: '15396251669'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  call: function (e) {
    let index = e.currentTarget.dataset.index
   
    let phone = this.data.user[index].phone
    console.log(phone)
    wx.makePhoneCall({
      phoneNumber: phone,
    })



  }


})