alumnize.Peoples = Backbone.Model.extend({
    url : "data/peoples.json",
    initialize:function () {               
    }
});

alumnize.PeopleSearch = Backbone.View.extend({
    render:function () {
    	console.log("Reached PeopleSearch...");
    	var data = _.clone(this.model.attributes);
    	data.id = this.model.id;
    	console.log("peoplesearch data ",data);
    	this.$el.html(this.template(data));        
        return this;
    }, 
    peopleSearch: function() {
 		$('.container').html(new alumnize.PeopleSearch({model: this.model}).render().el); 	
 	}
});