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
    isShow: false
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
    wx.showLoading({
      title: '加载中',
    })
    query.find().then(res =>{
      res.forEach(element => {
        element.num = 0;
        element.total = element.num * element.price;
      });
      this.setData({
        goods: res,
        isShow: true
      })
      wx.hideLoading()
    }).catch(err =>{
      console.log(err)
      wx.hideLoading()
    })
  },
  //立即提交
  commit: function(e){
    let list = this.data.goods
    var isNull = false
    for(let i = 0; i < list.length; i++){
      const number = list[i].num
      if(number !== 0){
        isNull = true
      }
    }

    if(!isNull){
      wx.showToast({
        title: '还未选择回收物品',
        duration: 3000
      })
      return
    }

    let that = this
    wx.navigateTo({
      url: '../reserve/reserve',
      success: function(e){
        e.eventChannel.emit('commit',{ goods: that.data.goods})
      }
    })
  }
})