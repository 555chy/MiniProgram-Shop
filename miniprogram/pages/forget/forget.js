const app = getApp()
const Bmob = app.globalData.Bmob

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getEmail: function(e){
    let email = e.detail.value
    this.setData({
      email
    })
  },

  verify: function(e){
    let email = this.data.email
    
    if(email != ''){
      Bmob.requestPasswordReset(this.data).then(res =>{
        console.log(res)
        wx.showToast({
          title: '请到邮箱中重置密码'
        })
      }).catch(err =>{
        console.log(err)
        let code = err.code
        let msg = ''
        if(code == 301){
          msg = "请输入正确的邮箱"
        }else if(code == 205){
          msg = '没有用户使用该邮箱注册'
        }else{
          msg = err.error
        }
        wx.showToast({
          title: msg,
          icon: 'none'
        })

      })
      
    }else{
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none'
      })
    }
  }

})