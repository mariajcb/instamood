app.service('imgService', function($http, $resource) {
 return {
  getImage: function() {
    var instaApi = $resource(
      'https://api.instagram.com/v1/users/self/?access_token=4147147144.7158948.cf207a8f4c434dad81498b84ba2ca48d',
      { callback: 'JSON_CALLBACK' },
      { getInstaData: {                  // call this in the controller
          method: 'JSONP',
          isArray: false,               // this API call returns an object
          params: { }                   // param order here not guaranteed
        }
      });
    return instaApi;
  }
 }
})
