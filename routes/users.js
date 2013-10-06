var MongoClient = require('mongodb').MongoClient,
    db;
MongoClient.connect("mongodb://user:welcome001*@ds047448.mongolab.com:47448/heroku_app18353461", function(err, mDb) {
    db=mDb;
});
exports.findOrCreateFaceBookUser = function(accessToken, refreshToken, profile, done) {
	db.collection('users', function(err, collection) {		
		collection.findOne({"facebook.id" : profile.id}, function(err, item) {
			if(item){
            	done(null,item);
        	}else {
        	    profile._json.work

        		collection.insert([{           
        			"facebook": {
        				"id": profile.id,
						"profile": profile._json
        			},   	
                	"email" : profile.emails,
                	"gender": profile.gender,
	                "name" : profile.displayName,	
    	            "firstName": profile.name.givenName,
        	        "middleName": profile.name.middleName,
            	    "lastName": profile.name.familyName,
            	    "locale" : profile._json.locale,
            	    "timezone": profile._json.timezone,
            	    "location": profile._json.location.name,
                	"associations": {
                		"work": profile._json.work,
                		"school": profile._json.school
                	}
        		}], {safe:true}, function(err, result) {
        			if(err) throw err;
                	done(null, result);
        		});
        	}            
        });
	});
};