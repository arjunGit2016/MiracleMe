app.controller('getNewsFeedController',function($scope,$rootScope,getNotificationService,$state,$rootScope){

  $rootScope.notificationRxdata = {}; //for storing recieved notifications notification
//for listening changes in recieved notifications
  getNotificationService.startListeningReceivedNotifications();

  $rootScope.$on("getNotificationService:change", function(event, data) {

    $rootScope.notificationRxdata[data.doc._id] = data.doc;
    // var keys = Object.keys($rootScope.notificationRxdata);
    //  $rootScope.len = keys.length;
    $rootScope.$apply();
  });

  $rootScope.$on("getNotificationService:delete", function(event, data) {
    delete $rootScope.notificationRxdata[data.doc._id];
    $rootScope.$apply();
  })

//for back functionality
  $scope.goBack = function() {
      $ionicHistory.goBack();
    }


//to refresh notifications
    $scope.doRefresh = function() {
      getNotificationService.getNewsReload();

    }
//to diaplay notification details
  $scope.fullnotification = function(data) {

     $rootScope.data=data;
     $state.go("menu.viewReceivedNotification");


  }







})
