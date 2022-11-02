const snoowrap = require('snoowrap');

export default async function handler(req, res) {
		try{
			const snoo = new snoowrap({
				refreshToken: process.env.REDDIT_REFRESH_TOKEN,
				clientId: process.env.REDDIT_APP_ID,
				clientSecret: process.env.REDDIT_APP_SECRET,
				userAgent: 'LoanReminderBot/1.0.1 (http://reddit.com/u/SirWhoaWaitWhat)'
			});

			const post = snoo.getSubmission(process.env.REDDIT_POST)

			const commentResponse = await post.reply(req.body.text);

			console.log('post', new Date(), req.body.to, post, commentResponse.permalink);

			res.status(200).send('Selfpost Received and Send OK')
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
}
