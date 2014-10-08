require.config({
	paths: {
		jquery: 'js/jquery',
		underscore: 'js/underscore',
		backbone: 'js/backbone',
		router: 'js/router',
		noext: 'noext'
	}
});

require(['controllers/app',], function(App){
	App.initialize();
});
