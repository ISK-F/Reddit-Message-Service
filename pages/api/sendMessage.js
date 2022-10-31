const snoowrap = require('snoowrap');

export default async function handler(req, res) {
		try{
			const snoo = new snoowrap({
				refreshToken: process.env.REDDIT_REFRESH_TOKEN,
				clientId: process.env.REDDIT_APP_ID,
				clientSecret: process.env.REDDIT_APP_SECRET,
				userAgent: 'MessageSendService/1.0.0 (http://personalscript.example.com)'
			});

			const response = await snoo.composeMessage({
				to: req.body.to,
				subject: req.body.subject?.substring(0, 100),
				text: req.body.text
			})

			console.log([new Date(), req.body.to, response])

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
