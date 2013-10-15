alumnize.Peoples(pageNo) = Backbone.Model.extend({
    url : "/user/find/"+pageNo,
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