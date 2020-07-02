const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  data: {
    service: []
  },

  onLoad: function (options) {
    var that = this
    const query = Bmob.Query("City_Service");
    query.find().then(res => {
        console.log(res[0])
        that.setData({
          service: res[0].value

        })
    });
  },

  
})