var express = require('express');
var router = express.Router();
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(`person route is firing`);
// });

router.post('/',function (req,res,next) {
  var personality_insights = new PersonalityInsightsV3({
    username: '44e5544f-8151-4c7b-8592-fdfabce1cfd0',
    password: 'k5d5iAdVFau8',
    version_date: '2016-10-20',
    headers: {
        'X-Watson-Learning-Opt-Out': 'true'
    }
  });

  var params = {
    // Get the content items from the JSON file.
    text: req.body.text,
    // content_items: require('./profile.json').contentItems,
    raw_scores: true,
    headers: {
      'accept-language': 'en',
      'accept': 'application/json'
    }
  };


  var personalityTraits  = []
  personality_insights.profile(params, function(error, response) {
    if (error)
      console.log('error:', error);
    else
     personalityTraits.push(response.personality)
      // console.log('personality=============',JSON.stringify(response.personality[0], null, 2));
      // return JSON.stringify(response, null, 2)
      console.log('personalityTraits', personalityTraits);
      res.json(personalityTraits)
    }
  )
})

module.exports = router;
