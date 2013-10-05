alumnize.UserHomePage= Backbone.View.extend({

 render:function () {
	 this.$el.html(this.template());
	 this.$el.append(new alumnize.Footer().render().el);
	 return this;
 }
});
