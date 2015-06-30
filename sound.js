	var backgroundSoundFile = new Audio('/cg/sounds/bg1.ogg');
	var cannonSounds = [new Audio('/cg/sounds/cannon.ogg'), new Audio('/cg/sounds/cannon.ogg')];
	
	function playCannon1Sound()
	{
		cannonSounds[0].play();
	}
	
	function playCannon2Sound()
	{
		cannonSounds[1].play();
	}
	
	function playSound(fileName)
	{
		fileName = 'sounds/'+fileName + '.ogg';
		
		var audioFile = new Audio(fileName);
		audioFile.play();
	}
	
	function playBackgroundSound()
	{
		playLoopBack(backgroundSoundFile);
	}
	
	function stopBackgroundSound()
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
	