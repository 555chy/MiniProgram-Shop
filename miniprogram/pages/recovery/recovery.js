// pages/recovery/recovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [{
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",
        name: "C++",
        price: 6.60,
        num: 0,
        total: 0
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",
        name: "C++",
        price: 6.60,
        num: 0,
        total: 0
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",
        name: "C++",
        price: 6.60,
        num: 0,
        total: 0
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",
        name: "C++",
        price: 6.60,
        num: 0,
        total: 0
      },
      {
        img: "https://img-blog.csdnimg.cn/20190927143929209.jpg",
        name: "C++",
        price: 6.60,
        num: 0,
        total: 0
      },
    ]
  },
  change: function(index, step) {
    console.log(index)
    const data = this.data;
    const goods = data.goods[index];
    goods.num = goods.num + step;
    if(goods.num > 999) goods.num = 999;
    if(goods.num < 0) goods.num = 0; 
    goods.total = (goods.num * goods.price).toFixed(2);
    if(goods.total == 0) goods.total = 0;
    this.setData(data);
  },
  add: function (e) {
    const index = e.currentTarget.dataset.index;
    this.change(index, 1);
  },
  sub: function (e) {
    const index = e.currentTarget.dataset.index;
    this.change(index, -1);
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