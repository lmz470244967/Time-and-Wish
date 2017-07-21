//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    backg: '../../images/background.png',
    memo: [{ key: 'memo0', date: '', content: 'we meet today' }],
    box: [],
    keybox: [],
    wininfo: [],
  },
  //点击edit按钮触发编辑新的备忘事件
  primary: function (e) {
    var res, num, keys, key
    var that = this
    num = 0
    try {
      //获取当前缓存中带有key数据个数
      res = wx.getStorageInfoSync()
      keys = res.keys
      for (key in keys) {
        num++
      }
    } catch (e) {
      console.log("getStorageInfoSync error")
    }
    //传递新的键值保存新的数据
    wx.redirectTo({
      url: "../logs/logs?key=" + "memo" + num
    })
    console.log(e);
  },

  // 监听点击每一个内容块
  actionitem: function (e) {
    var key = e.currentTarget.dataset.text
    wx.redirectTo({
      url: "../logs/logs?key=" + key,
    })
    console.log(key)
  },

  onLoad: function (option) {
    var that = this
    var dat = new Date()
    var res, keys, key, temp, box
    var wininfo = []
    var keybox = []
    var memoData = that.data.memo
    memoData[0].date = dat.getFullYear() + "-" + (dat.getMonth() + 1) + "-" + dat.getDate()
    console.log(memoData)
    try {
      res = wx.getStorageInfoSync()
      keys = res.keys
      console.log(keys)
    } catch (e) {
      console.log("getStorageInfoSync error")
    }
    for (let key in keys) {
      box = keys[key]
      //console.log("keybox ="+keybox)
      var test = box.substring(0, 4)
      //console.log(test)
      if (box.substring(0, 4) == "memo") {
        keybox.push(box)
        try {
          temp = wx.getStorageSync(box)
          memoData.push(temp)
          //console.log("memoData=" + memoData)
          //console.log(temp)
        } catch (e) {
          console.log(e)
        }
      }
    }
    wx.getSystemInfo({
      success: function (res) {
        wininfo.push(res.screenHeight)
        wininfo.push(res.screenWidth)
      },
    })
    //console.log(wininfo)
    this.setData({
      memo: memoData,
      keybox: keybox,
      wininfo: wininfo
    })
    //console.log("setdata successful")
    console.log(wininfo)
  }
})
