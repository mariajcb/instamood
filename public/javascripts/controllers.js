//LoginController handles events and authorization of the app from the user
//from the login.html partial
app.controller('LoginController', ['$location', '$window', '$scope', 'loginService', function($location, $window, $scope, loginService) {
    $scope.vm = {};
    //$location.url().substr(14) gets the access token from the url's path
    if ($location.url().substr(14) !== '') {
        $window.localStorage['accessToken'] = $location.url().substr(14);
        $location.path('/mood');
    }
    //from ng-click on the log in button
    $scope.login = function() {
        loginService.getCode();
    }
}])

app.controller('MoodController', ['$window', '$scope', 'imgService', 'moodService', function($window, $scope, imgService, moodService) {
    $scope.vm = {};
    //get user data from Instagram API
    imgService.getUser($window.localStorage['accessToken']).getInstaData().$promise.then(function(userData) {
        $scope.vm.username = userData.data.username;
        var userID = userData.data.id;
        var userImg = userData.data.profile_picture;
        $scope.vm.propic = userImg;
        $window.localStorage['username'] = userData.data.username;
        //get user media from Instagram API
        imgService.getMedia($window.localStorage['accessToken'], userID).getInstaData().$promise.then(function(userMedia) {
            var images = userMedia.data;
            //returnArr will contain the mood analysis object and the url of the corresponding image
            var returnArr = [];
            //loop through user's media to analyze with Emotion API
            for (var i = 0; i < images.length; i++) {
                var image = images[i];
                moodService.getMood(image).then(function(data) {
                    if (data) {
                        returnArr = data;
                        delete returnArr[0].scores.neutral;
                        $scope.vm.mood = Object.keys(returnArr[0].scores).reduce(function(a, b) {
                            return returnArr[0].scores[a] > returnArr[0].scores[b] ? a : b
                        });
                        $scope.vm.img = returnArr[1];
                        var mood = moodService.getMoodId($scope.vm.mood);
                        moodService.seedUser($scope.vm.username, userImg, mood);
                    }
                })
            }
        })
    })


}])
app.controller('SocketController', ['$scope', '$window', 'socket', function($scope, $window, socket){
    socket.on('init', function (data) {
      $scope.name = $window.localStorage['username'];
      $scope.users = data.users;
    });

    socket.on('send:message', function (message) {
      $scope.messages.push(message);
    });

    socket.on('user:join', function (data) {
      $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + data.name + ' has joined.'
      });
    });

    $scope.messages = [];

    $scope.sendMessage = function () {
      socket.emit('send:message', {
        message: $scope.message
      });

      // add the message to our model locally
      $scope.messages.push({
        user: $window.localStorage['username'],
        text: $scope.message
      });

      // clear message box
      $scope.message = '';
    };
}])
