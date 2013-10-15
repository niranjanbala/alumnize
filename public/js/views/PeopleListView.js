alumnize.Peoples = Backbone.Model.extend({
    url : "/user/find/1",
    initialize:function () {               
    }
});

alumnize.PeopleListView = Backbone.View.extend({
    initialize:function () {
    },

    render:function () {
        this.$el.empty();
        var data = _.clone(this.model.attributes);
        console.log("PeopleListView data : ",data);
        this.$el.append(this.template(data));
        return this;
    }
});