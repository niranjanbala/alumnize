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
					     "work" : profile._json.work,
                         "education": profile._json.education
        			},
                        "isNew": 1,
	                	"email" : profile.emails,
        	        	"gender": profile.gender,
		                "name" : profile.displayName,
    			        "firstName": profile.name.givenName,
        		        "middleName": profile.name.middleName,
		            	"lastName": profile.name.familyName,
		            	"locale" : profile._json.locale,
		            	"timezone": profile._json.timezone,
		            	"location": profile._json.location,
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
                        "isNew": 1,
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
                        "isNew": 1,
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
exports.findByFilterAndSort = function(req, res) {
    db.collection('users', function(err, collection) {
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
                "result" : items
            });
        });
    });
};
exports.findJobs = function(req, res) {
    db.collection('jobs', function(err, collection) {
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
                "result" : [
                            {
                              
                                "jobTitle": "PHP Developer",
                                "jobDesc": "PHP Developer (Wordpress & Magento Development) | Exp in PHP, CSS3, Ajax, MySQL, Jquery, JSON, Photoshop along with Facebook-Twitter API | Aware of HTML5 Responsive Design | Good communication skills | Problem Solving in the Live Environment",
                                "experience": "3-4 years",
                                "salary": "4-5 lacs P/A",
                                "location": "Chennai",
                                "company": "WIPRO"
                              },
                              {
                              
                                "jobTitle": "PERL Developer",
                                "jobDesc": "PERL Developer | Exp in PERL (CGI), CSS3, Ajax, MySQL, Jquery, JSON, Photoshop along with Facebook-Twitter API | Aware of HTML5 Responsive Design | Good communication skills | Problem Solving in the Live Environment",
                                "experience": "5-6 years",
                                "salary": "5-6 lacs P/A",
                                "location": "Bangalore",
                                "company": "HCL"
                              }
                            ]
            });
        });
    });
};