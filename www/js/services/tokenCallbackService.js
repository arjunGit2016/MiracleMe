app.service('tokenCallbackService', function($http,ionicToast,loaderService) {
  this.tokencallback = function(location) {

    console.log("In service" + JSON.stringify(location));

    return $http.post(contextPath + '/generalServices/getEmployeeListForPushNotification', {
        "Authorization": securityToken,
        "DepartmentId": "",
         "PracticeId":"",
         "Location":location
      }).then(function(tokensResponse) {


        console.log("in service total token response" + JSON.stringify(tokensResponse));

        var length = Object.keys(tokensResponse.data).length;
        length = length - 1;

        console.log("before for length" + length);
        for (var i = 1; i <= length; i++) {

          console.log(i);
          //  console.log( "Token in for loop"+tokensResponse.data[i].PushToken);
          allTokens.push(tokensResponse.data[i].PushToken);

        }


        return allTokens;
      })
      .catch(function(error) {
        loaderService.hide();

        ionicToast.show("something went wrong while getting tokens try again","middle",2000);
      })


    return tokencallback(name);

  }
})
