//index.js
const app = getApp()
const Bmob = app.globalData.Bmob


Page({
  data: {
    
  },
  onLoad: function(option){
   
   
   
  },


  send: function(){
    const query = Bmob.Query('_User');
    query.set('id', "YwvFj006")
    query.set('money', 20)
    query.save().then(res =>{
      console.log(res)
    }).catch(err =>{
      console.log(err)
    })
  },
 
  
})