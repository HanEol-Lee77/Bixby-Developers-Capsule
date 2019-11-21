module.exports.function = function getCat () {
  // 다른 경로의 파일을 호출
  const catList = require("./lib/Cat.js");
  
  let cat = [];
  
  for(let i =0; i < catList.length; i++)
    cat.push(catList[i].name);
  
  return cat;
}