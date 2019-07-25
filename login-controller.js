_authModule.controller('loginController', function ($scope, $http) {

    $scope.doLogin = async function (userData) {
        $scope.loading = true
        let _userName = userData.userName
        let _userPassword = userData.userPassword
        console.log(`User name: ${_userName} - User password: ${_userPassword}`)

        $http.post('http://127.0.0.1:5510/do-login', userData).then(function (response) { // Promisse
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

});