module.exports.function = function selectAreaCode(areaCode) {
  // 다른 경로의 파일을 호출
  const areaCodeList = require("lib/AreaCode.js");
  let areaCodeNum;

  if (areaCode == '아무데나') {
    const idx = Math.floor(Math.random() * 16) + 1;
    areaCodeNum = areaCodeList[idx]["number"];
  } else {
    for (let i = 0; i < areaCodeList.length; i++) {
      if (areaCodeList[i]["name"] == areaCode) {
        areaCodeNum = areaCodeList[i]["number"];
        break;
      }
    }
  }
  return areaCodeNum;
}