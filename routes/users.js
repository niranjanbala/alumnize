var MongoClient = require('mongodb').MongoClient,
    db;
MongoClient.connect("mongodb://heroku_app18353461:welcome001*@ds047448.mongolab.com:47448/heroku_app18353461", function(err, mDb) {
    db=mDb;
});
exports.findOrCreateFaceBookUser = function(accessToken, refreshToken, profile, done) {
	db.collection('users', function(err, collection) {
		collection.findOne{fbId : profile.id}, function(err, item) {
			if(item){
            	done(null,item);
        	}else {
        		collection.insert([{
                fbId : profile.id ,
                email : profile.emails[0].value,
                name : profile.displayName        			        		        	
        		}], {safe:true}, function(err, result) {
        			if(err) throw err;
                	done(null, result);
        		});
        	}
            console.log(item);            
        });
	});
};