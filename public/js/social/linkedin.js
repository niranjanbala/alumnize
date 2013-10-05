alumnize.linkedinConnect = function(successHandler,failureHandler) {
	IN.UI.Authorize().params({"scope":["r_fullprofile", "r_emailaddress","r_contactinfo"]}).place();
	IN.Event.on(IN, "auth", function() {
		IN.API.Profile("me").fields([ "id","firstName", "location","lastName","skills","positions","educations","languages","phone-numbers","certifications","emailAddress","mainAddress"]).result(successHandler).error(failureHandler);
	});
};