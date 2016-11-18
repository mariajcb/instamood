var express = require('express');
var router = express.Router();
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var dotenv = require('dotenv').config();

router.post('/', function(req, res, next) {
    var personality_insights = new PersonalityInsightsV3({
        username: process.env.WATSON_USERNAME,
        password: process.env.WATSON_PASSWORD,
        version_date: '2016-10-20',
        headers: {
            'X-Watson-Learning-Opt-Out': 'true'
        }
    });

    var params = {
        text: req.body.text,
        raw_scores: true,
        headers: {
            'accept-language': 'en',
            'accept': 'application/json'
        }
    };


    var personalityTraits = []
    personality_insights.profile(params, function(error, response) {
        if (error)
            console.log('error:', error);
        else
            personalityTraits.push(response.personality)
        res.json(personalityTraits)
    })
})

module.exports = router;
