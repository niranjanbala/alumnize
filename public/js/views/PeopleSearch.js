alumnize.Peoples = Backbone.Model.extend({
    url : "data/peoples.json",
    initialize:function () {               
    }
});

alumnize.PeopleSearch = Backbone.View.extend({
    render:function () {
    	var data = _.clone(this.model.attributes);
    	data.id = this.model.id;
    	console.log("peoplesearch data ",data);
    	this.$el.html(this.template(data));        
        return this;
    }
});