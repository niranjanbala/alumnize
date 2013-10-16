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
		console.log('pl render');
		var data = _.clone(this.model.attributes);
		console.log('pl render',data);
		this.$el.html(this.template(data));
		_.each(this.model.get("result").models, function (user) {
			console.log('pl render',user);
			$('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
		}, this);
        return this;
    }
});