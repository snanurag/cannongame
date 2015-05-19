function loadstage(stage, world, bodies, cannons, balls, x, y, data)
{
		//Stage is created at this iteration of array.
		$.each( data.imagelist, function( key, val ) {
			addObjectToStage(stage, world, bodies, cannons, balls, this.x, this.y, this.width, this.height, this.bitmapWidth, this.bitmapHeight, this.image, this.shape, this.type, this.name, this.friction, this.restitution, this.centerX, this.centerY, this.angle, x, y);
		});
		
		//After creating stage instantly Jump event is fired. 
		Jump(getMouseClickEvent(x, y), stage, world, bodies, cannons, balls);
		
		//At top of this function stage is created then on Jump cannon balls are added. So by this time bodies has all the objects in it.
		total_bodies = bodies.length;

}

function addObjectToStage(stage, world, bodies, cannons, balls, fixtureX, fixtureY, fixtureWidth, fixtureHeight, bitmapWidth, bitmapHeight, imageLoc, shape, type, name, friction, restitution, centerX, centerY, angle, x, y)
{
		// Making body
		//1. Create Box fixture
		var bxFixDef	= new b2FixtureDef();	// box  fixture definition
		
		fixtureWidth = fixtureWidth * scaleX;
		// Let's remove scaleY and scale up everything by same factor. Let's assume it is scaleX
		// fixtureHeight = fixtureHeight * scaleY;
		fixtureHeight = fixtureHeight * scaleX;
		centerX = centerX * scaleX;
		// centerY = centerY * scaleY;
		centerY = centerY * scaleX;
		
		if(shape == "polygon")
		{
			bxFixDef.shape	= new b2PolygonShape();
			if(centerX != 0 || centerY != 0)
			{
				var center = new b2Vec2(centerX, centerY);
				bxFixDef.shape.SetAsOrientedBox(fixtureWidth, fixtureHeight, center);
			}
			else
			{	
				bxFixDef.shape.SetAsBox(fixtureWidth, fixtureHeight);
			}
		}
		else if(shape == "circle")
		{
			bxFixDef.shape	= new b2CircleShape();
			bxFixDef.shape.SetRadius(fixtureWidth);
		}
		
		bxFixDef.density =  1;
		bxFixDef.friction = friction;
		bxFixDef.restitution = restitution;
		
		//2. Define Body
		var bodyDef = new b2BodyDef();
		if(type == "static")
		{
			bodyDef.type = b2Body.b2_staticBody;
		}
		else if(type == "dynamic")
		{
			bodyDef.type = b2Body.b2_dynamicBody;
		}
		else
		{
			bodyDef.type = b2Body.b2_kinematicBody;
		}
		
		//3. Cordinates are provided keeping cordinate system at center of screen.
		if(fixtureX == "max")
		{
			fixtureX = stage.stageWidth/SCALE;
		}
		else if(fixtureX == "-max")
		{
			fixtureX = 0;
		}
		else
		{
			fixtureX = stage.stageWidth/(2*SCALE) + fixtureX * scaleX;
		}
		
		if (fixtureY == "max")
		{
			fixtureY = stage.stageHeight/SCALE;
		}
		else if (fixtureY == "-max")
		{
			fixtureY = 0;
		}
		else 
		{
			// Let's remove scaleY and scale up everything by same factor. Let's assume it is scaleX
			// fixtureY = stage.stageHeight/(2*SCALE) + fixtureY * scaleY;
			fixtureY = stage.stageHeight/(2*SCALE) + fixtureY * scaleX;
		}
			
		bodyDef.position.Set(fixtureX, fixtureY);
		var body = world.CreateBody(bodyDef);
			
		//4. Add Box fixture to Body
		var bxFix = body.CreateFixture(bxFixDef);

			
		//5. Change center of mass of body
		if(centerX!=0 || centerY != 0)
		{
			var bodyMassData = new b2MassData();
			bodyMassData.center.x = centerX;
			bodyMassData.center.y = centerY;
			body.SetMassData(bodyMassData);
			body.ResetMassData();
		}
		
		//6. Define Bitmap of box.
		//bitmapWidth and bitmapHeight are the half pixels of any image. 
		//This spreads over the whole body size. So the shifting of origin should be in that proportion only.
//		var bxBD = new BitmapData(imageLoc);
//		var bm = new Bitmap(bxBD);
//		bm.x = bitmapWidth + centerX*SCALE/(fixtureWidth*SCALE/-bitmapWidth);
//		bm.y = bitmapHeight + centerY*SCALE/(fixtureHeight*SCALE/-bitmapHeight);
		
		//7. Create Sprite
//		var actor = new Sprite();
		
		// If it is cannon ball then make the sprite a little wider than the box2d cannon ball size. 
		// So that when ball is moving on surface it will appear quite in contact with the surface.
//		if(name == "cannon ball")
//		{
//			actor.scaleX = -(fixtureWidth+0.02)*SCALE/bitmapWidth;
//			actor.scaleY = -(fixtureHeight+0.02)*SCALE/bitmapHeight; 
//		}
//		else
//		{
//			actor.scaleX = -fixtureWidth*SCALE/bitmapWidth;
//			actor.scaleY = -fixtureHeight*SCALE/bitmapHeight; 
//		}
		
		//8. Add Bitmap to sprite
//		actor.addChild(bm);

		//9. Set User Data to 
		var userData = new Object();
		userData.originalX = fixtureX;
		userData.originalY = fixtureY;
		userData.fixtureWidth = fixtureWidth;
		userData.fixtureHeight = fixtureHeight;
		userData.name = name;
//		userData.actor = actor;
		userData.body = body;
		userData.bodies = bodies;
		userData.iteration = x+''+y;
		
		if(centerX!=0 || centerY != 0)
		{
			userData.centerX = centerX;
			userData.centerY = centerY;
		}
		if(name == "cannon")
		{
			userData.cannonRecoilReverse = true;
		}
		bxFix.SetUserData(userData);
		
		//10. Add sprite to Stage
//		stage.addChild(actor);  

		body.SetAngle(angle);
		
		//11. Push body to array
		bodies.push(body);
		if(name == "cannon")
		{
			cannons.push(body);
		}
		
		
		//12. Generating smoke
		if(name == "cannon ball")
		{	
		//Not required in simulation
//			animSmoke(fixtureX*SCALE, fixtureY*SCALE, 0, initializeSmoke(), new Sprite(), angle);
		}
			
		//13. Push actors to array
//		actors.push(actor);
			
		return body;
}
