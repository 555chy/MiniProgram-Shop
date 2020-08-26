const app = getApp()
const Bmob = app.globalData.Bmob
const uname = parseInt(Math.random() * 100000000)


Page({
  /**
   * 页面的初始数据
   */
  data: {
    headimg: "../../icon/circle.png",
    username: "num"+uname,
    password: "123456",
    confirmPassword: "",
    phoneNumber: "null",
    disable: true
  },
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('userInfo', function (data) {
      let res = JSON.parse(data)
      that.setData({
        headimg: res.avatarUrl,
        username: res.nickName,
      })

    })
  },
 
  /**
   * 点击注册
   */
  register: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    let username = this.data.username
    let password = this.data.password
    let confirmPassword = this.data.confirmPassword
    let phone = this.data.phoneNumber
    let headimg = this.data.headimg

    if (password != confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      })
      return
    }

    let params = {
      username,
      password,
      mobilePhoneNumber: phone,
      headUrl: headimg,
      admin: false,
      money: 0,
      days: 0,
      integral: 20
    }
   
    var that = this
    Bmob.User.register(params).then(res => {
      wx.hideLoading({
        complete: () => {
          wx.showToast({
            title: '注册成功',
          })
        }
      })
      Bmob.User.login(that.data.username, that.data.password).then(res => {
        wx.reLaunch({
          url: '../home/home',
        })
      }).catch(err => {
        console.log(err.error)
        wx.showToast({
          title: err.error,
          icon: 'none',
          complete: ()=>{
            that.sendErrorLog("注册成功,登录失败 " + err.error == null ? err.errorMsg : err.error)
          }
        })
      })
    }).catch(err => {
      wx.hideLoading({
        complete: () => {
          let code = err.code
          var title = ""
          if (code == 202) {
            title = "用户名已经注册,请更换后再注册"
          } else if(code == 209){
            title = "手机号已经注册,请更换后再注册"
          }else {
            title = err.error == null ? err.errorMsg : err.error
          }
          console.log(err)
          wx.showToast({
            title: title,
            icon: 'none',
            duration: 3000,
            complete: () => {
              that.sendErrorLog("注册失败 " + title)
            }
          })
        }
      })

    })
  },
  goLogin: function (e) {
    wx.navigateBack()
  },

  //input变化监听
  getUsername: function (e) {
    this.setData({
      username: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      let confirm = this.data.confirmPassword
      let phone = this.data.phoneNumber
      var disable = true
      if (username.length >= 2 && password.length > 5 && confirm.length > 5 && phone.length > 10) {
        disable = false
      }
      this.setData({
        disable
      })

    })
  },

  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      let confirm = this.data.confirmPassword
      let phone = this.data.phoneNumber
      var disable = true
      if (username.length >= 2 && password.length > 5 && confirm.length > 5 && phone.length > 10) {
        disable = false
      }
      this.setData({
        disable
      })

    })
  },

  getConfirm: function (e) {
    this.setData({
      confirmPassword: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      let confirm = this.data.confirmPassword
      let phone = this.data.phoneNumber
      var disable = true
      if (username.length >= 2 && password.length > 5 && confirm.length > 5 && phone.length > 10) {
        disable = false
      }
      this.setData({
        disable
      })

    })
  },

  getPhoneNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      let confirm = this.data.confirmPassword
      let phone = this.data.phoneNumber
      var disable = true
      if (username.length >= 2 && password.length > 5 && confirm.length > 5 && phone.length > 10) {
        disable = false
      }
      this.setData({
        disable
      })

    })
  },

  sendErrorLog: function(error){
    let username = this.data.username
    let phone = this.data.phoneNumber
    const query = Bmob.Query('Log');
    query.set("username", username)
    query.set("phone", phone)
    query.set("error", error)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})