exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
		const agent = new WebhookClient({ request, response });
		console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
		console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
		
		function welcome(agent) {
		agent.add(`Welcome to my agent!`);
		}
		
		function fallback(agent) {
		agent.add(`I didn't understand`);
		agent.add(`I'm sorry, can you try again?`);
		}
		
		function weatherWebHandeler (agent){
		const city = agent.parameters.city;
		const API_KEY = "enter-your-api-key-from-owm";
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
		
		return axios.get(url)
		.then((result) => {
		console.log(result.data.weather[0].description);
		agent.add(`The current weather condition in ${city} is: `);
		agent.add(result.data.weather[0].description+ ` and the temerature is`);
		agent.add();
		agent.add(result.data.weather[0].description+` is the current weather condition in ${city}.`);
		}).catch((err)=>{
		agent.add(`No city ${city} found`);
		});

