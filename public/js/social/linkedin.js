alumnize.linkedinConnect = function(successHandler,failureHandler) {
	IN.UI.Authorize().params({"scope":["r_fullprofile", "r_emailaddress","r_contactinfo"]}).place();
	IN.Event.on(IN, "auth", function() {
		var fetchFields=[
			"id",
			"firstName",
			"location",
			"lastName",
			"skills",
			"positions",
			"educations",
			"languages",
			"phone-numbers",
			"certifications",
			"emailAddress",
			"mainAddress"
		];
		IN.API.Profile("me").fields(fetchFields).result(successHandler).error(failureHandler);
	});
};