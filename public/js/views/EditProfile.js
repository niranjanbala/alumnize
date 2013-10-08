 alumnize.EditProfile = Backbone.View.extend({

    render:function () {
        this.$el.html(this.template());
        console.log(this.$el);
        $('#editProfile').modal('show');        
        return this;
    }

});