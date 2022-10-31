const snoowrap = require('snoowrap');

export default async function handler(req, res) {
		try{
			const snoo = new snoowrap({
				refreshToken: process.env.REDDIT_REFRESH_TOKEN,
				clientId: process.env.REDDIT_APP_ID,
				clientSecret: process.env.REDDIT_APP_SECRET,
				userAgent: 'LoanReminderBot/1.0.1 (http://reddit.com/u/SirWhoaWaitWhat)'
			});

			const response = await snoo.submitSelfpost({
				subredditName: process.env.REDDIT_SUBREDDIT,
				title: req.body.subject?.substring(0, 250),
				text: req.body.text,
				sendReplies: false
			});

			const commentResponse = await snoo.getSubmission(response.name).reply(`u/${req.body.to}`);

			console.log('post', new Date(), req.body.to, response, commentResponse.permalink);
			// console.log(new Date(), {
			// 	to: req.body.to,
			// 	subject: req.body.subject?.substring(0, 100),
			// 	text: req.body.text
			// })

			res.status(200).send('Selfpost Received and Send OK')
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
}
