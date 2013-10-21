alumnize.EventsView = Backbone.View.extend({
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
            $('eventList', this.el).append(new alumnize.EventListView({model:user}).render().el);
        });
    },

    render:function () {
		this.$el.empty();
		var data = _.clone(this.model.attributes);
		this.$el.html(this.template(data));
        var that = this;
		_.each(this.model.get('result').models, function(user) {			
			$('#eventList',that.$el).append(new alumnize.EventListView({model:user}).render().el);
		});
        $('#startDatePicker',this.$el).datepicker({
        });
        $('#endDatePicker',this.$el).datepicker({
        });

        $("#location",this.$el).tokenInput([
                {id: 1, name: "India"},
                {id: 2, name: "China"},
                {id: 3, name: "Australia"},
                {id: 4, name: "Pakistan"},
                {id: 5, name: "Japan"},
                {id: 6, name: "Southafrica"}
            ]);

        return this;
    }
});

