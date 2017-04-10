app.controller('EmpLoginCtrl', function($scope, $rootScope, $http, $state, $ionicNavBarDelegate, loaderService, employeeProfileLoadingService, ionicToast, backcallFactory, getNotificationService,fcmTokenSavingService) {
    //alert('hii EmpLoginCtrl');
    backcallFactory.backcallfun();
    $scope.loginData = {};

    $scope.loginData.loginColor = 'white';
    $scope.loginData.passwordColor = 'white';
    $scope.changeLoginColor = function() {
      console.log($scope.loginData.username);
      if ($scope.loginData.username.length > 0) {
        $scope.loginData.loginColor = 'white';
      } else {
        $scope.loginData.loginColor = 'red';
      }

    }
    $scope.changePasswordColor = function() {
      console.log($scope.loginData.password);
      if ($scope.loginData.password.length > 0) {
        $scope.loginData.passwordColor = 'white';
      } else {
        $scope.loginData.passwordColor = 'red';
      }

    }
// for performing the login operation into the application
    $scope.employeeLogin = function() {
      var loginLoadingText = '<div style="margin-left:6px">Signing In</div>';

      console.log($scope.loginData);
      if ($scope.loginData.username == undefined) {
        $scope.loginData.loginColor = 'red';
      } else {

      }
      if ($scope.loginData.password == undefined) {
        $scope.loginData.passwordColor = 'red';
      } else {

      }
      if ($scope.loginData.username == undefined && $scope.loginData.password == undefined) {
        $scope.loginData.loginColor = 'red';
        $scope.loginData.passwordColor = 'red';
      } else {

      }
      //  console.log($scope.loginData.username.length + "" +$scope.loginData.password.length);
      if ($scope.loginData.username) {
        if ($scope.loginData.password) {
          console.log('heell');
          loaderService.show(loginLoadingText);
          $scope.checkLoginAction = {
            "LoginId": $scope.loginData.username.toLowerCase(),
            "Password": $scope.loginData.password,
            "Authorization": securityToken
          };
          $http.post(contextPath + "/generalServices/generalEmployeeDetails", $scope.checkLoginAction).then(function(response) {
            console.log(JSON.stringify(response));
            var employeeResponse = response.data;
            $rootScope.loginUserDetails = employeeResponse;
            console.log(employeeResponse);
            if (employeeResponse.IsAuthenticate == true) {
              if (response.data.ResultString == "InValidCredentiales") {
                loaderService.hide();
                ionicToast.show('Invalid Credentails', 'middle', false, 1500);
              } else if (employeeResponse.ResultString == 'Valid') {

                console.log(employeeResponse.LoginId);

                if (response.data.IsOperationContactTeam == '1' || employeeResponse.LoginId == 'skorada1' || employeeResponse.LoginId == 'sganta1') {
                  window.localStorage.isHr = 'true';
                  window.localStorage.isManager = 'false';
                  $rootScope.showCreatePush = true;
                } else {
                  window.localStorage.isHr = 'false';
                  window.localStorage.isManager = 'false';
                  $rootScope.showCreatePush = false;
                }

                if (response.data.IsManager == "1" || employeeResponse.LoginId=="hguvvala" || employeeResponse.LoginId=="vvoona" || employeeResponse.LoginId=="sganta1") {
                  window.localStorage.isManager = 'true';
                  $rootScope.workerlist = true;
                } else {
                  window.localStorage.isManager = 'false';
                  $rootScope.workerlist = false;
                }

                if (employeeResponse.LoginId == "asanapati" || employeeResponse.LoginId == "vkandregula" || employeeResponse.LoginId == "mchennu" || employeeResponse.LoginId == "clokam" || employeeResponse.LoginId == "vvoona" || employeeResponse.LoginId == "sganta1" || employeeResponse.LoginId == "skorada1" || employeeResponse.LoginId == "hguvvala") {
                  console.log('hello showFeedBack');
                  $rootScope.showFeedBack = true;
                  window.localStorage.showFeedBack = 'true';
                } else {

                  $rootScope.showFeedBack = false;
                  window.localStorage.showFeedBack = 'false';
                }

                var isAndroid = ionic.Platform.isAndroid();
                if (isAndroid == true) {
                  console.log('platform added');

                  // FCMPlugin.getToken(
                  //   function(token) {
                  //
                  //     var tokengen = token;
                  //
                  //     fcmTokenSavingService.saveToken(securityToken,employeeResponse.LoginId, tokengen);
                  //
                  //
                  //
                  //   },
                  //   function(err) {
                  //
                  //     console.log('error retrieving token: ' + err);
                  //   }
                  // );
                } else {
                  console.log('platform not added');
                }


                window.localStorage.isloggedin = 'true';
                window.localStorage.isLogout = 'false';
                window.localStorage.FirstName = $rootScope.loginUserDetails.FName;
                window.localStorage.MiddleName = $rootScope.loginUserDetails.MName;
                window.localStorage.LastName = $rootScope.loginUserDetails.LName;
                window.localStorage.fullName = window.localStorage['FirstName'] + " " + window.localStorage['MiddleName'] + " " + window.localStorage['LastName'];
                window.localStorage.Image = $rootScope.loginUserDetails.Image;
                window.localStorage.Designation = $rootScope.loginUserDetails.TitleTypeId;
                window.localStorage.isCheckBox = $scope.isChecked;
                //window.localStorage.upwd = $scope.password;
                window.localStorage.emailId = $rootScope.loginUserDetails.Email1;
                window.localStorage.loginid = $rootScope.loginUserDetails.LoginId;
                window.localStorage.employeeId = $rootScope.loginUserDetails.Id;
                window.localStorage.EmployeeLocation = $rootScope.loginUserDetails.Location;
                $ionicNavBarDelegate.showBackButton(false);

                console.log(CoverImages.length);
                for (i = 0; i < CoverImages.length; i++) {
                  //console.log($rootScope.CoverImages[i].filename);
                  if (CoverImages[i].filename == employeeResponse.CoverPic) {
                    console.log("cover pic");
                    $rootScope.coverSrc = employeeResponse.CoverPic;
                    window.localStorage.coverPicloc = $rootScope.coverSrc;
                    console.log("Cover Pic Local Value :" + $rootScope.coverSrc);
                    break;
                  } else {

                    console.log("no cover pic");
                  }
                }

                //loaderService.hide();
                console.log('valid employee');
                getNotificationService.getNews();

                //  $state.go('menu.EmployeeNewsFeed');
              } else {
                console.log('Invalid employee');
              }

            } else {
              console.log('invalid employee');
            }
          })
        }
      } else {
        console.log('dddheell');
      }
    }
  })

// for performing the mobile hardware backbutton related actions in app
  .factory('backcallFactory', ['$state', '$ionicPlatform', '$ionicHistory', '$timeout', function($state, $ionicPlatform, $ionicHistory, $timeout) {

    var obj = {}
    obj.backcallfun = function() {

      $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.current.name == "menu.EmployeeNewsFeed") {
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else if ($state.current.name == "Employeelogin") {
          navigator.app.exitApp();
        } else {
          navigator.app.backHistory();
        }
      }, 100);

    } //backcallfun
    return obj;
  }]);
