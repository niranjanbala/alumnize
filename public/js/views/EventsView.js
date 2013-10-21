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

        $("#demo-input-local").tokenInput([
                {id: 7, name: "Ruby"},
                {id: 11, name: "Python"},
                {id: 13, name: "JavaScript"},
                {id: 17, name: "ActionScript"},
                {id: 19, name: "Scheme"},
                {id: 23, name: "Lisp"},
                {id: 29, name: "C#"},
                {id: 31, name: "Fortran"},
                {id: 37, name: "Visual Basic"},
                {id: 41, name: "C"},
                {id: 43, name: "C++"},
                {id: 47, name: "Java"}
            ]);

        return this;
    }
});

