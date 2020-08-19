//index.js
const app = getApp()
const Bmob = app.globalData.Bmob
const date = new Date()

Page({
  data: {
    selected: 0,
    list: ['全部', '待使用', '待取消'],
  },
  selected: function (e) {
    let that = this
    console.log(e)
    let index = e.currentTarget.dataset.index
    console.log("index",index)
    if (index == 0) {
      that.setData({
        selected: 0
      })
    } else if (index == 1) {
      that.setData({
        selected: 1
      })
    } else {
      that.setData({
        selected: 2
      })
    } 
  },

  onLoad: function(){
   
  },

  onShareAppMessage: function(){
    return{
      imageUrl: '../../icon/zhitongche.png'
    }
  }



  




})