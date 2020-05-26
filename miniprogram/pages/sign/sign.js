const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data:{
    sign: [],
    day: [1,2,3,4,5,6,7]
  },

  onLoad: function(options){
    var that = this
    const query = Bmob.Query('_User');
    query.get('qA80111G').then(res => {
      console.log(res)
      that.setData({
        sign: res.sign
      })
    }).catch(err => {
      console.log(err)
    })
  },

  sign: function(e){
    let user = Bmob.user.current()
    let objectId = user.objectId

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
      query.save().then(res => {
        wx.showToast({
          title: '签到成功',
        })
        this.setData({
          sign
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
  


