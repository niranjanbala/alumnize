alumnize.PeopleListView = Backbone.View.extend({
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

        $("#collegeSchool",this.$el).tokenInput([
                {
                    "value": {
                        "cityName": "Villupuram",
                        "stateName": "Tamilnadu",
                        "collegeName": "Theivanai Ammal College For Women"
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Bangalore",
                        "stateName": "Karnataka",
                        "collegeName": "Bangalore Institute Of Legal Studies."
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Bangalore",
                        "stateName": "Karnataka",
                        "collegeName": "Bangalore Technical Foundation Trust"
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Amritsar",
                        "stateName": "Punjab",
                        "collegeName": "Department Of Food Science & Technology"
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Kazhikode",
                        "stateName": "Kerala",
                        "collegeName": "Co-operative Institute Of Technology"
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Pune",
                        "stateName": "Maharashtra",
                        "collegeName": "Nutan Maharashtra Vidya Prasarak Mandal's, Nutan Maharashtra Institute Of Technology"
                    },
                    "type": "college"
                },
                {
                    "value": {
                        "cityName": "Bangalore",
                        "stateName": "Karnataka",
                        "collegeName": "Vokkaligara Sangha Dental College & Hospital"
                    },
                    "type": "college"
                }
        ],{
            propertyToSearch: "value"."collegeName",
            resultsFormatter: function(item){ console.log(item); }
        });

        return this;
    }
});

