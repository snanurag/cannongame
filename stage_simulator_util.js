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
		
		var platforms = [];
		var angleBlockers = [];
		var horizontalBlockers =[];
		var verticalBlockers = [];

		var platforms_n = 2; //Math.round(Math.random()*3);
	
//		if(platforms_n < 2)
//			platforms_n = 2;
			
		var angleBlockers_n = Math.round(Math.random()*0);
		var horizontalBlockers_n = Math.round(Math.random()*7);
		var verticalBlockers_n = Math.round(Math.random()*7);
		
		var tower_height = 0.6;
		var tower_width = 0.6;
		
		do {
			for(var i=0; i < platforms_n; i++)
			{
				setPlatformData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
			}
			
			for(var i=0; i < angleBlockers_n; i++)
			{
				setAngleBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
			}

			for(var i=0; i < horizontalBlockers_n; i++)
			{
				setHorizontalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
			}

			for(var i=0; i < verticalBlockers_n; i++)
			{
				setVerticalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
			}
		} while(angleBlockers.length == 0 && horizontalBlockers.length == 0 && verticalBlockers.length == 0);
		

		
		
		var data = {"imagelist": [{
							"x": -6,
							"y": "max",
							"width": 1.5,
							"height": 0.5,
							"bitmapWidth": -300,
							"bitmapHeight": -100,
							"image": "img/cannon_1.png",
							"shape": "polygon",
							"type": "kinematic",
							"name": "cannon",
							"description": "Cannon 1",
							"friction": 0,
							"restitution": 0,
							"centerX": 0.6,
							"centerY": 0,
							"angle": 0
						},
						{
							"x": 6,
							"y": "max",
							"width": 1.5,
							"height": 0.5,
							"bitmapWidth": -300,
							"bitmapHeight": -100,
							"image": "img/cannon_2.png",
							"shape": "polygon",
							"type": "kinematic",
							"name": "cannon",
							"description": "Cannon 2",
							"friction": 0,
							"restitution": 0,
							"centerX": 0.6,
							"centerY": 0,
							"angle": 0
						}
					]
};
		
		
		
		for(var i=0; i < platforms.length; i++)
		{
			var d = platforms[i];
			
			var obj = new Object();
            obj.x = d.x;
            obj.y = d.y;
            obj.width = 1.2;
            obj.height = 0.3;
            obj.bitmapWidth = -300;
            obj.bitmapHeight = -100;
            obj.image = "img/blocker.png";
            obj.shape = "polygon";
            obj.type = "static";
            obj.name = "blocker";
            obj.description = "Platform 1";
			obj.friction = 1;
			obj.restitution = 0;
			obj.centerX = 0;
			obj.centerY = 0;
			obj.angle = 0;

			data.imagelist.push(obj);
			
			// Adding tower
			var obj = new Object();
            obj.x = d.x;
            obj.y = d.y - 0.3 - tower_height;
            obj.width = tower_width;
            obj.height = tower_height;
            obj.bitmapWidth = -89;
            obj.bitmapHeight = -97;
            obj.image = "img/tower/tower_2.png";
            obj.shape = "polygon";
            obj.type = "static";
            obj.name = "building1";
            obj.description = "Target 1";
			obj.friction = 1;
			obj.restitution = 0;
			obj.centerX = 0;
			obj.centerY = 0;
			obj.angle = 0;
			data.imagelist.push(obj);

		}
		
		for(var i=0; i < angleBlockers.length; i++)
		{
			var d = angleBlockers[i];
			
			var obj = new Object();
            obj.x = d.x;
            obj.y = d.y;
            obj.width = d.w;
            obj.height = d.h;
            obj.bitmapWidth = -300;
            obj.bitmapHeight = -100;
            obj.image = "img/blocker.png";
            obj.shape = "polygon";
            obj.type = "static";
            obj.name = "blocker";
            obj.description = "Platform 1";
			obj.friction = 1;
			obj.restitution = 0;
			obj.centerX = 0;
			obj.centerY = 0;
			obj.angle = d.a;

			data.imagelist.push(obj);
		}
		
		for(var i=0; i < horizontalBlockers.length; i++)
		{
			var d = horizontalBlockers[i];
			
			var obj = new Object();
            obj.x = d.x;
            obj.y = d.y;
            obj.width = d.w;
            obj.height = d.h;
            obj.bitmapWidth = -300;
            obj.bitmapHeight = -100;
            obj.image = "img/blocker.png";
            obj.shape = "polygon";
            obj.type = "static";
            obj.name = "blocker";
            obj.description = "Platform 1";
			obj.friction = 1;
			obj.restitution = 0;
			obj.centerX = 0;
			obj.centerY = 0;
			obj.angle = d.a;

			data.imagelist.push(obj);
		}
		
		for(var i=0; i < verticalBlockers.length; i++)
		{
			var d = verticalBlockers[i];
			
			var obj = new Object();
            obj.x = d.x;
            obj.y = d.y;
            obj.width = d.w;
            obj.height = d.h;
            obj.bitmapWidth = -300;
            obj.bitmapHeight = -100;
            obj.image = "img/blocker.png";
            obj.shape = "polygon";
            obj.type = "static";
            obj.name = "blocker";
            obj.description = "Platform 1";
			obj.friction = 1;
			obj.restitution = 0;
			obj.centerX = 0;
			obj.centerY = 0;
			obj.angle = d.a;

			data.imagelist.push(obj);
		}
		
		return data;
	}
	
	function getBasicData()
	{
		var angle =[];
		angle.push(30);
		angle.push(60);
		angle.push(90);
		angle.push(-60);
		angle.push(-30);

		var data = new Object();
		data.x = Math.random()*13.66 - 13.66/2;
		data.y = Math.random()*6.43 - 6.43/2;
		data.w = 0.6 + 1.5*Math.random();
		data.h = 0.3 +0.2*Math.random();
		data.a = angle[Math.round(Math.random()*4)]*Math.PI/180;
		
		return data;
	}
	
	function setPlatformData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height)
	{

		var data = getBasicData();
		data.w = 1.2;
		data.h = 0.3;
		data.a = 0;

		//ensuring that castle doesn't cross top boundary of the screen.
		if(data.y <(-6.43/2 +1.2))
		{
			data.y = -6.43/2 + 1.2 + 0.3;
		}
		
		var acceptable = verifyBlockAcceptance(platforms, angleBlockers, horizontalBlockers, verticalBlockers, data, tower_height);
	
		if(acceptable == true)
		{
			platforms.push(data);
		}
		else
		{
			setPlatformData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
		}
	}
	
	function setAngleBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height)
	{

		var data = getBasicData();

		var acceptable = verifyBlockAcceptance(platforms, angleBlockers, horizontalBlockers, verticalBlockers, data, tower_height);
	
		if(acceptable == true)
		{
			angleBlockers.push(data);
		}
		else
		{
			setAngleBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
		}
	}
			
	function setHorizontalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height)
	{

		var data = getBasicData();
		data.a = 0;
		
		var acceptable = verifyBlockAcceptance(platforms, angleBlockers, horizontalBlockers, verticalBlockers, data, tower_height);
	
		if(acceptable == true)
		{
			horizontalBlockers.push(data);
		}
		else
		{
			setHorizontalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
		}
	}

	function setVerticalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height)
	{
		
		var data = getBasicData();
		data.a = 90*Math.PI/180;
		
		var acceptable = verifyBlockAcceptance(platforms, angleBlockers, horizontalBlockers, verticalBlockers, data, tower_height);
	
		if(acceptable == true)
		{
			verticalBlockers.push(data);
		}
		else
		{
			setVerticalBlockerData(platforms, angleBlockers, horizontalBlockers, verticalBlockers, tower_height);
		}
	}
			
	function verifyBlockAcceptance(platforms, angleBlockers, horizontalBlockers, verticalBlockers, data, tower_height)
	{
		var acceptable = false;
			
		if(platforms.length == 0 && angleBlockers.length == 0 && horizontalBlockers.length == 0 && verticalBlockers. length == 0)
		{
			return true
		}
	
		//Any blocker should not go into cannons region.
		if(data.x < (-6+2.1) || data.x >(6-2.1))
		{
			if(data.a == Math.PI/2)
			{
				if(data.y > (6.43/2 - data.w -0.5))
				{
					return false;
				}
			}
			else
			{
				if(data.y > (6.43/2 - data.h - 0.5))
				{
					return false;
				}
			}
		}
		
		for(var i =0; i < platforms.length; i++)
		{
			var d = platforms[i];
			if(data.a == Math.PI/2)
			{	//For vertical blockers height and width should interchange.
				if(Math.abs(d.x - data.x) > data.h + d.w && ((d.y - data.y) > tower_height + data.w + d.h || (data.y - d.y) > data.w + d.h))
				{
					acceptable = true;
				}
			}
			else if(Math.abs(d.x - data.x) > data.w + d.w && ((d.y - data.y) > tower_height + data.h + d.h || (data.y - d.y) > data.h + d.h))
			{
				acceptable = true;
			}
			else
			{
				return false;
			}
		}
		
		for(var i=0; i < angleBlockers.length; i++)
		{
			var d = angleBlockers[i];
			if(Math.abs(d.x - data.x) > data.w + d.w || Math.abs(data.y -d.y) > data.h + d.h)
			{
				acceptable = true;
			}
			else
			{
				return false;
			}
		}

		for(var i=0; i < horizontalBlockers.length; i++)
		{
			var d = horizontalBlockers[i];
			if(Math.abs(d.x - data.x) > data.w + d.w || Math.abs(data.y -d.y) > data.h + d.h)
			{
				acceptable = true;
			}
			else
			{
				return false;
			}
		}

		for(var i=0; i < verticalBlockers.length; i++)
		{
			var d = verticalBlockers[i];
			if(Math.abs(d.x - data.x) > data.w + d.w && Math.abs(data.y -d.y) > data.h + d.h)
			{
				acceptable = true;
			}
			else
			{
				return false;
			}
		}
		
		return acceptable;
		
	}
	