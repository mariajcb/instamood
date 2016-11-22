#insta[mood]
One of the ways humans cope with emotion is by talking to others. **insta[mood]** is a mobile-first app that aims to analyze true emotions, show the user that they're not alone, and connect people via chat.

*Coming soon: a walkthrough video*

Our current deployed version is here: http://lmk-instamood.herokuapp.com/

###Some Disclaimers
A walkthrough will be provided so you can experience the app, but for the time being, here are some hoops you have to jump through to use it:

1. Contact us to be added as a sandbox user on Instagram.
2. If you wish to use the Heroku deployment, then revert back to a Chrome browser version older than 50.
3. Otherwise, just fork and clone, and run from localhost:3000.

###Features
1. The **home page** gives a brief description of the app and signs you in via OAuth with Instagram.
2. Upon signing it, you'll land at the **mood page**. You'll see a larger photo featuring the most recent photo of you on instagram containing your face, a smaller picture of your profile pic and how you're feeling. If you aren't feeling what we've interpreted you as, feel free to choose from the other options.
3. Navigating to the **map page**, you'll see an orange dot which is your location. Surrounding you will be people that are near you featuring emojis depicting their mood.
4. Lastly, going to  **chat page** will bring up a chat room that you can join and talk to other people that are logged in.

###Technologies Used
1. **Instagram API**: Used to get user data from their Instagram account
2. **Microsoft Cognitive Services Emotion API**: Used to analyze the most recent face-containing photo and send back emotional analysis
3. **IBM Watson Personality Insights API**: Used to analyze the user's personality based on their last fifteen instagram posts
4. **ESRI ArcGIS**: Used to dynamically plot users on a map and use geolocation to plot user's current location
5. This app uses **AngularJS** for dynamic front-end rendering as well as **Bootstrap** for the static part. To build our database, we used **PostgreSQL** and **Express** to query it.
