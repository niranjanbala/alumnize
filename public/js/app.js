var alumnize = {
    views: {},
    models: {},
    loadTemplates: function(views, callback) {
        var deferreds = [];
        $.each(views, function(index, view) {
            if (alumnize[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    alumnize[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });
        $.when.apply(null, deferreds).done(callback);
    }
};
alumnize.Router = Backbone.Router.extend({
    routes: {
    },
    initialize: function () {
		alumnize.landingPage = new alumnize.LandingPage();
		$('body').html(alumnize.landingPage.render().el);
    }
});
$(document).on("ready", function () {
    alumnize.loadTemplates(["LandingPage"],
        function () {
            alumnize.router = new alumnize.Router();
            Backbone.history.start();
        });
});