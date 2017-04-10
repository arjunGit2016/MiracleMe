app.controller('EmpLogoutCtrl', function($scope,addIssueService, $rootScope, $state, $ionicPopup,getNotificationService,sentNotificationService) {

//for prforming the logout operation in app
  $scope.employeeLogout = function() {
    console.log('hello logout');
    var confirmLogout = $ionicPopup.confirm({
      title: 'Miracle Me',
      template: '<center><span  style="font-size:14px !important;color:#232527 !important;">Are you sure you want to Logout?</span></center>',
      okText: '<span>Yes</span>',
      cancelText: '<span class="cameraIcon">No</span>'
    });

    confirmLogout.then(function(response) {
      if (response == true) {
        $rootScope.showCreatePush = false;
        window.localStorage.isHr = "";
        window.localStorage.isloggedin = 'false';
        window.localStorage.isLogout = 'true';
        window.localStorage.ename = "";
        window.localStorage.pnumber = "";
        window.localStorage.wnumber = "";
        window.localStorage.isManager = "";
        window.localStorage.emailId = "";
        window.localStorage.empId = "";
        window.localStorage.loginid = "";
        window.localStorage.showFeedBack = "";
        window.localStorage["isTokenSaved"] = false;
        window.localStorage.EmployeeLocation = "";
        window.localStorage.coverPicloc = "";
        // getNotificationService.destroy().then(function(){
        //   console.log("db destroyed");
        // })
        addIssueService.destroy();
        sentNotificationService.destroy();

        notificationRXdb.allDocs({
        include_docs: true
      }).then(function(result) {
        console.log(JSON.stringify(result));
        for (var i = 0; i < result.rows.length; i++) {
          var id = result.rows[i].doc._id;
          var rev = result.rows[i].doc._rev;

          //remote.post(obj);
          notificationRXdb.remove(id, rev);
        }

      }).catch(function(err) {
        if (err.name === 'conflict') {
          console.log("in conflict error");
        }
        console.log(err);
      });
        $state.go('Employeelogin');
      } else {

      }
    })

  }
})
