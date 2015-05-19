	var soundFilesAgainstStages = [new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg1.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg2.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg'),new Audio('sounds/bg3.ogg')];
	
	function playFiringSound()
	{
		playSound('cannon');
	}
		
	function playSound(fileName)
	{
		fileName = 'sounds/'+fileName + '.ogg';
		
		var audioFile = new Audio(fileName);
		audioFile.play();
	}
	
	function playBackgroundSound(level)
	{
		playLoopBack(soundFilesAgainstStages[level - 1]);
	}
	
	function stopBackgroundSound(level)
	{
		stopLoopBack(soundFilesAgainstStages[level - 1]);
	}
	
	function playLoopBack(audio)
	{
		audio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
		}, false);
		audio.play();
	}
	
	function stopLoopBack(audio)
	{
		audio.pause();
		audio.currentTime = 0;
	}
	