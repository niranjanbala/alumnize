alumnize.Peoples = Backbone.Model.extend({
    url : "/user/find/1",
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
        var data = _.clone(this.model.attributes);
        console.log("PeopleListView data : ",data);
        _.each(data.result, function (people) {
            console.log("people : ",people);
            this.$el.append(this.template(people));
            alert(data.pageNumber);
            if(data.pageNumber == 1) {
                alert("pageNumber 1");
               $('.previous').hide();
            }
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