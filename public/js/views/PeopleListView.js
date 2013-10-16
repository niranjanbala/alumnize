alumnize.PeopleListView = Backbone.View.extend({
    className:'nav nav-list',
    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (employee) {
            self.$el.append(new alumnize.UserSmallView({model:employee}).render().el);
        });
    },

    render:function () {
		var data = _.clone(this.model.attributes);
		data.id = this.model.id;
		console.log(data);
        this.$el.html(this.template(data));
        /*_.each(this.model.models, function (user) {
            this.$el.append(new alumnize.UserSmallView({model:user}).render().el);
        }, this);*/
        return this;
    }
});