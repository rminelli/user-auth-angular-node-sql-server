_authModule.controller('loginController', function ($scope, $http) {

    $scope.doLogin = async function (userData) {
        $scope.loading = true
        let _userName = userData.userName
        let _userPassword = userData.userPassword
        console.log(`User name: ${_userName} - User password: ${_userPassword}`)

        $http.post('http://localhost:5500', userData).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

});