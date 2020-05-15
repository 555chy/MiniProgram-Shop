// pages/reserve/reserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "收件人姓名",
    phone: "手机号码",
    address: "收货地址",
    imageUrl: "../../icon/category.png",
    waste:[{
      name: "报废车",
      price: 100
    },{
      name: "空调",
      "price": 100
    },{
      name: "空调",
      "price": 100
    },{
      name: "空调",
      "price": 100
    },{
      name: "空调",
      "price": 100
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('commit', function(data) {
      console.log(data)
    })
  },
  /**
   * 进入收货地址管理
   */
  addressManager: function(e){
    wx.navigateTo({
      url: '../address/address',
      events: {

      }
    })
  
  },
/**
 * 选择图片
 */
getPhoto: function(e){
  var that = this
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      that.setData({
        imageUrl: tempFilePaths
      })
    }
  })
},
/**
 * 选择预约时间
 */
selectTime: function(e){
  wx.showActionSheet({
    itemList: ['9-10', '9-10','9-10','9-10','9-10','9-10'],
  })
}


  

 

  
})