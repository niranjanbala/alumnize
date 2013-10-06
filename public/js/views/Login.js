alumnize.Login = Backbone.View.extend({
	events: {		
	},

	initialize:function () {
		this.render();
	},
	facebookSuccess: function(response) {
		console.log('Good to see you, ' + response.name + '.');
		console.log(response);
		alumnize.userHomePage = new alumnize.UserHomePage();
		$('body').html(alumnize.userHomePage.render().el);
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
		alumnize.userHomePage = new alumnize.UserHomePage();
		$('body').html(alumnize.userHomePage.render().el);
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
