module.exports.function = function selectCategory(cat) {
  // 다른 경로의 파일을 호출
  const catList = require("lib/Cat.js");
  let catNum;
  if (cat == '아무거나') {
    const idx = Math.floor(Math.random() * 7) + 1;
    catNum = catList[idx]["number"];
  } else {
    for (let i = 0; i < catList.length; i++) {
      if (catList[i]["name"] == cat) {
        catNum = catList[i]["number"];
        break;
      }
    }
  }
  return catNum;
}