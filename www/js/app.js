// Ionic Starter menu

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic','ionicLazyLoad', 'ngCordova','starter.controllers', 'starter.services', 'ionic-toast','ionic-modal-select','angular-toArrayFilter','ngtimeago','dcbImgFallback'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })

    .state('Employeelogin', {
      url: '/Employeelogin',
      templateUrl: 'templates/employeelogin.html',
      controller: 'EmpLoginCtrl'
    })

    .state('Imagegrid', {
      url: '/imagegrid',
      templateUrl: 'templates/employeeCoverImages.html',
      controller: 'EmployeeCoverImagesCtrl'
    })

    .state('EmployeeForgotPassword', {
      url: '/EmployeeForgotPassword',
      templateUrl: 'templates/employeeForgotPassword.html',
      controller: 'EmpForgotPasswordCtrl'
    })




    .state('menu.EmployeeNewsFeed', {
      url: '/EmployeeNewsFeed',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeNewsfeed/employeeNewsFeed.html',
          controller: 'getNewsFeedController'
        }
      }
    })

    .state('menu.viewReceivedNotification', {
      url: '/viewReceivedNotification',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeNewsfeed/viewReceivedNotification.html',
          controller: 'viewReceivedNotificationCntrl'
        }
      }
    })



    .state('CreateNotification', {
  url: '/CreateNotification',
  templateUrl: 'templates/employeeNewsfeed/createNotification.html',
  controller: 'createNotificationCtrl'
})

.state('menu.sentNotifications', {
  url: '/sentNotifications',
  views: {
    'menuContent': {
      templateUrl: 'templates/employeeNewsfeed/sentNotifications.html',
      controller: 'createNotificationCtrl'
    }
  }
})


.state('menu.viewSentNotification', {
  url: '/viewSentNotification',
  views: {
    'menuContent': {
      templateUrl: 'templates/employeeNewsfeed/viewSentNotification.html',
      controller: 'createNotificationCtrl'
    }
  }
})




    .state('menu.EmployeeSearch', {
      url: '/EmployeeSearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeSearch/employeeSearch.html',
          controller: 'EmployeeSearchCtrl'
        }
      }
    })

    .state('menu.EmployeeDetails', {
      url: '/EmployeeDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeSearch/employeeDetails.html',
          controller: 'EmployeeDetailsCtrl'
        }
      }
    })

    .state('menu.AppFeedback', {
      url: '/AppFeedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeFeedback/appFeedback.html',
          controller: 'AppFeedBackCtrl'
        }
      }
    })

    .state('menu.ViewAppFeedback', {
      url: '/ViewAppFeedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeFeedback/viewAppFeedback.html',
          controller: 'ViewAppFeedbackCtrl'
        }
      }
    })

    .state('menu.ViewIndividualFeddback', {
      url: '/ViewIndividualFeddback',
      views: {
        'menuContent': {
          templateUrl: 'templates/employeeFeedback/viewIndividualFeddback.html'
          //controller: 'viewFeedbackCtrl'
        }
      }
    })
    .state('menu.AppReleaseNotes', {
      url: '/AppReleaseNotes',
      views: {
        'menuContent': {
          templateUrl: 'templates/releaseVersions/appReleaseNotes.html'
          //controller: 'releaseVersionCtrl'
        }
      }
    })

    .state('menu.ReleaseVersion1', {
      url: '/ReleaseVersion1',
      views: {
        'menuContent': {
          templateUrl: 'templates/releaseVersions/releaseVersion1.html'
          //controller: 'releaseVersionCtrl'
        }
      }
    })

    .state('menu.Issues', {
         url: '/Issues',
         views: {
           'menuContent': {
             templateUrl: 'templates/maintanence/issues/issues.html',
             controller: 'IssuesCtrl'
           }
         }
       })
       .state('menu.tab2', {
         url: '/tab2',
         views: {
           'menuContent': {
         templateUrl: 'templates/maintanence/issues/closeIssue.html',
         controller: "IssuesCtrl"
       }
       }
       })
       .state('ViewIssueClose', {
         url: '/viewissueclose',
         templateUrl: 'templates/maintanence/user/viewIssueClose.html',
         controller: 'ViewIssueCloseCtrl'
       })
       .state('ViewIssue', {
         url: '/viewissue',
         templateUrl: 'templates/maintanence/user/viewIssue.html',
         controller: 'ViewIssueCtrl'
       })

       .state('AddIssue', {
         url: '/addIssue',
         templateUrl: 'templates/maintanence/addIssue.html',
         controller: "AddIssueCtrl"
       })

       .state('EditIssue', {
         url: '/editIssue',
         templateUrl: 'templates/maintanence/editIssue.html',
         controller: "EditIssueCtrl"

       })
       .state('Adminedit', {
         url: '/Adminedit',
         templateUrl: 'templates/maintanence/admin/admin_edit.html',
         controller: 'AdminEditCtrl'
       })
       .state('AdminClose', {
         url: '/Admineditclose',
         templateUrl: 'templates/maintanence/admin/admin_Edit_close.html',
         controller: 'Admin_EditCloseCtrl'
       })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/Employeelogin');

});
