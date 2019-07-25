_authModule.controller('loginController', function ($scope) {

    $scope.doLogin = async function(userData){
        $scope.loading = true
        console.log(userData)
    }

    
    
});