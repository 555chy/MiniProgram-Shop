// pages/shop.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,  //初始文本框不显示内容
    goods: [
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",  
        name: "C++",
        price: 6.60
      },
      {
        img: "https://img-blog.csdnimg.cn/20200427180158481.png",  
        name: "OpenCV",
        price: 32.00
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927144643118.jpg",  
        name: "HTML5",
        price: 12.86
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927160621712.jpg",  
        name: "Java",
        price: 198.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143404513.png",  
        name: "Android",
        price: 999.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927150124341.png",  
        name: "Lua",
        price: 0.01
      },
      {
        img: "https://img-blog.csdnimg.cn/20200210230553185.png",  
        name: "Mariadb",
        price: 88.88
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",  
        name: "C++",
        price: 6.60
      },
      {
        img: "https://img-blog.csdnimg.cn/20200427180158481.png",  
        name: "OpenCV",
        price: 32.00
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927144643118.jpg",  
        name: "HTML5",
        price: 12.86
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927160621712.jpg",  
        name: "Java",
        price: 198.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143404513.png",  
        name: "Android",
        price: 999.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927150124341.png",  
        name: "Lua",
        price: 0.01
      },
      {
        img: "https://img-blog.csdnimg.cn/20200210230553185.png",  
        name: "Mariadb",
        price: 88.88
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",  
        name: "C++",
        price: 6.60
      },
      {
        img: "https://img-blog.csdnimg.cn/20200427180158481.png",  
        name: "OpenCV",
        price: 32.00
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927144643118.jpg",  
        name: "HTML5",
        price: 12.86
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927160621712.jpg",  
        name: "Java",
        price: 198.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143404513.png",  
        name: "Android",
        price: 999.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927150124341.png",  
        name: "Lua",
        price: 0.01
      },
      {
        img: "https://img-blog.csdnimg.cn/20200210230553185.png",  
        name: "Mariadb",
        price: 88.88
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",  
        name: "C++",
        price: 6.60
      },
      {
        img: "https://img-blog.csdnimg.cn/20200427180158481.png",  
        name: "OpenCV",
        price: 32.00
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927144643118.jpg",  
        name: "HTML5",
        price: 12.86
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927160621712.jpg",  
        name: "Java",
        price: 198.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143404513.png",  
        name: "Android",
        price: 999.99
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927150124341.png",  
        name: "Lua",
        price: 0.01
      },
      {
        img: "https://img-blog.csdnimg.cn/20200210230553185.png",  
        name: "Mariadb",
        price: 88.88
      },
      {
        img: "https://img-blog.csdnimg.cn/20200427180158481.png",  
        name: "OpenCV",
        price: 32.00
      },
    ]
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true   //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
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