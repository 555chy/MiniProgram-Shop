var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

Page({
  data: {
    latitude: 26.084461,
    longitude: 119.254060,
    markers: [{
      id: 0,
      latitude: 26.084461,
      longitude: 119.254060,
      iconPath: '../../icon/start.png'
    },{
      id: 1,
      latitude: 26.080857,
      longitude: 119.261549,
      iconPath: '../../icon/end.png'
    }],
    polyline: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qqmapsdk = new QQMapWX({
      key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
    })
    var that = this
    qqmapsdk.direction({
      mode: 'bicycling',
      from: {
        latitude: 26.084461,
        longitude: 119.254060
      },
      to: {
        latitude: 26.080857,
        longitude: 119.261549
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