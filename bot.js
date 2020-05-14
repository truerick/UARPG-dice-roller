var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

function checkScore(roll, score) {
		var level = 0;
		if (roll == 1 || roll == score) //Holy mary!
				level = 1;
		else if (roll == 100) //Holy... fuck!
				level = 6;
		else if (roll <= 5 || ((1 <= (score-roll)) && ((score-roll) <= 5)) || ((roll % 11) == 0 && roll < score)) // Critical!
				level = 2;
		else if (roll < score) // OK!
				level = 3;
		else if (roll > 95 || ((1 <= (roll-score)) && ((roll-score) <= 5)) || ((roll % 11) == 0 && roll > score)) // Oh no!
				level = 5;
		else if (roll > score)// OK!
				level = 4;
		return level;
}

function getResult(level) {
		var ret = '';
		switch (level) {
			case (1):
				ret = "**CRITICAL SUCCESS!**";
				break;
			case (2):
				ret = "**Good success**";
				break;
			case (3):
				ret = "**Success**";
				break;
			case (4):
				ret = "**Failure**";
				break;
			case (5):
				ret = "**Bad failure**";
				break;
			case (6):
				ret = "**CRITICAL FAILURE!**";
				break;
		}
		return ret;
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !roll
            case 'roll':
								var skill = args[0];
								var score = args[1];
								var roll = Math.floor(Math.random() * 100) + 1; //Return a number between 1 and 100
								var message_flipFlop = '';
								
								if (skill != undefined && skill != '') {
									var skill = 'unknown';
								}
								
								if (score != undefined && score != '') {
									var level = checkScore(roll, score);
								}
								
								if (skill.substring(0, 1) == '*') { //Favorite skill, I can flip-flop
									skill = skill.substring(1) + ' (favorite)';
									if (roll >= 10 || roll < 100) { // Try to flip-flop it
											var roll_flipFlop = (roll % 10) * 10 + Math.floor(roll/10);
											var level_flipFlop = checkScore(roll_flipFlop, score);
											if (level_flipFlop < level) { // Better flip-flopped!
													level = level_flipFlop;
													message_flipFlop = '. Flip-flop into ' + roll_flipFlop;
											}
									}
								}
								
								// Basic message
								var message = user + " rolled " + roll + " for " + skill;
								
								bot.sendMessage({
										to: channelID,
										message: '`' + message + message_flipFlop + '` ' + getResult(level)
								});
            break;
						
            case '1d10':
								var skill = args[0];
								var roll = Math.floor((Math.random() + 0.1) * 10) ; //Return a number between 1 and 10
								
								// Basic message
								var message = user + " rolled " + roll;
								
								// In case of additional information, I write it down
								if (skill != undefined && skill != '') {
									message += ' for ' + skill;
								}
								
								bot.sendMessage({
										to: channelID,
										message: '`' + message + '`'
								});
						break;
         }
     }
});