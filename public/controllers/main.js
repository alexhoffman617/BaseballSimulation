require.config({
	paths: {
		jquery: 'libs/public/jquery',
		underscore: 'libs/public/underscore',
		backbone: 'libs/public/backbone',
		noext: 'noext'
	}
});

require(['app',], function(App){
	App.initialize();
});
