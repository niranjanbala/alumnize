alumnize.UserHomePage= Backbone.View.extend({

 render:function () {
 	 var data = _.clone(this.model.attributes);
     data.id = this.model.id;
	 this.$el.html(this.template(data));
	 this.$el.append(new alumnize.Footer().render().el);
	 return this;
 }
});
