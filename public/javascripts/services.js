app.service('loginService', function($location, $resource) {
 return {
  getCode: function() {
   var clientID = '71589482a5274c6d843f7577cd3c5b94';
   var igPopup = window.location.replace("https://instagram.com/oauth/authorize/?client_id=" + clientID + "&redirect_uri=" + $location.absUrl().split('#')[0] + "&response_type=token", "igPopup");
   return $location.path;
  }
 }
})

app.service('imgService', function($http, $resource) {
 return {
  getImage: function(token) {
   var instaApi = $resource(
    'https://api.instagram.com/v1/users/self/?access_token=' + token, {
     callback: 'JSON_CALLBACK'
    }, {
     getInstaData: { // call this in the controller
      method: 'JSONP',
      isArray: false, // this API call returns an object
      params: {} // param order here not guaranteed
     }
    });
   return instaApi;
  },
  getMedia: function(token, userID) {
   var instaApi = $resource(
    `https://api.instagram.com/v1/users/${userID}/media/recent/?access_token=${token}&count=10`, {
     callback: 'JSON_CALLBACK'
    }, {
     getInstaData: { // call this in the controller
      method: 'JSONP',
      isArray: false, // this API call returns an object
      params: {} // param order here not guaranteed
     }
    });
   return instaApi;
  }
 }
})

app.service('moodService', function($location, $resource, $http) {
 return {
  getImage: function(image) {
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
    return $http(req).then(function(data){
      if(data.data.length === 0){
      }else{
        return [data.data[0], image.images.standard_resolution.url];
      }
    });
  }
 }
})
