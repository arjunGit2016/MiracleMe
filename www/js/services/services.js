var app = angular.module('starter.services', [])
app.service('employeeProfileLoadingService',  function($rootScope, $ionicLoading, $timeout, $ionicNavBarDelegate, $location, $state,getNotificationService) {

console.log('hello service'+window.localStorage['isloggedin']);
  if (window.localStorage['isloggedin'] == 'true') {
      $state.go('menu.EmployeeNewsFeed');
   getNotificationService.getNewsReload();

       $rootScope.loginUserDetails = {
      Image: window.localStorage['Image'],
      FName: window.localStorage['FirstName'],
      MName: window.localStorage['MiddleName'],
      LName: window.localStorage['LastName'],
      TitleTypeId: window.localStorage['Designation'],
    };

    if (window.localStorage['isHr'] == 'true') {
      $rootScope.showCreatePush = true;
      console.log($rootScope.showCreatePush);
      //console.log($rootScope.showCreateNews);
    }
    else {
      $rootScope.showCreatePush = false;
      console.log($rootScope.showCreatePush);
    }

   if (window.localStorage['showFeedBack'] == 'true') {
      $rootScope.showFeedBack=true;
    }
    else {
      $rootScope.showFeedBack=false;
      console.log(  $rootScope.showFeedBack);
    }

    console.log("In service" + JSON.stringify($rootScope.loginUserDetails));
    $rootScope.coverSrc=window.localStorage['coverPicloc'];
  } else if (window.localStorage['isloggedin'] === 'false') {
    $location.path('/Employeelogin');
  } else {

  }

})

app.service('fcmTokenSavingService',function($http)
{
  this.saveToken = function(securityToken, uname, token) {

    $http.post(contextPath + '/generalServices/updateEmployeePushToken', {
      "Authorization": securityToken,
      'LoginId': uname,
      'PushToken': token
    }).then(function(response) {
     //window.localStorage.isTokenSaved=true;
//alert('token saved'+JSON.stringify(response));

    })

  }
})
