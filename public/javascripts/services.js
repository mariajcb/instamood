//loginService has the instagram user authorize the application
app.service('loginService', function($location) {
    return {
        //getCode gets the access token for instagram
        getCode: function() {
            var clientID = '71589482a5274c6d843f7577cd3c5b94';
            //redirects to localhost:3000/[access_token]
            var auth = window.location.replace("https://instagram.com/oauth/authorize/?client_id=" + clientID + "&redirect_uri=" + $location.absUrl().split('#')[0] + "&response_type=token", "auth");
            return $location.path;
        }
    }
})

//imgService queries the instagram API for user info
app.service('imgService', function($resource) {
        return {
            //getUser gets the user's info
            getUser: function(token) {
                var instaApi = $resource(
                    'https://api.instagram.com/v1/users/self/?access_token=' + token, {
                        callback: 'JSON_CALLBACK'
                    }, {
                        getInstaData: {
                            method: 'JSONP',
                            isArray: false,
                            params: {}
                        }
                    });
                return instaApi;
            },
            //getMedia gets the user's media
            getMedia: function(token, userID) {
                var instaApi = $resource(
                    `https://api.instagram.com/v1/users/${userID}/media/recent/?access_token=${token}&count=10`, {
                        callback: 'JSON_CALLBACK'
                    }, {
                        getInstaData: {
                            method: 'JSONP',
                            isArray: false,
                            params: {}
                        }
                    });
                return instaApi;
            }
        }
    })
    //moodService queries the Microsoft Cognitive Services Emotion API
app.service('moodService', function($http) {
    return {
        getMood: function(image) {
            var req = {
                method: 'POST',
                url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': 'ccbc67bfc9d14545abd87142a0a4d0cd'
                },
                data: {
                    'url': image.images.standard_resolution.url
                }
            }
            return $http(req).then(function(data) {
                if (data.data.length === 0) {} else {
                    return [data.data[0], image.images.standard_resolution.url];
                }
            });
        }
    }
})

app.service('usersService', function($http) {
    return {
        getUsers: function() {
                // console.log('the usersService is being called');
            return $http.get('/api/users').then(function(response) {
                // console.log(response.data)
                return response.data

            })
        },
        newUser: function(users) {
            return $http.post('/api/newpoint', point).then(function(response) {
                // console.log(response.data);
                return response.data
            })
        }
    }
})
