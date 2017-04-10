app.controller("EditIssueCtrl", function($http,$cordovaGeolocation,$cordovaCamera, $scope,$rootScope,$ionicPopup,$cordovaToast, $ionicHistory,$location,ionicToast) {
  $('.mainCameraIcon1').addClass('show');

  $('.addImage').removeClass('hide');

  $('.addCameraIcon1').removeClass('show');

  $scope.back = function() {
     $ionicHistory.goBack();
   }
  // $scope.worklocations=['Atlanta','Bentonville','Cincinnati','Lawsons Bay Colony','Miracle City','Miracle Heights','Novi'];
       $scope.data=$rootScope.dest;
       console.log($scope.data);

       $scope.solve=function(isChecked){
       //  alert(isChecked);
         $rootScope.isChecked=isChecked;
       }

$scope.editImgURI=[];


$scope.editImgURI = $scope.img;

//$scope.editImgURI.push("data:image/jpeg;base64,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");

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

            //$scope.editImgURI = "data:image/jpeg;base64," + imageData;

            //alert(imageData);

            $scope.editImgURI.push("data:image/jpeg;base64," + imageData);

            //  alert($scope.editImgURI);

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

              //$scope.editImgURI = "data:image/jpeg;base64," + imageData;

              //  $scope.date = new Date();

              $scope.editImgURI.push("data:image/jpeg;base64," + imageData);

              //alert(imageData);

              //  alert($scope.editImgURI);

              ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);

            }, function(err) {

              // An error occured. Show a message to the user

            });

          }

          // }

      }]



    })

    $('.addCameraIcon1').addClass('show');
	//$('.mainCameraIcon').addClass('hide');

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

            //$scope.editImgURI = "data:image/jpeg;base64," + imageData;

            //alert(imageData);

            $scope.editImgURI.push("data:image/jpeg;base64," + imageData);

            //  alert($scope.editImgURI);

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

              //$scope.editImgURI = "data:image/jpeg;base64," + imageData;

              //  $scope.date = new Date();

              $scope.editImgURI.push("data:image/jpeg;base64," + imageData);

              //alert(imageData);

              //  alert($scope.imgURI);

              ionicToast.show('Click on camera icon for add more', 'middle', false, 2000);

            }, function(err) {

              // An error occured. Show a message to the user

            });

          }

          // }

      }]



    })

  }
	   /*----------------------------------------------------------------------------------*/
      $scope.editForm = function() {
         var confirmPopup = $ionicPopup.confirm({
           title: '<span>Miracle Me</span>',
           template: '<center><span  style="font-size:14px !important;">Are you sure you want to Update?</span></center>',
           okText: '<span>yes</span>',
           cancelText: '<span class="cameraIcon">No</span>'
         });
       $scope.getID=$rootScope.id;


         $http.get("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues/"+$scope.getID).then(function(response) {
     $rootScope.revid=response.data._rev;
	  $rootScope.location1=response.data.workingLocation;

     $scope.image= $rootScope.img;
     confirmPopup.then(function(res) {
       if (res) {
         var title = document.getElementById("title2").value;
           var desc = document.getElementById("descp2").value;
           var add = document.getElementById("address1").value;
             var city = document.getElementById("city1").value;
             var state = document.getElementById("state1").value;
               var country = document.getElementById("country1").value;
              var locations = document.getElementById("location2").value;
     //      var loca = document.getElementById("latlong1").value;
            $rootScope.date=new Date();

    //alert($scope.location1);

     //alert($rootScope.isChecked)
           var editData = {
             "_id":$scope.getID,
             "_rev":$rootScope.revid,
               "title": title,
               "description": desc,
               "issueImage": $scope.image,
              "location":$rootScope.lat,
               "createdDate":new Date(),
               "addressLine": add,
               "city":city,
               "state":state,
               "country":country,
               "workingLocation": locations,
                "comment":$rootScope.comment1,
               "submittedDate":$rootScope.subdate,
               "isResolved": $rootScope.isChecked,
               "email":window.localStorage['emailId'],
    			   "poke":$rootScope.Poke,
			   "status":$rootScope.status

           }

           $http.post("https://0d0f83a9-46b3-4ef1-a598-c4c631570c0d-bluemix.cloudant.com/miracleme_issues", editData)
               .success(function(response) {
                 //  alert(JSON.stringify(response));
                   $scope.responseData = response;

 $location.path("/menu/Issues");
         //          alert(JSON.stringify($scope.responseData))
               }).error(function(response){
		ionicToast.show('Check your internet connection!!', 'bottom', false, 1500);
	})
             } else {}
           });

     })

       }

       $scope.remove = function($index) {
           $scope.editImgURI.splice($index, 1);
           if($scope.editImgURI.length == 0 ){
             $('.mainCameraIcon1').addClass('show');
             $('.addImage').removeClass('hide');
             $('.addCameraIcon1').removeClass('show');
             $('.mainCameraIcon1').removeClass('hide');
           }
         }



})
