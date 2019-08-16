/* eslint-disable func-names */
/* eslint-disable no-undef */

_authModule.controller('loginController', ($scope, $http) => {
  $scope.doLogin = async function (userData) {
    $scope.loading = true;
    $http.post('http://localhost:5510/do-login', userData).then((response) => {
      $scope.authResponse = response.data;
      $scope.loading = false;
      console.log(response.data);
    }).catch((error) => {
      $scope.loading = false;
      console.log(error);
    });
  };
});
