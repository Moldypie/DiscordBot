const config = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var years = days * 365;
var d = new Date();
var t = d.getTime();
var y = Math.round(t / years); 
var h = d.getHours();
var grafica = 0;

client.on("ready", async message => {
	console.log("Online");
	console.log(h);
	console.log(t);
	client.user.setActivity("Browsing Art"); 
	setInterval(function() {
		testGrafica();
	}, 60 * 1000 * 60 * 24);
});

client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "image") {
		!testGrafica();
    }
	if (command === "test") {
		!grafica();
		grafica = 0;
    }
});

//does not log values recorded
function grafica(){
	client.channels.get('584079072716521472').bulkDelete(300)
		 .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

    client.channels.get('584079072716521472').send('Daily Grafica', {
        files: [
            "./Grafica/"+Math.floor((Math.random() * 197)+1)+".png"
        ]
    });
}

//logs values recorded
function testGrafica(){
	client.channels.get('584079072716521472').bulkDelete(300)
		 .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	
	grafica = Math.floor((Math.random() * 197)+1);
	!getValue(grafica);
	client.channels.get('584079072716521472').send('Daily Grafica', {
		files: [
			"./Grafica/"+grafica+".png"
		]
	});
}

function getValue(){
	fs = require('fs')
	var values = fs.readFileSync("./grafica.txt").toString('utf-8');
	for (var i=0; i<values.length; i++) 
	{
        if (values[i].match(grafica))
		{ 
			grafica = Math.floor((Math.random() * 197)+1);
			!getValue(grafica);
		}
    }
	fs.appendFileSync('./grafica.txt', "\n"+grafica, (err) => {
		if(err) throw err;
	});
	return grafica;
}

client.login(config.token);
