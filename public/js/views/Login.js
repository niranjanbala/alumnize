alumnize.Login = Backbone.View.extend({
    events: {
		"click .fbLogin" : "facebookLogin"
    },

    initialize:function () {
		this.render();
    },
	facebookSuccess: function(response) {
		console.log('Good to see you, ' + response.name + '.');
		console.log(response);
	},
	facebookFailure: function(response) {
			console.log('User cancelled login or did not fully authorize.');
			console.log('Full response : ' + response);
	},
    facebookLogin:function () {
		alumnize.facebookConnect(this.facebookSuccess,this.facebookFailure);
    },
    render:function () {
        this.$el.html(this.template());
        return this;
    }

});
