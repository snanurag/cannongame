var bombAnimationTriggerRate = 4000;

function startBombBurningDeamon(stage, startingStage)
{

	var appender;
	appender = Math.floor(Math.random()*7);
	
	//Since last set of stages are not filled
	if(startingStage == 17)
		appender = Math.floor(Math.random()*3);
	
	var stageToAnimate = startingStage + appender;
	
	animBomb(0, stage, stageToAnimate);
	
	setTimeout(startBombBurningDeamon, bombAnimationTriggerRate, stage, startingStage); 

}