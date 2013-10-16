alumnize.PeopleListView = Backbone.View.extend({
    className:'nav nav-list',
    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("change", this.render, this);
        this.model.on("add", function (user) {
            $('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
        });
    },

    render:function () {
		this.$el.empty();
		var data = _.clone(this.model.attributes);
		console.log('pl render',this.model);
		console.log('pl render',this.model.get('result'));
		console.log('pl render',this.model.get('result').models);
		this.$el.html(this.template(data));
		_.each(data.result, function (user) {
			console.log('pl render',user);
			$('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
		}, this);
        return this;
    }
});