module.exports.function = function getAreaCode () {
  // 다른 경로의 파일을 호출
  const areaCodeList = require("./lib/Areacode.js");
  
  let areacode = [];
  
  for(let i =0; i < areaCodeList.length; i++)
    areacode.push(areaCodeList[i].name);
  
  return areacode;
}
