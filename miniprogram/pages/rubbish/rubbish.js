
Page({
  data: {
    curNav: 0,
    title: [],
    content: [],
    rubbishs:[],
    order: 0
  },

  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('rubbish', data => {
      console.log(data.rubbish)
      this.setData({
        order: data.rubbish.order,
        title: data.rubbish.value,
        rubbishs: data.rubbish.value,
        curNav: 0,
        content: data.rubbish.value[0].array
      });
    
      console.log(data.rubbish.value[0])
    })
  },

  switchRightTab: function(e) {
    const index = e.target.dataset.index;
    this.setData({
      curNav: index,
      content: this.data.title[index].array
    })
  }
})