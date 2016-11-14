app.service('imgService', function($http) {
 return {
  getImage: function() {
   $http.get('https://api.instagram.com/v1/users/self/?access_token=4147147144.7158948.cf207a8f4c434dad81498b84ba2ca48d').then((data) => {
     console.log(data);
   })
  }
 }
})
