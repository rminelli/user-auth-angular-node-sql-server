_authModule.controller('loginController', function ($scope, $http) {

    $scope.doLogin = async function (userData) {
        $scope.loading = true
        $http.post('http://localhost:5510/do-login', userData).then(function (response) { // Promisse
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

});