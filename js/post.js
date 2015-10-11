$(function() {
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