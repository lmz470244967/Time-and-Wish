//logs.js
import {
  getCurrentDate,
  generateDays,
  translateFormateDate,
  nextMonth,
  lastMonth,
  getDifferentDate
} from './util'

Page({
  data: {
    date: "2017-05-20",
    months: [{}],
    dateCN: "",
    optionkey: "",
    sentence: "input here",
    focus: false,
    setstorage: true,
    content: "",
    mod: 0,
    dif: 0,
    wininfo: []
  },
  onLoad: function (option) {
    var currentDate = getCurrentDate()
    //console.log(currentDate.getFullDate())
    var res, keys, box, temp
    var mod = 0
    var date = ""
    temp = { key: '', date: '', content: '', mod: '' }
    try {
      res = wx.getStorageInfoSync()
      keys = res.keys
      console.log(keys)
    } catch (e) {
      console.log("getStorageInfoSync error")
    }
    for (let key in keys) {
      box = keys[key]
      console.log("box =" + box)
      var test = box.substring(0, 5)
      //console.log(test)
      if (box.substring(0, 5) == option.key) {
        try {
          temp = wx.getStorageSync(box)
          console.log(temp)
        } catch (e) {
          console.log(e)
        }
        date = temp.date
        mod = temp.mod
      }
    }

    if (temp.date != "") {
      var year, month, day
      year = temp.date.split('-')[0]
      month = temp.date.split('-')[1]
      day = temp.date.split('-')[2]
      year = parseInt(year)
      if (month[0] == "0") {
        month = parseInt(month[1])
      } else { month = parseInt(month) }
      if (day[0] == "0") {
        day = parseInt(day[1])
      } else { day = parseInt(day) }
      console.log(year + "-" + month + "-" + day)
    } else {
      temp.date = currentDate.getFullDate()
      var year, month, day
      year = temp.date.split('-')[0]
      month = temp.date.split('-')[1]
      day = temp.date.split('-')[2]
      year = parseInt(year)
      if (month[0] == "0") {
        month = parseInt(month[1])
      } else { month = parseInt(month) }
      if (day[0] == "0") {
        day = parseInt(day[1])
      } else { day = parseInt(day) }
    }
    //console.log(getDifferentDate(year, month, day))

    var wininfo = []
    wx.getSystemInfo({
      success: function (res) {
        wininfo.push(res.screenHeight)
        wininfo.push(res.screenWidth)
      },
    })

    // console.log(value1)
    this.setData({
      date: temp.date,
      dateCN: translateFormateDate(temp.date),
      months: generateDays(temp.date),
      optionkey: option.key,
      sentence: temp.content,
      dif: getDifferentDate(year, month, day),
      mod: mod,
      wininfo: wininfo
    })
  },
  //下方input组件输入监听
  input1: function (e) {
    console.log(e)
    this.setData({
      mod: e.detail.value
    })
  },
  //点击中间编辑键，获取textarea聚焦
  focus: function (e) {
    this.setData({
      focus: true
    })
  },
  //左上角返回键监听
  back: function (e) {
    console.log("back")
    wx.switchTab({
      url: '../index/index',
    })
  },
  //右上角完全删除监听
  delete1: function (e) {
    var key = this.data.optionkey
    wx.removeStorage({
      key: key,
      success: function (res) {
        console.log(res)
      },
    })
    wx.switchTab({
      url: '../index/index',
    })
  },
  //获取textarea聚焦
  EventHandle: function (e) {
    //console.log(e)
    var sentence, content
    if (this.data.setstorage) {
      sentence = e.detail.value
      content = e.detail.value
    } else {
      sentence = ""
      content = ""
    }

    this.setData({
      sentence: sentence,
      content: content
    })
  },

  //点击submit按钮触发事件
  formSubmit: function (e) {
    var that = this
    var key1 = that.data.optionkey
    var temp = that.data.date
    var content = that.data.content
    var mod = that.data.mod
    //console.log(temp)
    //console.log(e.detail.value.textarea)
    wx.setStorage({
      key: key1,
      data: { key: key1, date: temp, content: content, mod: mod },
    })
    this.setData({
      setstorage: true
    })
  },

  //点击reset按钮触发事件
  formReset: function (e) {
    console.log("reset successful")
    this.setData({
      setstorage: false
    })
  },
  //更改picker-viewer触发事件
  bindPickerChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      months: generateDays(e.detail.value),
      date: e.detail.value,
      dateCN: translateFormateDate(e.detail.value)
    })
  },
})
