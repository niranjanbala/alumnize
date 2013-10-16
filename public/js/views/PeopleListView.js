alumnize.PeopleListView = Backbone.View.extend({
    className:'nav nav-list',
    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (user) {
            $('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
        });
    },

    render:function () {
		this.$el.empty();
		var data = _.clone(this.model.attributes);
		if(data) {
			this.$el.html(this.template(data));
			_.each(this.get("userList").models, function (user) {
				console.log(user);
				$('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
			}, this);
		}
        return this;
    }
});