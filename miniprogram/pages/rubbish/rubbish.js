
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
        title: data.rubbish.rubbishs,
        rubbishs: data.rubbish.rubbishs,
        curNav: 0,
        content: data.rubbish.rubbishs[0].array
      });
      console.log(this.data.curNav)
      console.log(this.data)
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