

var notificationsurl = "https://oneriandsopheristimeledi:13270b0c6dd435469d0fcf8b8410a9a9b8e2a714@0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_notifications";

var statusurl = "https://andestandreensibeetualle:cd59de1cbacc2f8c7361dc7ae59b3c205e5715ff@0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_notifications_status";

var maintenanceurl="https://byeaderstlyinfirestruell:46a264d65452c6d974315d69ea7e6b60aaa8f554@0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues";

var remotesentnewsdb = new PouchDB(notificationsurl);

var getnews = new PouchDB(notificationsurl);

var statusdb = new PouchDB(statusurl);

var maintanencedb=new PouchDB(maintenanceurl);

var notificationRXdb = new PouchDB('notificationRXdb');

var notificationsentdb = new PouchDB('notificationsentdb');

var localmaintenancedb=new PouchDB("maintenancedb");

var contextPath = "http://www.miraclesoft.com/HubbleServices/hubbleresources";







var emptyProfileImage="iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBMzE1OTVCNzk5RjVFMjExQkNCNEI5MTEwMTE4MTE4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNjlCMkZDNjA5MkQxMUUzOUEzNEM4MDk1MDJFMUZERSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNjlCMkZDNTA5MkQxMUUzOUEzNEM4MDk1MDJFMUZERSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk3QjcwMDg0MkEwOUUzMTFCOTE4RDhGM0FGNzdBRTA2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEzMTU5NUI3OTlGNUUyMTFCQ0I0QjkxMTAxMTgxMThFIi8+IDwvcmRmOkRlc2NyaXB0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";
var securityToken=btoa("admin:admin");
  var allTokens=[];
var CoverImages = [{
             "filename": "img/1.png"
           },
           {
             "filename": "img/2.png"
           },
           {
             "filename": "img/3.png"
           },
           {
             "filename": "img/4.png"
           },
           {
             "filename": "img/5.png"
           },
           {
             "filename": "img/6.png"
           },
           {
             "filename": "img/7.png"
           },
           {
             "filename": "img/8.png"
           },
           {
             "filename": "img/9.png"
           },
           {
             "filename": "img/10.png"
           },
           {
             "filename": "img/11.png"
           },
           {
             "filename": "img/12.png"
           },
           {
             "filename": "img/13.png"
           },
           {
             "filename": "img/14.png"
           }
         ];

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
