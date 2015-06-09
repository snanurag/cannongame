	var backgroundSoundFile = new Audio('sounds/bg1.ogg');
	
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
		playLoopBack(backgroundSoundFile);
	}
	
	function stopBackgroundSound(level)
	{
		stopLoopBack(backgroundSoundFile);
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
	