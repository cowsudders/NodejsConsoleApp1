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
})

// Dialog handling
bot.dialog('/', [
    function (session) {
        session.beginDialog('/askName');
    },
    function (session, results) {
        session.send('Hello %s', results.response);
    }
]);

bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);
