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

  console.log('POST /');
  console.log(`========================== ${assistant.intent} ==========================`);

  assistant.handleRequest(() => {
    // Here you can change the conversaton behavior according the intent received
    switch (assistant.intent) {
      case 'SayHello':
        conv.close('Hello my friend !!!');
        break;
      case 'SayGoodbye':
        conv.close('Goodbye my friend !!!');
        break;
      default:
        conv.close('I dont understand...');
        break;
    }

    // Here is where your dialog response will be sent for the dialog flow
    assistant.add(conv);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server Started - listening in port ${app.get('port')}`);
});
