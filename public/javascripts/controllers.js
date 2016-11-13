app.controller('MoodController', ['$scope', 'imgService', function($scope, imgService) {
 $scope.vm = {};
 $scope.vm.src = getImage();

 function getImage() {
  console.log('i here');
  return imgService.getImage();
 }
}])
