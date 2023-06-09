const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");
const jobs = require("./utils/job");
const TicketController = require("./controllers/ticket-controller");

const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const setupAndStartServer = async () => {
	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.post("/api/v1/tickets", TicketController.create);

	const channel = await createChannel();
	subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);
	app.listen(PORT, () => {
		console.log(`Server started at port : ${PORT}`);

		// jobs();
		// sendBasicEmail(
		// 	"support@admin.com",
		// 	"booking.notification.services@gmail.com",
		// 	"This is a testing mail",
		// 	"Alola , pokemon gotta catch em all"
		// );
	});
};

setupAndStartServer();
