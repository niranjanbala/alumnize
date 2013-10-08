 alumnize.EditProfile = Backbone.View.extend({

    render:function () {
        this.$el.html(this.template());
        this.$el.modal('show');
        return this;
    }

});