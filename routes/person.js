var express = require('express');
var router = express.Router();
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`person route is firing`);
});

var personality_insights = new PersonalityInsightsV3({
  username: '44e5544f-8151-4c7b-8592-fdfabce1cfd0',
  password: 'k5d5iAdVFau8',
  version_date: '2016-10-20'
});

var params = {
  // Get the content items from the JSON file.
  text: `We the People of the United States,
  in Order to form a more perfect Union, establish Justice,
  insure domestic Tranquility, provide for the common defense,
  promote the general Welfare, and secure the Blessings of Liberty
  to ourselves and our Posterity, do ordain and establish this
  Constitution for the United States of America.`
  // content_items: require('./profile.json').contentItems,
  raw_scores: true,
  headers: {
    'accept-language': 'en',
    'accept': 'application/json'
  }
};

personality_insights.profile(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);

module.exports = router;
