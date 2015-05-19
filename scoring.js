	var gameEndCounter = 0;
	var numOfAttempts = 0;
	var scoreParts = 150;
	
	var stages = ['24301.json','1.json','59203.json', '26904.json', '2.json', '8.406917822341853E8.json', '8.667454087194089E8.json', '5.2186478797800064E8.json',

	'6258359.91985284.json', '3.1290327045556176E8.json', '8.11031994827002E8.json', '8.338782965651317E8.json', '7.19074501173349E7.json', '7.329634825159239E8.json', '6.167622551590418E8.json', '2.7911617107737976E8.json',

	'5.455096460842246E7.json', '9.878414830850183E8.json', '9.876811297099341E7.json',	'6.149199003819513E8.json'
	];
	
	function gameStartIndication()
	{
		gameEndCounter = 0;
		gameOverDone = false;
	}
	
	function gameEndIndication(balls)
	{
		if(gameEndCounter == 3)
		{
			return true;
		}
		else
		{
			if(getMagnitude(balls[0].GetLinearVelocity()) < MIN_VEL_BALL && getMagnitude(balls[MAX_BALLS-1].GetLinearVelocity()) < MIN_VEL_BALL)
			{
				gameEndCounter++;
			}
			return false;
		}
	}
	
	function changeInnerHTML(iDiv, htmlTxt)
	{
		iDiv.innerHTML = htmlTxt;
		
		setTimeout(easeOut, 2000, iDiv);
	}
	
	function setDefaultValues()
	{
		numTargets = 0;
		ballsFired = false;
		
	}
	
	function proceedForGameOver()
	{

		gameOverDone = true;

		var gameover = document.getElementById('gameoverPopup');

		var iDiv = document.createElement('div');
		gameover.appendChild(iDiv);
		setTimeout(easeIn, 100, gameover);
		
		if(bodies.length == (totalBodies - numTargets))
		{
			var score = getScore(currentLevel);
			
			var scoreMultFac = scoreMultiplyingFactor();

			var stars = getStars(scoreMultFac);

			score = score * scoreMultFac;
			
			displayScore(iDiv, score, score/scoreParts, stars);
			
			numOfAttempts = 0;
			
		}
		else
		{
			numOfAttempts++;

			iDiv.innerHTML = '<p>Failed!!</p>';

			setTimeout(changeInnerHTML, 3500, iDiv, '<p> Try Again !! </p>');

		}
	}
	
	function easeIn(div)
	{
		div.classList.add('easein');
	}
	
	function easeOut(div)
	{
		div.classList.add('easeout');
		var arrFrames = parent.document.getElementsByTagName("IFRAME")
		stopBackgroundSound(getStage(currentLevel));

		if(bodies.length == (totalBodies - numTargets))
		{
			var nextLevel = getNextStage();
			if(nextLevel != -1)
			{
				arrFrames[0].setAttribute("src", '../cannongame.html?level='+nextLevel+'&attempts=0');
			}
			else
			{
				//TODO show final Page.
			}
		}
		else
		{
			arrFrames[0].setAttribute("src", '../cannongame.html?level='+currentLevel+'&attempts='+numOfAttempts);
		}
		
		//Set default values after 
		setTimeout(setDefaultValues, 100);
	}
	
	function getNextStage()
	{
		for(var i=0; i<stages.length; i++)
		{
			if(currentLevel == stages[i] && i != stages.length-1)
			{
				return stages[i+1];
			}
		}
		return -1;
	}
	
	function getScore(currentLevel)
	{
		var score;
		for(var i=0; i<stages.length; i++)
		{
			if(currentLevel == stages[i])
			{
				score = (i+11)*1000;
			}
		}
		
		return score;
	}
	
	function scoreMultiplyingFactor()
	{
		var multiplyingFactor = (1.1- numOfAttempts*0.01);
		
		if(multiplyingFactor < 1)
		{
			multiplyingFactor = 1;
		}
		
		return multiplyingFactor;
	}
	
	function displayScore(div, score, addition, stars, currScore )
	{	
		if(currScore == undefined)
			currScore = 0;
		if(currScore < score)
		{
			currScore += addition;
				
			div.innerHTML = 'Score : '+Math.floor(currScore)+'<br>';
			div.innerHTML += "<img src='img/empty_star.png'/> ";
			div.innerHTML += "<img src='img/empty_star.png'/> ";
			div.innerHTML += "<img src='img/empty_star.png'/>";
			
			setTimeout(displayScore, 1, div, score, addition, stars, currScore);
		}
		else if(currScore >= score)
		{

			div.innerHTML = 'Score : '+Math.floor(score)+'<br>';
			if(stars == 1)
			{
				div.innerHTML += "<img src='img/golden_star.png'/> ";
				div.innerHTML += "<img src='img/empty_star.png'/> ";
				div.innerHTML += "<img src='img/empty_star.png'/>";
			}
			else if(stars == 2)
			{
				div.innerHTML += "<img src='img/golden_star.png'/> ";
				div.innerHTML += "<img src='img/golden_star.png'/> ";
				div.innerHTML += "<img src='img/empty_star.png'/>";
			
			}
			else if(stars == 3)
			{
				div.innerHTML += "<img src='img/golden_star.png'/> ";
				div.innerHTML += "<img src='img/golden_star.png'/> ";
				div.innerHTML += "<img src='img/golden_star.png'/> ";
			}
			setTimeout(changeInnerHTML, 3500, div, '<p> Next Stage !! </p>');

		}
	}
	
	function getStars(scoreMultFac)
	{	
		var stars = 0;
			
		if(scoreMultFac > 1.07)
		{
			stars = 3;
		}
		else if(scoreMultFac > 1.04)
		{
			stars = 2;
		}
		else if(scoreMultFac > 1.01)
		{
			stars = 1;
		}
		else
		{
			stars = 0;
		}
		
		return stars;
	}
	
	
		
	