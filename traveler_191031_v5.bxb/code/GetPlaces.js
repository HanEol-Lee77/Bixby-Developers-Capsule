module.exports.function = function getPlaces (areaCodeNum, catNum) {
  const config = require('config');
  const baseAPIURL = config.get("baseAPIURL");
  const baseAPIURL2 = config.get("baseAPIURL2");

  const detailAPIURL = config.get("detailAPIURL");
  const detailAPIURL2 = config.get("detailAPIURL2");

  const detailIntroAPIURL = config.get("detailIntroAPIURL");
  const detailIntroAPIURL2 = config.get("detailIntroAPIURL2");

  const http = require('http');
  const key = "#";

  let res = http.getUrl(baseAPIURL+key+baseAPIURL2
    ,{
      query: {
        numOfRows:"10", 
        pageNo:"1", 
        areaCode: areaCodeNum, 
        cat1: catNum, 
        _type:"json"
        },
      returnHeaders:true
      }
  );
  places = JSON.parse(res.parsed)['response']['body']['items']['item'];

  // places에 detailCommon 정보를 추가해서 JSON 파일을 구성해준다.
  for (let i = 0; i < places.length; i++ ) {
    let contentId = places[i]['contentid'];
    let method = 'contentId='+String(contentId);
    res = http.getUrl(detailAPIURL+key+detailAPIURL2+method
      ,{
        query: {
          numOfRows:"10", 
          pageNo:"1", 
          _type:"json",
          },
        returnHeaders:true
        }
    );
    details = JSON.parse(res.parsed)['response']['body']['items']['item'];

    places[i]['overview'] = details['overview']
    places[i]['tel'] = details['tel']
    places[i]['telname'] = details['telname']

  }

  // places에 detailIntro 정보 (관광지 주변의 세부정보)를 추가해서 JSON 파일을 구성해준다.
  for (let i = 0; i < places.length; i++ ) {
    let contentId = places[i]['contentid'];
    let method = 'contentId='+String(contentId);
    res = http.getUrl(detailIntroAPIURL+key+detailIntroAPIURL2+method
      ,{
        query: {
          numOfRows:"10", 
          pageNo:"1", 
          _type:"json",
          },
        returnHeaders:true
        }
    );
    detailIntros = JSON.parse(res.parsed)['response']['body']['items']['item'];


    places[i]['cchkbabycarriage'] = detailIntros['cchkbabycarriage']
    places[i]['chkcreditcard'] = detailIntros['chkcreditcard']
    places[i]['chkpet'] = detailIntros['chkpet']
    places[i]['infocenter'] = detailIntros['infocenter']
    places[i]['parking'] = detailIntros['parking']
    places[i]['restdate'] = detailIntros['restdate']
    places[i]['usetime'] = detailIntros['usetime']
    places[i]['restdate'] = detailIntros['restdate'];
  }

  return places;
}