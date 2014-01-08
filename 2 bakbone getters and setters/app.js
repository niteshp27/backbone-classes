
//1 defining a model
var Todomodel = Backbone.Model.extend({
	defaults: { title:'', completed: false},
	initialize: function(){
      console.log('This model has been initialized 1.');
  }
});

//2 instantiate todo model
var Todo1 = new Todomodel({
	title:'check'
});

var Todo2 = new Todomodel({
	title:'Todo 2'
});

//getters
console.log(Todo2.get('title')); // Todo 2 string
console.log(Todo2.get('completed')); // false

//setters
// Set single attribute value at a time through Model.set():
Todo2.set("title", "Title attribute set through Model.set().");
console.log('Todo title: ' + Todo2.get('title')); // Todo title: Title attribute set through Model.set().
console.log('Completed: ' + Todo2.get('completed')); // Completed: false

// Set map of attributes through Model.set():
Todo2.set({
  title: "Both attributes set through Model.set().",
  completed: true
});
console.log('Todo title: ' + Todo2.get('title')); // Todo title: Both attributes set through Model.set().
console.log('Completed: ' + Todo2.get('completed')); // Completed: true





//tojson to read data,it returns-> object -> tostringify returns string value instead of object
// Following logs: {"title":"Todo 2","completed":true} 
console.log(JSON.stringify(Todo2));

//returns json object
var todo1Attributes = Todo2.toJSON();
// Following logs: {"title":"Todo 2","completed":false} 
console.log(todo1Attributes);



//3 extend view
var TodoView = Backbone.View.extend({

  tagName:  'li',

  // Cache the template function for a single item.
  todoTpl: _.template( $('#item-template').html() ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit':   'close'
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');
    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling todoView.render();
  },

  // Re-render the titles of the todo item.
  render: function() {
    this.$el.append( this.todoTpl( this.model.toJSON() ) );
    // $el here is a reference to the jQuery element 
    // associated with the view, todoTpl is a reference
    // to an Underscore template and toJSON() returns an 
    // object containing the model's attributes
    // Altogether, the statement is replacing the HTML of
    // a DOM element with the result of instantiating a 
    // template with the model's attributes.
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
  },

  updateOnEnter: function( e ) {
    // executed on each keypress when in todo edit mode, 
    // but we'll wait for enter to get in action
  }
});

// create a view for a todo
var todoView1 = new TodoView({model: Todo1});
var todoView2 = new TodoView({model: Todo2});

todoView1.render();
todoView2.render();