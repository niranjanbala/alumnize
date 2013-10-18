alumnize.Jobs = Backbone.Model.extend({

	initialize:function () {
    }
});

alumnize.JobsCollection = Backbone.Collection.extend({
    model: alumnize.Jobs
});

alumnize.JobSearchResult = Backbone.Model.extend({
	url: "http://alumnize-beta.herokuapp.com/user/find",
	defaults: {
	        pageNumber: 1,
	        pageSize: 15,
	        result : new alumnize.JobsCollection()
    },

    parse: function(response) {
	  response.result= new alumnize.JobsCollection(response.result);
	  return response;
	},

	performSearch: function(v){
		var self=this;
		console.log(v);		
		self.save({
			success: function (data) {
				console.log(data);
				self.set('result',data.get('result'));				
			}
		});
    }    
});