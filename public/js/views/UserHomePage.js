alumnize.UserHomePage= Backbone.View.extend({

 render:function () {
 	 var data = _.clone(this.model.attributes);
	 data.id = this.model.id;
	 console.log(data);
	 this.$el.html(this.template(data));
	 this.$el.append(new alumnize.Footer().render().el);
	 return this;
 },
 editProfile: function() {
 	$('.container').html(new alumnize.EditProfile().render().el); 	
 },
 className: function(){
	    return "userHomePage";
 },
});
