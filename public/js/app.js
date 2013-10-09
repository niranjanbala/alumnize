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
        "signup":"signup",
        "people":"peopleSearch"
    },
    initialize: function () {
    },
    landingPage: function () {
        alumnize.landingPage = new alumnize.LandingPage();
        $('body').html(alumnize.landingPage.render().el);
    },
    peopleSearch: function() {
        var peoples = new alumnize.Peoples();
        peoples.fetch({
            success: function (data) {
                console.log("app data ",data);
                alumnize.UserHomePage = new alumnize.UserHomePage({model: data});
                alumnize.userHomePage.peopleSearch();
            },
            error: function(model, xhr, options){
                self.login();
            }
        });
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
                if(data.get("isNew")===1) {
                    alumnize.userHomePage.editProfile();
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
    alumnize.loadTemplates(["FeedBack","Carousel","Navigation","Features","Footer","Login","UserHomePage","EditProfile","PeopleSearch"],
        function () {
            alumnize.router = new alumnize.Router();
            Backbone.history.start();
        });
});
