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
        "": "landingPage",
        "home": "home",
        "login": "login",
        "signup":"signup"
    },
    initialize: function () {
    },
    landingPage: function () {
        alumnize.landingPage = new alumnize.LandingPage();
        $('body').html(alumnize.landingPage.render().el);
    },
    home: function() {            
        var user=new alumnize.User();
        var self=this;
        $('#login').modal('hide');
        user.fetch({
            success: function (data) {
                console.log(data);
                alumnize.userHomePage = new alumnize.UserHomePage({model: data});
                $('body').html(alumnize.userHomePage.render().el);  
                console.log(data.get("isNew"));
                if(data.get("isNew")===1) {
                    new alumnize.EditProfile({model: data}).render();
                }
            },
            error:   function(model, xhr, options){
                    self.login();
            }
        });    
    },
    login: function() {        
        this.landingPage();
    },
    signup: function() {        
        this.landingPage();
    }
});
$(document).on("ready", function () {
    alumnize.loadTemplates(["FeedBack","Carousel","Navigation","Features","Footer","Login","UserHomePage","EditProfile"],
        function () {
            alumnize.router = new alumnize.Router();
            Backbone.history.start();
        });
});
