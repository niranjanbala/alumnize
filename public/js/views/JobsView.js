alumnize.JobsView = Backbone.View.extend({
    events: {
      "submit #searchForm": "formSubmitted"
    },
    formSubmitted: function(e) {
        e.preventDefault();            
        this.model.performSearch($('#searchForm').serialize());
    },
    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("change:result", this.render, this);
        this.model.on("add", function (user) {
            $('jobList', this.el).append(new alumnize.UserSmallView({model:user}).render().el);
        });
    },

    render:function () {
		this.$el.empty();
		var data = _.clone(this.model.attributes);
		this.$el.html(this.template(data));
		var that = this;
		_.each(this.model.get('result').models, function(user) {			
			$('#jobList',that.$el).append(new alumnize.UserSmallView({model:user}).render().el);
		});
        return this;
    }
});

