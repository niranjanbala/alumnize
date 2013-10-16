alumnize.User = Backbone.Model.extend({

    url : "http://alumnize-beta.herokuapp.com/account",
    initialize:function () {
    }
});
alumnize.UserCollection = Backbone.Collection.extend({
    model: alumnize.User
});

alumnize.UserSearchResult = Backbone.Model.extend({
	defaults: {
	        pageNumber: 1,
	        pageSize: 15,
	        userList : new alumnize.UserCollection()
    }
});