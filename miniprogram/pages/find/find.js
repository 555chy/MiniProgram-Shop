// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [
      {
        name: "关注公众号",
        description: "掌握更多环保资讯",
        btn: "去看看",
        color: "#4CD87B",
        image: "https://img-blog.csdnimg.cn/20200524144827311.png"
      },
      {
        name: "上门回收",
        description: "手机家电大件废品上门收",
        btn: "去下单",
        color: "#FFAA71",
        image: "https://img-blog.csdnimg.cn/20200524144829902.png"
      },
    ],
    currentTab: 0,
    tabs: [
      {
        text: "最新推荐"
      },
      {
        text: "环保百科"
      },
      {
        text: "生活达人"
      },
      {
        text: "环保动态"
      }
    ]
  },
  changeTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goto: function(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    if(index === 0){

    }else{
      wx.navigateTo({
        url: '../recovery/recovery',
      })
    }
  }
})