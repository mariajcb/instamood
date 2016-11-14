app.controller('MoodController', ['$scope', 'imgService', function($scope, imgService) {
 $scope.vm = {};
 imgService.getImage().getInstaData().$promise.then(function(data) {
  $scope.vm.src = data.data.profile_picture;
 })
}])
