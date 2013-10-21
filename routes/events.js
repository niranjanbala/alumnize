var MongoClient = require('mongodb').MongoClient,
    db;
MongoClient.connect("mongodb://user:welcome001*@ds047448.mongolab.com:47448/heroku_app18353461", function(err, mDb) {
    db=mDb;
});
exports.findEvents = function(req, res) {
    db.collection('events', function(err, collection) {
        var filters={};
        var sorter={firstName: 1};
        var pageSize=25;
        var pageNumber=1;
        if(req.params.pageNumber) {
            pageNumber=req.params.pageNumber;
        }
        collection.find(filters).sort(sorter).skip(pageSize * (pageNumber-1)).limit(pageSize).toArray(function(err, items) {
            res.jsonp({
                "pageSize" : pageSize,
                "pageNumber": pageNumber,
                "result": [
                              {
                                "eventName": "China International Organic Food Industry Expo",
                                "eventType": "Festival, Fair, Exhibition, Show",
                                "location": "Shanghai International Exhibition Center, Shanghai, China",
                                "contactEmail": "foodexhibition11@163.com",
                                "website": "http://www.gnfexpo.com.cn/",
                                "startDate": "20-10-2013",
                                "endDate": "22-10-2013"
                              }
                            ]
            });
        });
    });
};