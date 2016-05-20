module.exports = function(router) {
  router.post('/shopping/MiniCart/', function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      "ErrorCode":"",
      "MiniCart":{
        "TotalBuyAmount":4,
        "Details":[
          {
            "LinkUrl":"/Detail/P400000800102/S",
            "Barcode": "M400000800102",
            "Image":"/img/dummy-items3-1x.jpg",
            "ProductName":"黑白條紋內拼雪紡裙擺背心上衣",
            "ProductSize":"S",
            "BuyAmount":1
          },
          {
            "LinkUrl":"/Detail/P303000011900/Free",
            "Barcode": "M303000011900",
            "Image":"/img/dummy-items4-1x.jpg",
            "ProductName":"MIT LONDON CITY牛仔布棒球帽",
            "ProductSize":"Free",
            "BuyAmount":1
          },
          {
            "LinkUrl":"/Detail/P401000341902/S",
            "Barcode": "M401000341902",
            "Image":"/img/dummy-items1-1x.jpg",
            "ProductName":"粉嫩格紋內襯刷破抽鬚牛仔短褲",
            "ProductSize":"S",
            "BuyAmount":2
          },
          {
            "LinkUrl":"/Detail/P401000341902/S",
            "Barcode": "M401000341902",
            "Image":"/img/dummy-items1-1x.jpg",
            "ProductName":"粉嫩格紋內襯刷破抽鬚牛仔短褲",
            "ProductSize":"S",
            "BuyAmount":2
          },
          {
            "LinkUrl":"/Detail/P401000341902/S",
            "Barcode": "M401000341902",
            "Image":"/img/dummy-items1-1x.jpg",
            "ProductName":"粉嫩格紋內襯刷破抽鬚牛仔短褲",
            "ProductSize":"S",
            "BuyAmount":2
          }
        ]
      }
    }));
  });

  router.post('/Product/ArrivalNotice', function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      "result":true,
      "errorMsg":""
    }));
  });
}