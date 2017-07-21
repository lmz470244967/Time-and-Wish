function addZero(num) {
  return num < 10 ? '0' + num : num
}

function getDifferentDate(year, month, day) {
  var today = new Date()
  var tyear = today.getFullYear()
  var tmonth = today.getMonth() + 1
  var tday = today.getDate()
  var dify, difd, tdifd
  if ((tyear - year) < 0) {
    dify = year - tyear - 1
    difd = (month - 1) * 30 + day
    tdifd = (12 - tmonth) * 30 + (31 - tday)
    return dify * 365 + tdifd + difd
  } else if (year == tyear) {
    if (tmonth - month < 0) {
      return day - tday + (month - tmonth) * 30
    } else if (tmonth - month == 0) {
      if (tday - day < 0) {
        return day - tday
      } else {
        return tday - day
      }
    } else {
      return + (tmonth - month) * 30 + tday - day
    }
  } else {
    dify = tyear - year - 1
    tdifd = (tmonth - 1) * 30 + tday
    difd = (12 - month) * 30 + (31 - day)
    return dify * 365 + tdifd + difd
  }
}

function getCurrentDate(date) {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth() + 1
  var day = today.getDate()
  var week = today.getDay()

  function getFullDate() {
    return year + '-' + addZero(month) + '-' + addZero(day)
  }

  function getYearMonth() {
    return year + '-' + addZero(month)
  }

  return {
    getFullDate,
    getYearMonth,
  }
}

function translateFormateDate(date) {
  var year = date.split('-')[0]
  var month = date.split('-')[1]
  var day = date.split('-')[2]
  return year + '年' + month + '月' + day + '日'
}


//输入年份，判断是润年还是平年
function is_leap(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0 ? true : false
}

//输入年份，获取这一年每个月的天数
function m_days(year) {
  return [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

//输入年月，返回这个月的第一天是星期几
//2017-04
function firstDay(date) {
  return new Date(date + '-01').getDay()
}

//输入年月，返回一个数组, 2017-03
function generateDays(date) {
  var year = date.split('-')[0]
  var month = date.split('-')[1] - 1
  var arr = []
  for (let j = 0; j < firstDay(date); j++) {
    arr.push({ value: '', num: '' })
  }
  for (let i = 0; i < m_days(year)[month]; i++) {
    let value = year + '-' + addZero(month + 1) + '-' + addZero(i + 1)

    arr.push({
      num: addZero(i + 1),
      value: value,
    })
  }
  return arr
}

//接受年月，返回下一个年月
function nextMonth(date) {
  var year = date.split('-')[0]
  var month = date.split('-')[1]
  if (parseInt(month) < 11)
    return year + '-' + addZero(parseInt(month) + 1)
  else
    return parseInt(year) + 1 + '-' + '01'
}

//接受年月，返回前一个年月
function lastMonth(date) {
  var year = date.split('-')[0]
  var month = date.split('-')[1]

  if (month === '01')
    return parseInt(year) - 1 + '-' + '12'
  else
    return year + '-' + addZero(parseInt(month) - 1)
}

module.exports = {
  getCurrentDate: getCurrentDate,
  generateDays: generateDays,
  translateFormateDate: translateFormateDate,
  nextMonth: nextMonth,
  lastMonth: lastMonth,
  getDifferentDate: getDifferentDate
}
