# UARPG-dice-roller
Discord bot to easily roll dice for Unknown Armies RPG v3

# Installation
To install locally the dice roller edit the auth.json with your Discord Bot token.
You need the following node installations:

`npm install discord.io winston –save`
`npm install https://github.com/woor/discord.io/tarball/gateway_v6`

# Level of success in Unknown Armies
In UA to perform an action you have to roll 1d100 and check the result with your skill level (that goes from 1 to 100). If the roll is lower or equal your skill, it's a success. If it's higher it's a failure. There are different types of successes and failures.

## Critical success!
This happens only if you roll 1 or exactly your skill level.
You try to shoot at your enemy and roll 1? You hit his eye and his brain explodes. Headshot!

## Good success
If you roll between 2 and 5, up to 5 below your skill level or a double number (11, 22, ...) below your skill level, it's... more than a success!
You're in the highway at 120 mph when a bad guy shoot at your tire. You roll 11 and your drive ability was 30, not only you keep the vehicle in the road, but manage to steer on the side and slow down without a scratch.

## Success
If you just roll below your skill level except for the special cases before, you did it!
You have to throw a granade in a window, 10 out of 24 is what allows you to scream "HOLE IN ONE!" before the explosion inside the building.

## Critical failure!
This is a 100 out of 100.
You jump down a 2 meters high wall and you roll a 100? The terrain is unlevelled and you probably just broke your ankle...

## Bad Failure
If you roll between 96 and 99, up to 5 above your skill level or a double number (77, 88, ...) above your skill level you just failed and something bad is going to happen.
You shoot a bad guy and you roll 98? The shell stuck in the gun and now it's jammed.

## Failure
You just roll above your skill level and you fail. That's it.
Do you want to impress the girl with a flying kick and roll 89 on your 65 kung-fu skill? You almost did it but you hit the lamp and the bulb explodes, everyone's laughing at you now, Daniel-san!

# Skills
There is a lot of skills and possibilities in UA, so the skill field is free. But remember: if you're rolling your favorite skill (or any skill but in particular situations) you can flip-flop the result and a awful 91 will become the 19 you need to succeed!

# Commands
`!roll [String (*)skill] [Integer skill_level]`
Roll 1d100 for the `skill` and check the level of success.
If the skill starts with a `*`, it means it's your favorite one and the system will try to flip-flop that to obtain the best result available!
