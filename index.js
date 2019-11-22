const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('port', 8080);

app.use(bodyParser.json({
  type: 'application/json',
}));

app.get('/', urlencodedParser, (req, res) => {
  console.log('GET /');

  res.send('Service is Up!');
});

app.post('/', urlencodedParser, (req, res) => {
  const assistant = new WebhookClient({
    request: req,
    response: res,
  });
  const conv = assistant.conv();
  const locale = assistant.locale;

  console.log('POST /');
  console.log(`========================== ${assistant.intent} ==========================`);

  assistant.handleRequest(() => {
    // Conversations
    const dialogs = {
      'pt-br': {
        welcome: 'Bem vindo ao The Bird!',
        say_hello: 'Olá meus amigos!',
        say_good_bye: 'Tchau meus amigos!',
        default: 'Eu não entendi...',
      },
      en: {
        welcome: 'Welcome to the Bird!',
        say_hello: 'Hello my friend !',
        say_good_bye: 'Goodbye my friend !',
        default: 'I dont understand...',
      },
    };


    // Here you can change the conversaton behavior according the intent received
    switch (assistant.intent) {
      case 'Default Welcome Intent':
        conv.ask(dialogs[locale].welcome);
        break;
      case 'SayHello':
        conv.close(dialogs[locale].say_hello);
        break;
      case 'SayGoodbye':
        conv.close(dialogs[locale].say_good_bye);
        break;
      default:
        conv.close(dialogs[locale].default);
        break;
    }

    // Here is where your dialog response will be sent for the dialog flow
    assistant.add(conv);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server Started - listening in port ${app.get('port')}`);
});
