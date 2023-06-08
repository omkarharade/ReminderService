const { response } = require("express");
const TicketService = require("../services/email-service");

const create = async (req, res) => {
	try {
		const response = await TicketService.createNotificaton(req.body);
		return res.status(201).json({
			success: true,
			data: response,
			err: {},
			message: "Successfully registered as email reminder",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: response,
			err: error,
			message: "unable to register an email reminder",
		});
	}
};

module.exports = {
	create,
};
