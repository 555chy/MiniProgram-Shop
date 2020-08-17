const app = getApp()
const Bmob = app.globalData.Bmob
const type = new Map([[0,'可回收垃圾'],[1,'有害垃圾'],[2,'厨余(湿)垃圾'],[3,'其他(干)垃圾']])

Page({
  data: {
    images:[
      "https://img-blog.csdnimg.cn/20200616185918807.png",
      "https://img-blog.csdnimg.cn/20200616185918804.png",
      "https://img-blog.csdnimg.cn/20200616185918816.png",
      "https://img-blog.csdnimg.cn/20200616185918803.png"
   ],
   rubbish: [],
   word: '',
   modalHidden: true,
   result:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const query = Bmob.Query("Data");
    query.equalTo('id','==', 4)
    // const query = Bmob.Query("Rubbish_Recognize");
    // query.order('order')
    query.find().then(res => {
        console.log(res[0])
        that.setData({
          rubbish: res[0]
        })
    });
    
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true   //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
  },
  search: function(e){
    var that = this
    let key = "901b2bbdba31b32e6b2a05fca3bc71d0"
    let word = this.data.word
    let num = 1
    let mode = 1
    if(word == ''){
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
      return
    }

    let data = {key,word,num,mode}

    wx.request({
      url: 'https://api.tianapi.com/txapi/lajifenlei/index',
      method: 'GET',
      data,
      success(res){
        let code = res.data.code
        if(code == 200){
          console.log(res)
          let info = res.data.newslist[0]
          let result = info.name + ': 属于' + type.get(info.type) + '\n\n' + info.explain + '\n' + info.contain + '\n\ntip: ' + info.tip
        
          that.setData({
            modalHidden: false,
            result
          })
        }else{
          let msg = ''
          switch(code){
            case 100:
              msg = '内部服务器错误'
              break
            case 110:
              msg = '接口暂时维护中'
              break
            case 130:
              msg = 'API调用频率超限'  
              break
            case 150:
              msg = '接口可用次数不足'
              break
            case 290:
              msg = '超过资源字节限制'
              break
            default:
                msg = '识别出错,请稍后再试'
                break
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          
        }
      },
      fail(err){
        wx.showToast({
          title: '识别出错,请稍后再试',
          icon: 'none'
        })
       
      }
    })

  },
  getInput: function(e){
    let value = e.detail.value
    this.setData({
      word: value
    })
   
  },

  goRubbish: function(e){
    let index = e.currentTarget.dataset.index
    let rubbish = this.data.rubbish.value[index]
    wx.navigateTo({
      url: '../rubbish/rubbish',
      success: function (e) {
        e.eventChannel.emit('rubbish', {
            rubbish
        })
      }
    })
  },

  modalBindaconfirm: function () {
     this.setData({modalHidden: true})
  }

  
})