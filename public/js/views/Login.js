alumnize.Login = Backbone.View.extend({
	events: {
		"click .fbLogin" : "facebookLogin",
		"click .lnLogin" : "linkedinLogin"
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


	linkedinSuccess: function(response) {
		console.log('Good to see you, ' + response );
		console.log(response);
	},
	linkedinFailure: function(response) {
		console.log('User cancelled login or did not fully authorize.');
		console.log('Full response : ' + response);
	},
	linkedinLogin:function () {
		alumnize.linkedinConnect(this.linkedinSuccess,this.linkedinFailure);
	},

	render:function () {
        	this.$el.html(this.template());
        	return this;
	}
});
