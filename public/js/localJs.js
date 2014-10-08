$(document).ready(function(){

	var activityLog;
	var activityLogString;

	var minDate;
	var maxDate;

	var stepPieChart = dc.pieChart("#step-pieChart"); //makes step-pieChart at dc pie chart
	var postTimeBarChart = dc.barChart("#postTime-barChart");
	d3.csv("../data/ActivityLog.csv", function(result){
		activityLog = result;

		var parseDate = d3.time.format("%m/%d/%Y").parse;
		activityLog.forEach(function(d){
			d.PostTime = Date.parse(d.PostTime.split(" ")[0]);
		})

		activityLogFormatted = JSON.stringify(activityLog, false, 4);


		var summaryData = crossfilter(activityLog); //initializes activity log data as crossfilter data
		var stepDim = summaryData.dimension(function(d){
			return d.Step; //creates demension on step
		});

		var postTimeDim = summaryData.dimension(function(d){
			return d.PostTime; //creates demension on step
		});

		var errorStringDim = summaryData.dimension(function(d){
			return d.ErrorString;
		});

		minDate = new Date(postTimeDim.bottom(1)[0].PostTime);
		maxDate = new Date(postTimeDim.top(1)[0].PostTime);

		var stepGroup = stepDim.group(); // groups on step

		var postTimeGroup = postTimeDim.group();

		var errorFileOpenDim = errorStringDim.filter("FileOpen");

		var errorLastNameDim = errorStringDim.filter("LastName");


		stepPieChart
			.width(500)
			.height(500)
			.radius(200)
			.dimension(stepDim)
			.group(stepGroup)
			.innerRadius(100)
			.renderLabel(true);

		postTimeBarChart
        .width(990)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(postTimeDim)
        .mouseZoomable(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the legend
        // The `.valueAccessor` will be used for the base layer
        .group(postTimeGroup)



			

		dc.renderAll();
	});
});
