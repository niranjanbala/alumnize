alumnize.Login = Backbone.View.extend({
    events: {
	"click .fbLogin" : "facebookLogin"
    },

    initialize:function () {
	this.render();
    },

    facebookLogin:function () {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
		FB.init({
			appId: '514256625329292',
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		FB.login(function(response) {
	   		if (response.authResponse) {
		  	        console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
					console.log('Good to see you, ' + response.name + '.');
					console.log('Full response : ' + response);
		 	        });
		        } else {
			     console.log('User cancelled login or did not fully authorize.');
	   		}
		}, {scope: 'email,publish_stream,user_about_me,user_education_history,user_location,user_work_history'});
	});
    },

    render:function () {
        this.$el.html(this.template());
        return this;
    } 

});
