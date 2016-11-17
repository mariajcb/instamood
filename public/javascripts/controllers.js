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
app.controller('SocketController', ['$scope', 'socket', function($scope, socket){
  $scope.test = "scope test"

  // function AppCtrl($scope, socket) {

    // Socket listeners
    // ================

    socket.on('init', function (data) {
      $scope.name = data.name;
      $scope.users = data.users;
    });

    socket.on('send:message', function (message) {
      $scope.messages.push(message);
    });

    // socket.on('change:name', function (data) {
    //   changeName(data.oldName, data.newName);
    // });

    // socket.on('user:join', function (data) {
    //   $scope.messages.push({
    //     user: 'chatroom',
    //     text: 'User ' + data.name + ' has joined.'
    //   });
    //   $scope.users.push(data.name);
    // });

    // add a message to the conversation when a user disconnects or leaves the room
    // socket.on('user:left', function (data) {
    //   $scope.messages.push({
    //     user: 'chatroom',
    //     text: 'User ' + data.name + ' has left.'
    //   });
    //   var i, user;
    //   for (i = 0; i < $scope.users.length; i++) {
    //     user = $scope.users[i];
    //     if (user === data.name) {
    //       $scope.users.splice(i, 1);
    //       break;
    //     }
    //   }
    // });

    // Private helpers
    // ===============

    // var changeName = function (oldName, newName) {
    //   // rename user in list of users
    //   var i;
    //   for (i = 0; i < $scope.users.length; i++) {
    //     if ($scope.users[i] === oldName) {
    //       $scope.users[i] = newName;
    //     }
    //   }

    //   $scope.messages.push({
    //     user: 'chatroom',
    //     text: 'User ' + oldName + ' is now known as ' + newName + '.'
    //   });
    // }

    // Methods published to the scope
    // ==============================

    // $scope.changeName = function () {
    //   socket.emit('change:name', {
    //     name: $scope.newName
    //   }, function (result) {
    //     if (!result) {
    //       alert('There was an error changing your name');
    //     } else {
    //
    //       changeName($scope.name, $scope.newName);
    //
    //       $scope.name = $scope.newName;
    //       $scope.newName = '';
    //     }
    //   });
    // };

    $scope.messages = [];

    $scope.sendMessage = function () {
      socket.emit('send:message', {
        message: $scope.message
      });

      // add the message to our model locally
      $scope.messages.push({
        user: $scope.name,
        text: $scope.message
      });

      // clear message box
      $scope.message = '';
    };
}])
