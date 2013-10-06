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
        	        		"education": profile._json.education
        	        	}
        			}], {safe:true}, function(err, result) {
        			if(err) throw err;
        		        	done(null, result);
        		});
        	}            
        });
	});
};
exports.findOrCreateGoogleUser = function(identifier, profile, done) {
	db.collection('users', function(err, collection) {		
		collection.findOne({"google.id" : identifier}, function(err, item) {
		if(item){
            		done(null,item);
        	}else {
        		collection.insert([{           
        			"google": {
        				"id": identifier,
					"profile": profile
        			},
	                	"email" : "",
        	        	"gender": "",
		                "name" : "",	
    			        "firstName": "",
        		        "middleName": "",
		            	"lastName": "",
	            	    	"locale" : "",
		            	"timezone": "",
		            	"location": "",
	                	"associations": {
        	        		"work": [],
        	        		"education": []
        	        	}
        			}], {safe:true}, function(err, result) {
        			if(err) throw err;
        		        	done(null, result);
        		});
        	}            
        });
	});
};
exports.findOrCreateLinkedInUser = function(token, tokenSecret, profile, done) {
	db.collection('users', function(err, collection) {		
		collection.findOne({"linkedin.id" : profile.id}, function(err, item) {
		if(item){
            		done(null,item);
        	}else {
        		collection.insert([{           
        			"linkedin": {
        				"id": profile.id,
					"profile": profile
        			},
	                	"email" : "",
        	        	"gender": "",
		                "name" : "",	
    			        "firstName": "",
        		        "middleName": "",
		            	"lastName": "",
	            	    	"locale" : "",
		            	"timezone": "",
		            	"location": "",
	                	"associations": {
        	        		"work": [],
        	        		"education": []
        	        	}
        			}], {safe:true}, function(err, result) {
        			if(err) throw err;
        		        	done(null, result);
        		});
        	}            
        });
	});
};
