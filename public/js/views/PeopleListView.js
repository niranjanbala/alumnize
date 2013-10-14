alumnize.Peoples = Backbone.Model.extend({
    url : "/user/find",
    initialize:function () {               
    }
});

alumnize.PeopleListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (people) {
            self.$el.append(new alumnize.PeopleListItemView({model:people}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        alert("PeopleListView");
        var data = _.clone(this.model.attributes);
        console.log("this.model.models : ",data);
        _.each(data.result, function (people) {
            console.log("people : ",people);
            this.$el.append(new alumnize.PeopleListItemView({model:people}).render().el);
        }, this);
        return this;
    }
});

alumnize.PeopleListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        var data = _.clone(this.model.attributes);
        data.id = this.model.id;
        console.log("New data :: ", data);
        this.$el.html(this.template(data));
        return this;
    }

});