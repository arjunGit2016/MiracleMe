app.service('loaderService', function($ionicLoading) {
  console.log('loadservice');
  this.show = function(loadText) {
    //var loadText="Signing In...";
    console.log("test loader");
    $ionicLoading.show({
      template: '<div class="row"><div class="col col-25"><ion-spinner icon="android"></ion-spinner></div><div class="col col-75">' + loadText + '</div></div>',

    }).then(function() {
      console.log("The loading indicator is now displayed");
    })
  }

  this.hide = function() {
    $ionicLoading.hide().then(function() {
      console.log("The loading indicator is now hidden");
    })
  }

})
