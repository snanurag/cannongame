	// This function will give impulse vector of the given magnitude.
	// impulseMagnitude could be passed 1 if it requires unit vector impulse i.e. only with directions.
	function getImpulse(e, body, impulseMagnitude)
	{
		var currentTarget = e.currentTarget;
		var cursorX = currentTarget.mouseX/SCALE;
		var cursorY = currentTarget.mouseY/SCALE;
		var position = body.GetPosition();
		var bodyX = position.x;
		var bodyY = position.y;

		var b2Vec2 = Box2D.Common.Math.b2Vec2;

		var impulseX = (-bodyX+cursorX)*scaleX;
		// Let's remove scaleY and scale up everything by same factor. Let's assume it is scaleX
		// var impulseY = (-bodyY+cursorY)*scaleY;
		var impulseY = (-bodyY+cursorY)*scaleX;

		var impulseModulus = Math.sqrt(impulseX*impulseX + impulseY*impulseY);

		if(impulseMagnitude == undefined)
		{
			var impulse = new b2Vec2(impulseX, impulseY);
		}
		else
		{
			var impulse = new b2Vec2(impulseMagnitude * impulseX/impulseModulus, impulseMagnitude * impulseY/impulseModulus);
		}

		return impulse;
	}
	
	//This returns the magnitude of the vector
	function getMagnitude(b2Vec2)
	{	
		return Math.sqrt(b2Vec2.x*b2Vec2.x + b2Vec2.y*b2Vec2.y);
	}

		//This function is responsible for ejecting balls out of cannons.
		function addCannonBallToStage()
		{
			for(var i=0; i<cannons.length; i++)
			{	
				var body = cannons[i];
				var angle = body.GetAngle();
				
				var fixDef = body.GetFixtureList();
				var userData = fixDef.GetUserData();

				var x = (userData.originalX - stage.stageWidth/(2*SCALE)) + (userData.fixtureWidth + userData.centerX) * Math.cos(angle);
				var y = (userData.originalY - stage.stageHeight/(2*SCALE)) + (userData.fixtureWidth + userData.centerX) * Math.sin(angle);
				
				x = x/scaleX;
				y = y/scaleY;
				
				var width = 0.3;
				var height = 0.3;
				var bitmapWidth = -50;
				var bitmapHeight = -50;
				var image = "img/cannonball.png";
				var shape = "circle";
				var type = "dynamic";
				var name = "cannon ball";
				var description = "Cannon ball 1";
				var friction = 1;
				var restitution = 0.3;
				var centerX = 0;
				var centerY = 0;
				var ball = addObjectToStage(stage, world, x, y, width, height, bitmapWidth, bitmapHeight, image, shape, type, name, friction, restitution, centerX, centerY, angle);
				balls.push(ball);
			}
		}
		
	function getMouseClickEvent(x,y)
	{
		var e = new Object();
		e.currentTarget = new Object();
		e.currentTarget.mouseX = x;
		e.currentTarget.mouseY = y;
		
		return e;
	}		
	
	function getData()
	{
		var pf1x = Math.random()*13.66 - 13.66/2;
		var pf1y = Math.random()*6.43 - 6.43/2;
		var pf1w = 0.9 + 1.5*Math.random();
		var pf1h = 0.3 +0.4*Math.random();
		var angle1 = Math.random()*Math.PI;
		
		var pf2x = Math.random()*13.66 - 13.66/2;
		var pf2y = Math.random()*6.43 - 6.43/2;
		var pf2w = 1.5 + 1.5*Math.random();
		var pf2h = 0.3 +0.4*Math.random();
		var angle2 = Math.random()*Math.PI;

		var pf3x = Math.random()*13.66 - 13.66/2;
		var pf3y = Math.random()*6.43 - 6.43/2;
		var pf3w = 1.5 + 1.5*Math.random();
		var pf3h = 0.3 +0.4*Math.random();
		var angle3 = Math.random()*Math.PI;
		
		var data = {"imagelist":[
        {
            "x": pf1x,
            "y": pf1y,
            "width" : pf1w,
            "height" : pf1h,
            "bitmapWidth": -300,
            "bitmapHeight":-100,
            "image":"img/blocker.png",
            "shape": "polygon",
            "type": "static",
            "name":"blocker",
            "description": "Blocker 1",
			"friction" : 1,
			"restitution" : 0,
			"centerX" : 0,
			"centerY" : 0,
			"angle" : 0
        },
        {
            "x": pf1x-pf1w +0.3 +0.3,
            "y": pf1y - pf1h - 0.5,
            "width" : 0.3,
            "height" : 0.5,
            "bitmapWidth": -89,
            "bitmapHeight":-97,
            "image":"img/tower/tower_2.png",
            "shape": "polygon",
            "type": "static",
            "name":"building1",
            "description": "Target 1 - Blocker 1",
			"friction" : 1,
			"restitution" : 0,
			"centerX" : 0,
			"centerY" : 0,
			"angle" : 0
        },
        {
            "x": pf1x + pf1w - 0.3 -0.3,
            "y": pf1y - pf1h - 0.5,
            "width" : 0.3,
            "height" : 0.5,
            "bitmapWidth": -89,
            "bitmapHeight":-97,
            "image":"img/tower/tower_2.png",
            "shape": "polygon",
            "type": "static",
            "name":"building1",
            "description": "Target 2 - Blocker 1",
			"friction" : 1,
			"restitution" : 0,
			"centerX" : 0,
			"centerY" : 0,
			"angle" : 0
        },
        {
            "x": pf2x,
            "y": pf2y,
            "width" : pf2w,
            "height" : pf2h,
            "bitmapWidth": -300,
            "bitmapHeight":-100,
            "image":"img/blocker.png",
            "shape": "polygon",
            "type": "static",
            "name":"blocker",
            "description": "Blocker 1",
			"friction" : 1,
			"restitution" : 0,
			"centerX" : 0,
			"centerY" : 0,
			"angle" : angle2
        },
        {
            "x": pf3x,
            "y": pf3y,
            "width" : pf3w,
            "height" : pf3h,
            "bitmapWidth": -300,
            "bitmapHeight":-100,
            "image":"img/blocker.png",
            "shape": "polygon",
            "type": "static",
            "name":"blocker",
            "description": "Blocker 1",
			"friction" : 1,
			"restitution" : 0,
			"centerX" : 0,
			"centerY" : 0,
			"angle" : angle3
        },
        {
            "x":-6,
            "y": "max",
            "width" : 1.5,
            "height" : 0.5,
            "bitmapWidth": -300,
            "bitmapHeight":-100,
            "image":"img/cannon_1.png",
            "shape": "polygon",
            "type": "kinematic",
            "name":"cannon",
            "description": "Cannon 1",
			"friction" : 0,
			"restitution" : 0,
			"centerX" : 0.6,
			"centerY" : 0,
			"angle" : 0
		},
        {
            "x":6,
            "y": "max",
            "width" : 1.5,
            "height" : 0.5,
            "bitmapWidth": -300,
            "bitmapHeight":-100,
            "image":"img/cannon_2.png",
            "shape": "polygon",
            "type": "kinematic",
            "name":"cannon",
            "description": "Cannon 2",
			"friction" : 0,
			"restitution" : 0,
			"centerX" : 0.6,
			"centerY" : 0,
			"angle" : 0
		}            
		]};

		return data;
	}