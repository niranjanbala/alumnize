alumnize.linkedinConnect = function(successHandler,failureHandler) {
	IN.UI.Authorize().params({"scope":["r_fullprofile", "r_emailaddress","r_contactinfo"]}).place();
	IN.Event.on(IN, "auth", this.onLinkedInAuth);
},
onLinkedInAuth = function () {
	IN.API.Profile("me").fields([ "id","firstName", "location","lastName","skills","positions","educations","languages","phone-numbers","certifications","emailAddress","mainAddress"]).result(this.success).error(this.failure);
},
success = function (response) {
	successHandler(response);
},
failure = function (response) {
	failureHandler(response);
}
