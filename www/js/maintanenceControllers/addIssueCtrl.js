app.controller("AddIssueCtrl", function($http, ionicToast, $cordovaGeolocation, $cordovaCamera, $scope, $rootScope, $ionicPopup, $cordovaToast, $ionicHistory, $location,addIssueService) {

  $('.mainCameraIcon').addClass('show');

  $('.addImage').removeClass('hide');

  $('.addCameraIcon').removeClass('show');




  $scope.back = function() {

    $ionicHistory.goBack();

  };



  $scope.imgURI = [];



  var posOptions = {

    timeout: 10000,

    enableHighAccuracy: false

  };

  $cordovaGeolocation.getCurrentPosition(posOptions)



    .then(function(position) {

      //$scope.getLocation=function(){

      $scope.lat = position.coords.latitude

      $scope.long = position.coords.longitude

      $scope.location = $scope.lat + '   ' + $scope.long;

      console.log($scope.lat + '   ' + $scope.long)

      // }

    }, function(err) {

      console.log(err)

    });



  var watchOptions = {

    timeout: 3000,

    enableHighAccuracy: false

  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);



  watch.then(

    null,



    function(err) {

      console.log(err)

    },



    function(position) {

      var lat = position.coords.latitude

      var long = position.coords.longitude

      console.log(lat + '' + long)

    }

  );

  watch.clearWatch();
  $scope.filterDonorsFn = function(problemObj) {
    //alert($scope.prob_type);
  }

  /*-------------------------------------------------------*/

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

          //  alert("hello");

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

            //alert(imageData);

            $scope.imgURI.push("data:image/jpeg;base64," + imageData);

            //  alert($scope.imgURI);

            ionicToast.show('Click on camera icon for add more', 'bottom', false, 2000);

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

          //  alert("test");

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

            $scope.imgURI.push("data:image/jpeg;base64," + imageData);

            //alert(imageData);

            //  alert($scope.imgURI);

            ionicToast.show('Click on camera icon for add more', 'bottom', false, 2000);

          }, function(err) {

            // An error occured. Show a message to the user

          });

        }

        // }

      }]



    })

    $('.addCameraIcon').addClass('show');

  }

  $scope.uploadSubPopup = function() {



    //$(obj.target).addClass('hide');

    //$('.addCameraIcon').addClass('show');

    var uploadPopup = $ionicPopup.show({

      title: "Upload Photo",

      //templateUrl: 'templates/partials/upload-img.html',

      buttons: [{

        text: "Camera",

        //  type:'button button-icon icon icon ion-ios-camera-outline cameraIcon',

        type: 'button cameraIcon',

        onTap: function(e) {



          // $scope.takePhoto = function() {

          //  alert("hello");

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

            //alert(imageData);

            $scope.imgURI.push("data:image/jpeg;base64," + imageData);

            //  alert($scope.imgURI);

            ionicToast.show('Click on camera icon for add more', 'bottom', false, 2000);

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

          //  alert("test");

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

            $scope.imgURI.push("data:image/jpeg;base64," + imageData);

            //alert(imageData);

            //  alert($scope.imgURI);

            ionicToast.show('Click on camera icon for add more', 'bottom', false, 2000);

          }, function(err) {

            // An error occured. Show a message to the user

          });

        }

        // }

      }]



    })

  }

  $scope.update = function(worklocation) {

    $rootScope.location1 = worklocation;

    console.log(worklocation);

    //  alert($scope.location1);
  }

  $scope.post_Issue = function(issue) {

    //alert("calling U");









    var confirmPopup = $ionicPopup.confirm({

      title: '<b><span>Miracle Me</span></b>',

      template: '<center><span  style="font-size:14px !important;color:#232527 !important;">Are you sure to create an Issue?</span></center>',

      okText: '<span>Yes</span>',

      cancelText: '<span class="cameraIcon">No</span>'

    });

    confirmPopup.then(function(res) {

      if (res) {



        /*  var title = document.getElementById("title").value;

          var desc = document.getElementById("descp").value;

          //var location=document.getElementById("latlong").value;

          alert(issue.title);*/

        console.log(issue.title);

        console.log(issue.description);

        console.log(issue.address);

        console.log(issue.city);

        console.log(issue.country);

        console.log($scope.location1);

        $scope.Date = new Date();

        //alert($scope.Date + window.localStorage['emailId']);

        var postJSONData = {

          "title": issue.title,

          "description": issue.description,

          "addressLine": issue.address,

          "city": issue.city,

          "state": issue.state,

          "country": issue.country,

          "comment": null,

          "workingLocation": $rootScope.location1,

          "issueImage": $scope.imgURI,

          "location": $scope.location,

          "isResolved": "false",

          "createdDate": $scope.Date,

          "submittedDate": $scope.Date,

          "email": window.localStorage['emailId'],

          "status": "In Progress",
          "poke": false

        }

        addIssueService.addIssue(postJSONData).then(function(response) {
             //$state.go('/tab/comment');
             $location.path("/menu/Issues");

           }, function(error) {
             console.log("ERROR -> " + error);
           });
/*addIssueService.save(postJSONData).then(function(response){

console.log("saved");

$scope.imgURI = [];
issue.title = "";
issue.description = "";
issue.address = "";
issue.city = "";
issue.state = "";
issue.country = "";
$rootScope.location1 = "";
$scope.imgURI = "";
$scope.location = "";


$scope.responseData = response;

//$scope.post_problem.hide();

ionicToast.show('Successfully created the issue', 'bottom', false, 1500);
$location.path("/menu/Issues");


}).catch(function(err){

console.log("got some error");

})
*/

        console.log($scope.imgURI);
        /*$http.post("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues", postJSONData)

          .success(function(response) {

            console.log("success");
            $scope.imgURI = [];
            issue.title = "";
            issue.description = "";
            issue.address = "";
            issue.city = "";
            issue.state = "";
            issue.country = "";
            $rootScope.location1 = "";
            $scope.imgURI = "";
            $scope.location = "";


            $scope.responseData = response;

            //$scope.post_problem.hide();

            ionicToast.show('Successfully created the issue', 'bottom', false, 1500);
            $location.path("/menu/Issues");

            //  alert(JSON.stringify($scope.responseData))

          }).error(function(response) {


            ionicToast.show('Failed to create an issue', 'bottom', false, 1500);


          })*/

      } else {}

    })

  }

  $scope.remove = function($index) {
    $scope.imgURI.splice($index, 1);
    if ($scope.imgURI.length == 0) {
      $('.mainCameraIcon').addClass('show');
      $('.addImage').removeClass('hide');
      $('.addCameraIcon').removeClass('show');
      $('.mainCameraIcon').removeClass('hide');
    }
  }
})
