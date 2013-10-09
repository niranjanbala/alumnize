 alumnize.PeopleSearch = Backbone.View.extend({
    render:function () {
    	console.log("Reached PeopleSearch...");
		this.$el.html(this.template());        
        return this;
    }
});