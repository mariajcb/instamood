app.controller('MoodController', ['$scope', 'imgService', function($scope, imgService) {
 $scope.vm = {};
 $scope.vm.src = getImage();

 function getImage() {
  return imgService.getImage();
 }
}])
