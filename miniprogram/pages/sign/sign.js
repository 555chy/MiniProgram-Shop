const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data:{
    sign: [],
    days: 0,
    integral: 0,
    lianxu: 0,
    day: [1,2,3,4,5,6,7]
  },

  onLoad: function(options){
    let user = Bmob.User.current()
    let objectId = user.objectId
    var that = this
    const query = Bmob.Query('_User');
    query.get(objectId).then(res => {
      console.log(res)
      that.setData({
        sign: res.sign,
        lianxu: res.sign.length,
        integral: res.integral,
        days: res.days
      })
    }).catch(err => {
      console.log(err)
    })
  },

  sign: function(e){
    let user = Bmob.User.current()
    let objectId = user.objectId
    let days = this.data.days
    let integral = this.data.integral
    let lianxu = this.data.lianxu
    let temp = lianxu + 1
    let sign = this.data.sign
    let length = sign.length
    let lastTime = sign[length - 1]
    let currentTime = this.getCurrentTime()
    let lastStamp = this.dateToTimestamp(lastTime)
    let currentStamp = this.dateToTimestamp(currentTime)
    console.log(lastTime)
    console.log(currentTime)

    if(lastTime == currentTime){
      wx.showToast({
        title: '今日已签到',
        icon: 'none'
      })
    }else{
      const query = Bmob.Query('_User');
      query.set('id', objectId)
      if(currentStamp - lastStamp == 86400){
        //连续签到7天后重新开始签到
        if(sign.length == 7){
          sign.splice(0,sign.length)
        }
        sign.push(currentTime)
      }else{
        //断签删除数组，重新签到
        sign.splice(0,sign.length)
        sign.push(currentTime)
      }
      console.log(sign)
      query.set('sign', sign)
      query.set('integral',temp + integral)
      query.set('days',days + 1)
      query.save().then(res => {
        wx.showToast({
          title: '签到成功',
        })
        this.setData({
          sign,
          lianxu: sign.length,
          days: days + 1,
          integral: temp + integral
        })
        }).catch(err => {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        })
    }

  },

  test: function(e){
    let s = this.dateToTimestamp('2020-5-27')
    console.log(s)
    
  },

  getCurrentTime: function(){
    var time = parseInt(new Date().getTime());
    let date = new Date(time)
    var year=date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate();
    return year+'-' + mon + "-" + day
  },
  dateToTimestamp: function(date){
    var date = new Date(date)
    return Date.parse(date) / 1000
  }
  
})
  


