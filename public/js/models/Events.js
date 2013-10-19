alumnize.Events = Backbone.Model.extend({
	initialize:function () {
    }
});

alumnize.EventsCollection = Backbone.Collection.extend({
    model: alumnize.Events
});

alumnize.EventSearchResult = Backbone.Model.extend({
	url: "http://alumnize-beta.herokuapp.com/user/find",
	defaults: {
	        pageNumber: 1,
	        pageSize: 15,
	        result : new alumnize.EventsCollection()
    },

    parse: function(response) {
	  response.result= new alumnize.EventsCollection(response.result);
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