var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

Page({
  data: {
    latitude: 26.084461,
    longitude: 119.254060,
    markers: [],
    polyline: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('order', function(data) {
      console.log(data)
      let order = data.order
      let location = order.location
      let latitude = location[0]
      let longitude = location[1]

      console.log(latitude + "|" + longitude)

      that.setData({
        latitude: latitude,
        longitude: longitude,
        markers:[{
          id: 0,
          latitude: 26.084461,
          longitude: 119.254060,
          iconPath: '../../icon/start.png'
        },{
          id: 1,
          latitude: latitude,
          longitude: longitude,
          iconPath: '../../icon/end.png'
        }]
      })
    })

    var qqmapsdk = new QQMapWX({
      key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
    })
  
    qqmapsdk.direction({
      mode: 'bicycling',
      from: {
        latitude: 26.084461,
        longitude: 119.254060
      },
      to: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: (res =>{
        var coors = res.result.routes[0].polyline
        var pl = []
        for (var i = 2; i < coors.length ; i++){
          coors[i] = coors[i-2] + coors[i]/1000000
        }

        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        that.setData({
          polyline: [{
            points: pl,
            color: '#FFB364',
            width: 4
          }]
        })

      }),
      fail: (err =>{
        console.log(err)
      })
    })
  
  },
})