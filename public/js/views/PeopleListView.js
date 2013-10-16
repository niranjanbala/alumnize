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
		this.$el.html(this.template(data));
		console.log(this.model.get('result'));
		console.log(this.model.get('result').models);
		_.each(this.model.get('result').models, function(user) {
			console.log(user);
			$('peopleList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
		});
		this.model.get('result').each(function(user) {


		});
        return this;
    }
});