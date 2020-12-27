// 播放次数格式化
exports.numberFormat = (num) => {
  if (num > 100000) {
    return parseInt(num / 10000) + "万";
  } else {
    return num;
  }
}

// 评论时间格式化
exports.commentDateFormat = (time) => {
  let date = new Date(time);
  let nowdate = new Date();
  let y = date.getFullYear().toString().padStart(2, "0");
  let m = (date.getMonth() + 1).toString().padStart(2, "0");
  let d = date.getDate().toString().padStart(2, "0");
  let hh = date.getHours().toString().padStart(2, "0");
  let mm = date.getMinutes().toString().padStart(2, "0");
  if(parseInt(y) != nowdate.getFullYear()){
    return `${y}年${m}月${d}日 ${hh}:${mm}`;
  }else if(parseInt(m) != nowdate.getMonth() + 1 || parseInt(d) < nowdate.getDate() - 1){
    return `${m}月${d}日 ${hh}:${mm}`;
  }else if(parseInt(d) == nowdate.getDate() - 1){
    return `昨天${hh}:${mm}`;
  }else if(parseInt((nowdate - date) /60000) < 60){
    return `${parseInt((nowdate - date) /60000)}分钟前`;
  }else{
    return `${hh}:${mm}`;
  }
}


exports.durationFormat = (duration, separator=":", lastSeparator="") => {
  if(isNaN(duration)){
    return false;
  }
  let minute = (Math.floor(duration / 60000) % 60).toString().padStart(2, "0");
  let second = (Math.floor(duration / 1000) % 60).toString().padStart(2, "0");
  let millisecond=Math.floor(duration) % 1000;
  return `${minute}${separator}${second}${lastSeparator}`;
}