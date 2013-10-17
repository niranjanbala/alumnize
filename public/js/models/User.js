alumnize.User = Backbone.Model.extend({

    url : "http://alumnize-beta.herokuapp.com/account",
    initialize:function () {
    }
});
alumnize.UserCollection = Backbone.Collection.extend({
    model: alumnize.User
});

alumnize.UserSearchResult = Backbone.Model.extend({
	url: "http://alumnize-beta.herokuapp.com/user/find",
	defaults: {
	        pageNumber: 1,
	        pageSize: 15,
	        result : new alumnize.UserCollection()
    },
    parse: function(response) {
	  response.result= new alumnize.UserCollection(response.result);
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
    },    
});