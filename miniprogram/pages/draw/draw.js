// pages/random/random.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gift: ["谢谢参与","19积分","蓝月亮洗衣液","集品围裙","集品雨伞","xxxx","xxxx","维达抽纸120抽4包","金龙鱼花生调和油5L","xxxx","xxxx","集品口袋小风扇","29积分","三只松鼠坚果大礼包","7积分","谢谢参与"],
    probability: [0.2, 0.1, 0.015, 0.08, 0.03, 0.05, 0.005, 0.07 ,0.07, 0.03, 0.15, 0.2]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // for(var i = 0; i < 20; i++){
    //   console.log(i + "|" + this.randomProbability(this.data.gift, this.data.probability))
    // }

   
  },

  randomProbability: function(arr1, arr2){
    var sum = 0,
    factor = 0,
    random = Math.random();
    for(var i = arr2.length - 1; i >= 0; i--) {
      sum += arr2[i]; // 统计概率总和
    };
  
    random *= sum; // 生成概率随机数
    for(var i = arr2.length - 1; i >= 0; i--) {
      factor += arr2[i];
      if(random <= factor) return arr1[i];
    };
    return null;
  }

 
})