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
    initialize : function(){
		this.result= new alumnize.UserCollection(this.get('result'));
	}
});