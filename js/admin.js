$(function() {
    function displayWelcome( ){
        var welcomeView = new WelcomeView({  });
        welcomeView.render();
        $('.main-container').html(welcomeView.el);
        document.cookie = 'username=' + 'san';
    }   
    function setOnClickSubmit( e){
           
            e.preventDefault();
            // Get data from the form and put them into variables
            var username = $(e.target).find('input')[0].value,
            password = $(e.target).find('input')[0].value;

            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: displayWelcome,
                // If there is an error
                error: function( error) {
                    console.log(error);
                }
            }); 
    }
    function createNewPost( e){
           
            e.preventDefault();
            // Get data from the form and put them into variables
            var title = $(e.target).find('input')[0].value,
            content = $(e.target).find('textarea')[1].value; 
            console.log('console' + content);
    }
    function callCreateNewPost(){
        var addBlogView = new AddBlogView();
        addBlogView.render();
        $('.main-container').html(addBlogView.el);
        console.log('new pos');
    }

    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("lzOlpWvm5DKrMlDnQqcFo6gRzET8RnQvn8s3ymQG", "b7ANQ9PH9PI0TjhU5300UKbglVcCL8gIlynR4gSx");

    var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        render: function(){
            this.$el.html(this.template());
        },
        events: {
            'submit .form-signin': 'actionLogin'
        },
        actionLogin: setOnClickSubmit
    }),
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        render: function(){
            //var attributes = this.model.toJSON();
            this.$el.html(this.template(/*attributes*/));
        },
        events: {
            'click .add-blog': 'add'
        },
        add: callCreateNewPost
    });
    var AddBlogView = Parse.View.extend({
        template: Handlebars.compile($('#add-tpl').html()),
        render: function(){
            this.$el.html(this.template());
        },
        events: {
            'submit .form-add': 'submit'
        },
        submit: createNewPost
    });
    var cookieUser = document.cookie;
    console.dir(cookieUser);
    if( cookieUser !== ''){
        displayWelcome( );
    } else {
        var loginView = new LoginView();
        loginView.render();
        $('.main-container').html(loginView.el);   
    }
    

});