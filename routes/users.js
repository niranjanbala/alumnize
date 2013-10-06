var MongoClient = require('mongodb').MongoClient,
    db;
MongoClient.connect("mongodb://user:welcome001*@ds047448.mongolab.com:47448/heroku_app18353461", function(err, mDb) {
    db=mDb;
});
exports.findOrCreateFaceBookUser = function(accessToken, refreshToken, profile, done) {
	db.collection('users', function(err, collection) {		
		collection.findOne({facebook.id : profile.id}, function(err, item) {
			if(item){
            	done(null,item);
        	}else {
        		console.log(profile);
        		collection.insert([{           
        			"facebook": {
        				"id": profile.id,
        				"link": profile.link,
        				"updated_time": profile.updated_time,
        				"username": profile.username,
						"verified": profile.verified,		
        			},    	
                	"email" : [profile.email],
                	"gender": profile.gender,
	                "name" : profile.displayName,	
    	            "firstName": profile.first_name,
        	        "middleName": profile.middle_name,
            	    "lastName": profile.last_name,
            	    "locale" : profile.locale,
            	    "timezone": profile.timezone,
            	    "location": profile.location,
                	"associations":[]
        		}], {safe:true}, function(err, result) {
        			if(err) throw err;
                	done(null, result);
        		});
        	}
            console.log(item);            
        });
	});
};