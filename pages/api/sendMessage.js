const snoowrap = require('snoowrap');

export default async function handler(req, res) {
		try{
			const snoo = new snoowrap({
				refreshToken: process.env.REDDIT_REFRESH_TOKEN,
				clientId: process.env.REDDIT_APP_ID,
				clientSecret: process.env.REDDIT_APP_SECRET,
				username: process.env.REDDIT_USERNAME,
				userAgent: 'LoanReminderBot/1.0.1 (http://reddit.com/u/SirWhoaWaitWhat)'
			});

			snoo.config({continueAfterRatelimitError: true});

			const response = await snoo.composeMessage({
				to: req.body.to,
				subject: req.body.subject?.substring(0, 100),
				text: req.body.text
			})

			console.log('message', new Date(), req.body.to, response)

			// console.log(new Date(), {
			// 	to: req.body.to,
			// 	subject: req.body.subject?.substring(0, 100),
			// 	text: req.body.text
			// })
		} catch (e) {
			console.log(e)
		}
  res.status(200).send('Message Received and Send OK')
}
