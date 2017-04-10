app.controller('EmployeeDetailsCtrl',function($state,$location,$scope,$rootScope,$http)

{

//for sending the mail from the employee details 
  $scope.sendmail=function(){

console.log('heloo mail');

 if(window.plugins && window.plugins.emailComposer) {
          window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
              console.log("Response -> " + result);

         },

         "", // Subject

         "",                      // Body

         [$rootScope.employeeDetails.Email1],    // To

         null,                    // CC

         null,                    // BCC

         false,                   // isHTML

         null,                    // Attachments

         null);                   // Attachment Data
      }
    }
})
