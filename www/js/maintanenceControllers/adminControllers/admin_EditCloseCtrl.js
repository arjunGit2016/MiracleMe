app.controller("Admin_EditCloseCtrl", function($http, $scope,$rootScope,$ionicPopup, $ionicHistory,$location) {
  
  $scope.back = function() {
     $ionicHistory.goBack();
   }

    $scope.data=$rootScope.dest;
 
    $rootScope.user = $scope.data.title;
    
    $rootScope.id = $scope.data._id;
    $rootScope.rev = $scope.data._rev;
    $rootScope.des = $scope.data.description;
    $rootScope.lat = $scope.data.location;
    $rootScope.address = $scope.data.addressLine;
    $rootScope.city = $scope.data.city;
    $rootScope.state = $scope.data.state;
    $rootScope.country = $scope.data.country;
    $rootScope.worklocation = $scope.data.workingLocation;
    $rootScope.img = $scope.data.issueImage;
    $rootScope.isChecked = $scope.data.isResolved;
    $rootScope.date =$scope.data.createdDate;
    $rootScope.subdate = $scope.data.submittedDate;
    $rootScope.myWelcome = $scope.data.comment;
    $rootScope.Email=$scope.data.email;
    $rootScope.status=$scope.data.status;
     
})