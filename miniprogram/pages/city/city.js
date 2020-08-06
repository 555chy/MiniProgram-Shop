const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  data: {
    service: []
  },

  onLoad: function (options) {
    var that = this
    const query = Bmob.Query("Data");
    query.find().then(res => {
        that.setData({
          service: res[2].value

        })
    });
  },

  goService: function(e){
    let index = e.currentTarget.dataset.index
    let service = this.data.service[index]
    wx.navigateTo({
      url: '../servicelist/servicelist',
      success: function (e) {
        e.eventChannel.emit('service', {
          service
        })
      }
    })


  }

  
})