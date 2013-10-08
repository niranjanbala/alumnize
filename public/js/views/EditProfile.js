 alumnize.EditProfile = Backbone.View.extend({

    render:function () {
        this.$el.html(this.template());
        $('#editProfile').modal('show');        
        return this;
    }

});