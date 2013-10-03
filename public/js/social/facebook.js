alumnize.facebookConnect = function(successHandler,failureHandler) {
	$.ajaxSetup({ cache: true });
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
					successHandler(response);
				});
			} else {
				failureHandler(response);
			}
		}, {scope: 'email,publish_stream,user_about_me,user_education_history,user_location,user_work_history'});
}
