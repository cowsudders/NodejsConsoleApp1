let builder = require("botbuilder");
let restifyHere = require("restify");

const connector = new builder.ChatConnector();

// Create BOT
var bot = new builder.UniversalBot(connector);

// Setup Restify Server
const server = restifyHere.createServer();
server.post('/api/messages', connector.listen());

server.listen(3978, '::', () => {
    console.log('server up');
    console.log('This is it');

})

// Dialog handling
let address;
function sendProactiveMessage(address) {
    var msg = new builder.Message().address(address);
    msg.text("Hello, this is a notification");
    msg.textLocale('en-US');
    bot.send(msg);
}

bot.dialog('/', function (session) {
    address = session.message.address;
    session.send("Hi");
    setTimeout(() => {
        sendProactiveMessage(address);
    }, 5000);
});

bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);
