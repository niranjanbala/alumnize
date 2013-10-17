alumnize.PeopleListView = Backbone.View.extend({
    events: {
      "submit": "formSubmitted"
    },
    formSubmitted: function(e) {
        this.model.performSearch(e.target.value);      
    },
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
		var that = this;
		_.each(this.model.get('result').models, function(user) {			
			$('#peopleList',that.$el).append(new alumnize.UserSmallView({model:user}).render().el);
		});
        return this;
    }
});

