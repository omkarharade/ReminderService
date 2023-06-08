const sender = require("../config/emailConfig");
const { TicketRepository } = require("../repository/index");
const ticketRepository = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
	try {
		const response = sender.sendMail({
			from: mailFrom,
			to: mailTo,
			subject: mailSubject,
			text: mailBody,
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

const fetchPendingEmails = async (timestamp) => {
	try {
		const response = await ticketRepository.get({ status: "PENDING" });
		return response;
	} catch (error) {
		console.log(error);
	}
};

const createNotificaton = async (data) => {
	try {
		const response = await ticketRepository.create(data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

const updateTicket = async (ticketId, data) => {
	try {
		const response = await ticketRepository.update(ticketId, data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	sendBasicEmail,
	fetchPendingEmails,
	createNotificaton,
	updateTicket,
};
