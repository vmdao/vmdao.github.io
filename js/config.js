$(function() {

    Parse.$ = jQuery;
    console.log('hey' + jQuery);

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("lzOlpWvm5DKrMlDnQqcFo6gRzET8RnQvn8s3ymQG", "b7ANQ9PH9PI0TjhU5300UKbglVcCL8gIlynR4gSx");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
        console.log('ok run');
    });
    var Blog = Parse.Object.extend("blog");
    var Blogs = Parse.Collection.extend({
    model: Blog
    });
    var blogs = new Blogs();
        blogs.fetch({
        success: function(blogs) {
            var blogsView = new BlogsView({ collection: blogs });
            blogsView.render();
            $('.posts').append(blogsView.el);
        },
        error: function(blogs, error) {
            console.log(error);
        }
    });

    var BlogsView =  Parse.View.extend({
        template: Handlebars.compile($('#blogs-tpl').html()),
        render: function(){ 
            var collection = { blog: this.collection.toJSON() };
            this.$el.html(this.template(collection));
        }
    });
});