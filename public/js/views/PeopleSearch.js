alumnize.Peoples = Backbone.Model.extend({
    url : "/user/find",
    initialize:function () {               
    }
});

alumnize.PeopleSearch = Backbone.View.extend({
    render:function () {
    	var data = _.clone(this.model.attributes);
    	data.id = this.model.id;
    	console.log("peoplesearch data ",data);

        var totalCount = data.totalCount;
        var pageSize = data.pageSize;
        var pageNumber = data.pageNumber;

        alert(totalCount);
        alert(pageSize);
        alert(pageNumber);

        //$(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            console.log(data);
            console.log(data[0]);
            $('.list-group', this.el).append($("<li>"+data[0].name+"</li>"));
        }

        //this.$el.html(this.template(data));

   //     $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

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