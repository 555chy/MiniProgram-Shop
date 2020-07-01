const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    images:[
      "https://img-blog.csdnimg.cn/20200616185918807.png",
      "https://img-blog.csdnimg.cn/20200616185918804.png",
      "https://img-blog.csdnimg.cn/20200616185918816.png",
      "https://img-blog.csdnimg.cn/20200616185918803.png"
   ],
   rubbish: [],
   word: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const query = Bmob.Query("Rubbish_Recognize");
    query.order('order')
    query.find().then(res => {
        console.log(res)
        that.setData({
          rubbish: res
        })
    });
    
  },
  search: function(e){
  
    let key = "901b2bbdba31b32e6b2a05fca3bc71d0"
    let word = this.data.word
    let num = 3
  
    if(word == ''){
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
      return
    }

    let data = {key,word,num}

    wx.request({
      url: 'https://api.tianapi.com/txapi/lajifenlei/index',
      method: 'GET',
      data,
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })

  },

  goRubbish: function(e){
    let index = e.currentTarget.dataset.index
    let rubbish = this.data.rubbish[index]

    wx.navigateTo({
      url: '../rubbish/rubbish',
      success: function (e) {
        e.eventChannel.emit('rubbish', {
            rubbish
        })
      }
    })
    

  }

  
})