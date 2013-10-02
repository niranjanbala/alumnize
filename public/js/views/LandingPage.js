alumnize.LandingPage = Backbone.View.extend({

    render:function () {
        this.$el.append(new alumnize.FeedBack().render().el);
        this.$el.append(new alumnize.Navigation().render().el);
        this.$el.append(new alumnize.Carousel().render().el);
        this.$el.append(new alumnize.Features().render().el);
        this.$el.append(new alumnize.Footer().render().el);
        return this;
    }
});