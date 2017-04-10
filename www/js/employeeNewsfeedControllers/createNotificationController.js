app.controller('createNotificationCtrl', function($scope,$state,$http,$cordovaCamera, $ionicHistory,$rootScope,$ionicPopup,ionicToast,tokenCallbackService,loaderService,sentNotificationService,getNotificationService) {

//for showing camera icon
  $('.mainCameraIcon').addClass('show');

  $('.addImage').removeClass('hide');

  $('.addCameraIcon').removeClass('show');
  $rootScope.notificationImgURI = []; //decaration for storing notification images
  $rootScope.sentNotificationData = {}; //storing notifications
  $scope.notification = {};             //model initilisation
  $scope.notification.showLocation = false; //for hiding location
  $scope.notification.showPerson=false;  //for hiding person
  $scope.notification.choice=""; //declaration of notification type

//listening for changes in sent notifications
sentNotificationService.startListeningSentNotifications();

  $rootScope.$on("sentNotificationService:change", function(event, data) {

    $rootScope.sentNotificationData[data.doc._id] = data.doc;
    $scope.$apply();
  });

  $rootScope.$on("sentNotificationService:delete", function(event, data) {
    delete $rootScope.sentNotificationData[data.doc._id];
    $scope.$apply();
  });

// for back functionality
  $scope.back = function() {
    $ionicHistory.goBack();
  }

//for retrieving the sent docs
  $scope.callSentDocs=function(){

  sentNotificationService.updateSentDocs();


  }

  // for dispalying notification type
  $scope.notificationType = function() {
    $scope.notification.notificationPersonsId="";
    if ($scope.notification.choice == 'ToLocation') {
      $scope.employeeSuggestionListArray = {};
      console.log("in  location");
      $scope.notification.showLocation = true;
      $scope.notification.showPerson=false;
      console.log($scope.notification);

    }
    else if($scope.notification.choice == 'ToPerson'){
      $scope.notification.employeesLocation = "";
      $scope.notification.showLocation = false;
        $scope.notification.showPerson=true;
      console.log($scope.notification);
    }
    else{


    }
  }


//for getting location
  $scope.getEmployeesLocation = function() {
    console.log('employee location function');
    $http.post(contextPath + '/notificationServices/locationList', {
      "Authorization": securityToken
    }).then(function(response) {
      console.log(JSON.stringify(response));
      $scope.locations = response.data.DepartmentList;

      // document.getElementById("particulargroup").style.display = "block";

    })

  }

  //for getting employee list
$scope.employeeList=function(){

  $scope.employeeSuggestionListArray = {};
  if ($scope.notification.notificationPersonsId.length>0) {
    $http.post(contextPath + "/generalServices/getEmployeeSuggestionList", {
      "SearchKey": $scope.notification.notificationPersonsId,
      "Authorization": securityToken
    }).then(function(response) {
      console.log(JSON.stringify(response));

      if (JSON.stringify(response.data.IsAuthenticate) == "true") {
        console.log("emp suggestionlist authenticated service");
        if (JSON.stringify(response.data.isDataExisted) == "true") {

          $scope.employeeSuggestionListArray = response.data.employees;
        } else if (JSON.stringify(response.data.isDataExisted) == "false") {
          ionicToast.show('No employee found', 'middle', false, 1500);
        }
      } else {
        console.log("emp suggestionlist not authenticated service");
      }
    })
  } else {
    $scope.employeeSuggestionListArray = {};
  }


}

//for selecting employee
$scope.getEmployee=function(employee){
  $scope.employeeSuggestionListArray = {};
$scope.notification.notificationPersonsId=employee.LoginId;


}

//for removing images
  $scope.remove = function($index) {
    $scope.notificationImgURI.splice($index, 1);
    if ($scope.notificationImgURI.length == 0) {
      $('.mainCameraIcon').addClass('show');
      $('.addImage').removeClass('hide');
      $('.addCameraIcon').removeClass('show');
      $('.mainCameraIcon').removeClass('hide');
    }
  }

//for uploading images
  $scope.uploadPopup = function(obj) {
    $(obj.target).addClass('hide');

    $(obj.target).removeClass('show');


    var uploadPopup = $ionicPopup.show({
      title: "Upload Photo",
      //templateUrl: 'templates/partials/upload-img.html',
      buttons: [{
        text: "Camera",
        //  type:'button button-icon icon icon ion-ios-camera-outline cameraIcon',
        type: 'button cameraIcon',
        onTap: function(e) {

          // $scope.takePhoto = function() {

          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;

            $rootScope.notificationImgURI.push("data:image/jpeg;base64," + imageData);

            ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);
          }, function(err) {
            // An error occured. Show a message to the user
          });
          //}
        }
      }, {
        text: "Gallery",
        //type: 'button button-icon icon ion-images cameraIcon',
        type: 'button cameraIcon',

        onTap: function(e) {
            //  $scope.choosePhoto = function() {

            var options = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              correctOrientation: true,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              //$scope.imgURI = "data:image/jpeg;base64," + imageData;
              //  $scope.date = new Date();
              $rootScope.notificationImgURI.push("data:image/jpeg;base64," + imageData);

              ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);
            }, function(err) {
              // An error occured. Show a message to the user
            });
          }
          // }
      }]

    })


    $('.addCameraIcon').addClass('show');
  }


//for uploading images
  $scope.uploadSubPopup = function() {
    var uploadPopup = $ionicPopup.show({
      title: "Upload Photo",
      //templateUrl: 'templates/partials/upload-img.html',
      buttons: [{
        text: "Camera",
        //  type:'button button-icon icon icon ion-ios-camera-outline cameraIcon',
        type: 'button cameraIcon',
        onTap: function(e) {

          // $scope.takePhoto = function() {

          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;

            $rootScope.notificationImgURI.push("data:image/jpeg;base64," + imageData);

            ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);
          }, function(err) {
            // An error occured. Show a message to the user
          });
          //}
        }
      }, {
        text: "Gallery",
        //type: 'button button-icon icon ion-images cameraIcon',
        type: 'button cameraIcon',

        onTap: function(e) {
            //  $scope.choosePhoto = function() {

            var options = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              correctOrientation: true,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              //$scope.imgURI = "data:image/jpeg;base64," + imageData;
              //  $scope.date = new Date();
              $rootScope.notificationImgURI.push("data:image/jpeg;base64," + imageData);

              ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);
            }, function(err) {
              // An error occured. Show a message to the user
            });
          }
          // }
      }]

    })
  }




//for displaying notification details
  $scope.sentNotificationDetails=function(data){

  $rootScope._id=data._id;
  $rootScope._rev=data._rev;
  $rootScope.showTitle=data.showTitle;
  $rootScope.title = data.title;
  $rootScope.message = data.message;
  $rootScope.senderName = data.senderName;
  $rootScope.sendTo=data.sendTo;
  $rootScope.senderImage = data.senderImage;
  $rootScope.notificationImage=data.notificationImage;


  $rootScope.createdDate = data.createdDate;

  $state.go('menu.viewSentNotification');

  }


//for saving the notification in cloudant

  $scope.saveDoc=function(notification){


    var datenum=getNotificationService.getCurrentTime();
  var dateJson=JSON.stringify(datenum);
   var createdDate=new Date()

if (notification.choice === "ToLocation") {

    var sendto= notification.employeesLocation;

  } else if (notification.choice === "ToPerson") {

    var sendto=notification.notificationPersonsId;

  }
  else{


  }
    var jsonDocument = {
            _id:dateJson,
            title: notification.notificationTitle,
            message: notification.notificationMessage,
            createdDate: createdDate,
            scheduledTime: createdDate,
            showNotification: datenum,
            notifcationImage:$rootScope.notificationImgURI,
            senderName: window.localStorage['fullName'],
            senderId:window.localStorage['loginid'],
            senderImage:window.localStorage['Image'],
            sendTo:sendto
        };



          remotesentnewsdb.post(jsonDocument).then(function(response){

            $scope.notification="";
            allTokens=[];
              $rootScope.notificationImgURI=[];


              loaderService.hide();
             $state.go("menu.sentNotifications");

            console.log(JSON.stringify(response));
          })

          .catch(function(err){
         ionicToast.show('Your Internet connection is slow please try agin ', 'middle', false, 4000);
        loaderService.hide();

          })

          sentNotificationService.save(jsonDocument).then(function(response) {



              }, function(error) {
                console.log("ERROR -> " + error);

              });



  }

//for creating notification

  $scope.createPushNotification = function() {
    console.log($scope.notification);
    if (!$scope.notification.choice || !$scope.notification.notificationTitle || !$scope.notification.notificationMessage) {

    } else {
      console.log(JSON.stringify($scope.notification));
      loaderService.show("Sending notification please wait");

      if($scope.notification.choice=="ToPerson"){
            if(!$scope.notification.notificationPersonsId){
              loaderService.hide();

            }

    else{

      $http.post(contextPath + '/generalServices/getEmployeePushToken', {
    "LoginId": $scope.notification.notificationPersonsId,
    "Authorization": securityToken

  }).then(function(response) {


    console.log("Token response____"+JSON.stringify(response));
    console.log(JSON.stringify(response));


     if(response.data.PushToken=="None" ||response.data.PushToken=="NotUpdated"){
    loaderService.hide();
    var confirmPopup = $ionicPopup.confirm({
        title: 'Not yet registered',
        template: "Employee not yet registered for notifications he will recieve once he register, still you want to send?",
      });
      confirmPopup.then(function(res) {

        if(res) {
          console.log('You are sure');
         loaderService.show("Sending notification please wait")
          var req={

            method: "POST",
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/json', 'Authorization': 'key=AAAA2EWNEro:APA91bHLsXJt1T4frL-eTqLlstyQ2_vA8bTJyOiVvmbitWoJl35DaWYm_zwEw7P91LPJ-aGQrhdTa54rSVRvWSY_uLGfE19rVB3cnNHhp6wMwhrdt1ZnLKT9E08aMMiBV23U90cb3hzT'},
                  url: "https://fcm.googleapis.com/fcm/send",
                  data: JSON.stringify(
                    {
                        "notification":{
                          "title":$scope.notification.notificationTitle,  //Any value
                          "body":$scope.notification.notificationMessage,  //Any value
                          "sound": "default", //If you want notification sound
                          "click_action": "FCM_PLUGIN_ACTIVITY" ,  //Must be present for Android
                          "icon":"fcm_push_icon",
                           "color":"#000080"
                        },
                        "data":{
                          "title":$scope.notification.notificationTitle,
                          "body":$scope.notification.notificationMessage,
                          "click_action": "FCM_PLUGIN_ACTIVITY"
                        //  "param1":,  //Any data to be retrieved in the notification callback
                        //  "param2":
                        },
                        "to":response.data.PushToken,
                        "priority":"high", //If not set, notification won't be delivered on completely closed iOS app

          })

    }


          $http(req).then(function(response) {

            console.log(JSON.stringify(response));
            if (response.data.success == 1) {

              $scope.saveDoc($scope.notification);

            }

            else if(response.data.failure==1){
              $scope.saveDoc($scope.notification);

            //  alert("device not registered");
            }
          }).catch(function(err){
            ionicToast.show('Your Internet connection is low Please try agin ', 'middle', false, 2000);
              loaderService.hide();
            console.log(JSON.stringify(err));
          })


        }

         else {
          console.log('You are not sure');
        }
      });
}


else{

  var req={

    method: "POST",
          dataType: 'jsonp',
          headers: {'Content-Type': 'application/json', 'Authorization': 'key=AAAA2EWNEro:APA91bHLsXJt1T4frL-eTqLlstyQ2_vA8bTJyOiVvmbitWoJl35DaWYm_zwEw7P91LPJ-aGQrhdTa54rSVRvWSY_uLGfE19rVB3cnNHhp6wMwhrdt1ZnLKT9E08aMMiBV23U90cb3hzT'},
          url: "https://fcm.googleapis.com/fcm/send",
          data: JSON.stringify(
              {
                "notification":{
                  "title":$scope.notification.notificationTitle,  //Any value
                  "body":$scope.notification.notificationMessage,  //Any value
                  "sound": "default", //If you want notification sound
                  "click_action": "FCM_PLUGIN_ACTIVITY" ,  //Must be present for Android
                  "icon":"fcm_push_icon",
                   "color":"#000080"
                },
                "data":{
                  "title":$scope.notification.notificationTitle,
                  "body":$scope.notification.notificationMessage,
                  "click_action": "FCM_PLUGIN_ACTIVITY"
                //  "param1":,  //Any data to be retrieved in the notification callback
                //  "param2":
                },
                "to":response.data.PushToken,
                "priority":"high", //If not set, notification won't be delivered on completely closed iOS app

  })

}


  $http(req).then(function(response) {
    //loaderService.hide();

    console.log(JSON.stringify(response));
    if (response.data.success == 1) {

      $scope.saveDoc($scope.notification);

    }

    else if(response.data.failure==1){
      $scope.saveDoc($scope.notification);

    //  alert("device not registered");
    }
  }).catch(function(err){
    ionicToast.show('Your Internet connection is low Please try agin ', 'middle', false, 2000);
      loaderService.hide();
    console.log(JSON.stringify(err));
  })




}




  })

        }

      }

else if ($scope.notification.choice=="ToLocation") {
   if(!$scope.notification.employeesLocation){
loaderService.hide();

   }
else{

      $scope.promise = tokenCallbackService.tokencallback($scope.notification.employeesLocation);
      $scope.promise.then(function(allTokens) {


      //  alert("in controller all tokens else---->" + JSON.stringify(allTokens));
        //console.log("in controller all tokens else---->" + JSON.stringify(allTokens));
        // alert( JSON.stringify(allTokens));


        var req={

          method: "POST",
                dataType: 'jsonp',
                headers: {'Content-Type': 'application/json', 'Authorization': 'key=AAAA2EWNEro:APA91bHLsXJt1T4frL-eTqLlstyQ2_vA8bTJyOiVvmbitWoJl35DaWYm_zwEw7P91LPJ-aGQrhdTa54rSVRvWSY_uLGfE19rVB3cnNHhp6wMwhrdt1ZnLKT9E08aMMiBV23U90cb3hzT'},
                url: "https://fcm.googleapis.com/fcm/send",
                data: JSON.stringify(
                    {
                      "notification":{
                        "title":$scope.notification.notificationTitle,  //Any value
                        "body":$scope.notification.notificationMessage,  //Any value
                        "sound": "default", //If you want notification sound
                        "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
                        "icon":"fcm_push_icon",
                        "color":"#000080"   //White icon Android resource
                      },
                      "data":{
                        "title":$scope.notification.notificationTitle,
                        "body":$scope.notification.notificationMessage,
                        "click_action": "FCM_PLUGIN_ACTIVITY"
                      //  "param1":,  //Any data to be retrieved in the notification callback
                      //  "param2":
                      },
                      "registration_ids":allTokens, //Topic or single device
                      "priority":"high", //If not set, notification won't be delivered on completely closed iOS app

        })

}


        //alert( "request---->"+JSON.stringify(req));
        $http(req).then(function(response) {
          //loaderService.hide();
         $scope.saveDoc($scope.notification);
          console.log(JSON.stringify(response));
          if (response.data.success == 1) {





          }
        }).catch(function(err){
          ionicToast.show('Your Internet connection is low Please try agin ', 'middle', false, 4000);
            loaderService.hide();
          console.log(JSON.stringify(err));
        })

      })



}

}




    }
  }
})
