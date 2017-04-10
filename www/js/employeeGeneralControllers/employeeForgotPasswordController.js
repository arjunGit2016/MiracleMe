app.controller('EmpForgotPasswordCtrl', function($scope, $state, $ionicHistory, $interval, $http, ionicToast, loaderService) {
  $scope.back = function() {
    $ionicHistory.goBack();
  }
  $scope.loginmailName = {};

  // for getting the hubble password 
  $scope.forgotPassword = function(name) {
    //$scope.userEmail=document.getElementById('mailid').value;
    console.log($scope.loginmailName.mail);
    if (!$scope.loginmailName.mail) {
      ionicToast.show('please enter user name', 'middle', false, 1500);
    } else {
      //ionicToast.show('please wait','middle',false);
      // loaderService.show('please wait');
      var forgotLoadingText = '<div style="margin-left:6px">Please Wait</div>';
      loaderService.show(forgotLoadingText);
      $http.post(contextPath + "/generalServices/forgetPassword", {
        "EmailId": $scope.loginmailName.mail + "@miraclesoft.com",
        "Authorization": securityToken
      }).then(function(response) {
        console.log(JSON.stringify(response));
        //ionicToast.hide();
        loaderService.hide();
        if (response.data.Result != "Congrats! We have sent the password to your Official EmailId.") {

          $scope.errorMessage = response.data.Result;
          $interval(function() {
            $scope.errorMessage = "";
          }, 5000);
          $scope.loginmailName = {};
        } else {
          $scope.loginmailName = {};
          ionicToast.show('Password reset email has been sent', 'bottom', false, 1500);
          $state.go('Employeelogin');
        }

      })
    }

  }

})
