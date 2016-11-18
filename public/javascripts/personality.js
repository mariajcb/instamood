app.controller('PersonController', ['$window', '$scope', 'imgService', 'personService', function($window, $scope, imgService, personService) {
    $scope.vm = {};
    //get user data from Instagram API
    imgService.getUser($window.localStorage['accessToken']).getInstaData().$promise.then(function(userData) {
        $scope.vm.username = userData.data.username;
        var userID = userData.data.id;
        //get user media from Instagram API
        imgService.getMedia($window.localStorage['accessToken'], userID).getInstaData().$promise.then(function(userMedia) {
            var captions = userMedia.data;
            var text = "";
            for (var i = 0; i < captions.length; i++) {
                var caption = captions[i].caption.text;
                text += caption;
            }
            //get IBM Watson info
            var textObj = {
                text: text
            }
            personService.person(textObj)
            //put that info into the chart
                .then(function(response) {
                    // console.log(`RESPONSE FROM THE CONTROLLER`, response.data[0]);
                    $scope.personalityData = response.data[0]
                    var values = []
                    var names = []
                    $scope.personalityData.forEach(item => {
                       var percent = Math.round((item.percentile * 100))
                        values.push(percent)
                        names.push(item.name)
                    })

                    $scope.myJson = {
                        "type": "bar",
                        "plotarea": {
                            "adjust-layout": true
                        },
                        "scale-x": {
                            "label": { /* Scale Title */
                                "text": "Big Five Personality Traits",
                            },
                            "labels": ["O", "C", "E", "A", "N"] /* Scale Labels */
                        },
                        "scale-y": {
                            "label": { /* Scale Title */
                                "text": "Percentile",
                            },
                            "labels": ['0', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'] /* Scale Labels */
                        },
                        "plot": {
                          "styles": ["#5cb85c","#337ab7","#d9534f","#f0ad4e","#5bc0de"]
                        },
                        "series": [
                          {
                            "values": values
                          }
                        ]
                    }

                })
        })
    })
}])
