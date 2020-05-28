//index.js
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    smsId: ''
  },



  getVerify: function (e) {
    var that = this
    let params = {
      mobilePhoneNumber: '15159913254'
    }

    Bmob.requestSmsCode(params).then(res => {
      console.log(res)
      that.setData({
        smsId: res.smsId
      })

    }).catch(err => {
      console.log(err)
    })

  },

  login: function (e) {
    // let smsId = this.data.smsId
    // //522365
    // let data = {
    //   mobilePhoneNumber: '15159913254'
    // }
    // Bmob.verifySmsCode('768542', data).then(function (response) {
    //     console.log(response);
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    //  let params = {
    //   username:'orientwhite',
    //   password:'111111',
    //   mobilePhoneNumber: '15159913254',
    //   admin: false,
    //   money: 0,
    // }

    // Bmob.User.register(params).then(res =>{
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })

    
    let data = {
      password: '1234566'
    }
    Bmob.resetPasswordBySmsCode('122323', data).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }


})