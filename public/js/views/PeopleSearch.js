alumnize.Peoples = Backbone.Model.extend({
    url : "data/peoples.json",
    initialize:function () {               
    }
});

alumnize.PeopleSearch = Backbone.View.extend({
    render:function () {
    	var data = _.clone(this.model.attributes);
    	data.id = this.model.id;
    	console.log("peoplesearch data ",data);

        var len = data.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        alert(len);
        alert(startPos);
        alert(endPos);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new PeopleListItemView({model: data[i]}).render().el);
        }

   //     $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

alumnize.PeopleListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        console.log("PeopleListItemView :: ",this.model);
        $(this.el).html(this.template(this.model));
        return this;
    }

});

alumnize.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#people"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});