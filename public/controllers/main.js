require.config({
	paths: {
		jquery: 'public/js/jquery',
		underscore: 'public/js/underscore',
		backbone: 'public/js/backbone',
		noext: 'noext'
	}
});

require(['public/js/app',], function(App){
	App.initialize();
});
