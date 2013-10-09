 alumnize.EditProfile = Backbone.View.extend({

    render:function () {
    	var data = _.clone(this.model.attributes);
    	console.log(data);
        this.$el.html(this.template(data));        
        return this;
    }

});