//index.js
const app = getApp()
const Bmob = app.globalData.Bmob
const date = new Date()

Page({
  data: {
    time: 0
  },
  click: function(){
    let currentTime = Math.round(new Date().getTime() / 1000)
    let time = this.data.time
   
    if(currentTime - time > 5){
      console.log("play")
      this.setData({
        time: currentTime
      })
             
  }

  },

  onLoad: function(){
   
  }



  




})