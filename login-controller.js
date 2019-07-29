_authModule.controller('loginController', function ($scope, $http) {

    $scope.doLogin = async function (userData) {
        $scope.loading = true
        $http.post('http://localhost:5510/do-login', userData).then(function (response) { // Promisse do-login
            $scope.authResponse = response.data
            $scope.loading = false
            console.log(response.data)
        }).catch(function (error) {
            $scope.loading = false
            console.log(error)
        })
    }

});