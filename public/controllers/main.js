require.config({
	paths: {
		jquery: 'js/jquery',
		underscore: 'js/underscore',
		backbone: 'js/backbone',
		noext: 'noext'
	}
});

require(['controllers/app',], function(App){
	App.initialize();
});
