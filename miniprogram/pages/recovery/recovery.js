// pages/recovery/recovery.js
const db = wx.cloud.database()
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isShow: false,
    waste:[]
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
    const query = Bmob.Query('Waste');
    query.find().then(res =>{
      this.setData({
        waste: res,
        isShow: true
      })
    }).catch(err =>{
      console.log(err)
    })
  },
  //立即提交
  commit: function(e){
    wx.navigateTo({
      url: '../reserve/reserve',
      success: function(e){
        e.eventChannel.emit('commit',{price: 4811})
      }
    })
  }


})