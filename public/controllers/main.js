require.config({
	paths: {
		jquery: 'js/jquery',
		underscore: 'js/underscore',
		backbone: 'js/backbone',
		router: 'controllers/router',
		noext: 'noext'
	}
});

require(['controllers/app',], function(App){
	App.initialize();
});
