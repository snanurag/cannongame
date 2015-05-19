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
	function addCannonBallToStage(stage, world, bodies, cannons, balls, cursorX, cursorY)
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
			var ball = addObjectToStage(stage, world, bodies, cannons, balls, x, y, width, height, bitmapWidth, bitmapHeight, image, shape, type, name, friction, restitution, centerX, centerY, angle, cursorX, cursorY);
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
	
	function simulateJumpEvent(stage, world, bodies, cannons, balls, x, y, data)
	{
		
		loadstage(stage, world, bodies, cannons, balls, x, y, data);

	}
	
	function getData()
	{
		var data = {"imagelist":[
        {
            "x":0,
            "y": 1.1,
            "width" : 2,
            "height" : 0.4,
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
			"centerY" : 0
			
        },
        {
            "x":-1.4,
            "y": 0.2,
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
			"centerY" : 0
			
        },
        {
            "x":1.4,
            "y": 0.2,
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
			"centerY" : 0
			
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
			"centerY" : 0
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
			"centerY" : 0
		}            
		]};

		sessionStorage.data = data;
		return data;
	}