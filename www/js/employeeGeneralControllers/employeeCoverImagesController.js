app.controller("EmployeeCoverImagesCtrl", function($scope, $http, $rootScope, $ionicHistory, $location, ionicToast) {
  console.log($rootScope.coverSrc);
  $rootScope.CoverImages = CoverImages;
  $scope.back = function() {
    $ionicHistory.goBack();
  }

  //$rootScope.coverPic = window.localStorage['coverPicloc'];
  console.log("Default Cover Pic is : " + $rootScope.coverSrc);
  for (i = 0; i < $rootScope.CoverImages.length; i++) {
    //console.log($rootScope.CoverImages[i].filename);
    if ($rootScope.coverSrc == $rootScope.CoverImages[i].filename) {
      $rootScope.CoverImages[i].type = "block";
    } else {
      $rootScope.CoverImages[i].type = "none";
    }
  }
  // for changing the background cover images from the list of images
  $scope.getImage = function(obj) {
    for (i = 0; i < $rootScope.CoverImages.length; i++) {
      if (i == obj)
        $rootScope.CoverImages[i].type = "block";
      else
        $rootScope.CoverImages[i].type = "none";
    }
    $http.post(contextPath + "/generalServices/updateEmployeeCoverPic", {
      "Authorization": securityToken,
      "LoginId": window.localStorage['loginid'],
      "CoverPic": $rootScope.CoverImages[obj].filename
    }).then(function(response) {
      console.log(JSON.stringify(response));
    })
    $rootScope.coverSrc = $rootScope.CoverImages[obj].filename;
    console.log("Cover Source " + $rootScope.coverSrc);
    window.localStorage.coverPicloc = $rootScope.coverSrc;
    ionicToast.show('Successfully changed the cover pic', 'middle', false, 1500);
  }
})
