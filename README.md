# ABOUT

This is a sample about how implements a simple flow for Google Home Devices using Dialogflow + NodeJS.

# SETUP

* Configure a new Agent on Dialogflow tool. to do this just follow this steps: [https://developers.google.com/assistant/actions/dialogflow/project-agent]
* Import **agent.zip** file to your project
* Update your agent ***fulfillment*** URL with your project host URL.

To expose your service URL to be available for Dialogflow too I recommend that´s you download the ngrok tool [http://ngrok.io]

Here is a simple tutorial about the ngrok [https://ngrok.com/docs]

* Clone this repository on your workstation
* run ```npm install```
* run ```npm run debug```
* after download and install ngrok run ```ngrok http 8080```

The service will run on your port 8080, so to verify if everthing is OK, open your web browser and access: ```http://localhost:8080``` or your ngrok URL.

# INTERACTIONS

You can add your agent on your real Google Home Device or just try it using the simulator.
To do that, access [https://console.actions.google.com/].

You have two samples available for use:

* Say hello to my friends!
* Say goodbye to my friends!
