 alumnize.EditProfile = Backbone.View.extend({

    render:function () {
    	var data = _.clone(this.model.attributes);
    	data.id = this.model.id;
    	console.log(data);
        this.$el.html(this.template(data));        
        return this;
    }

});