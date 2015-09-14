angular.module('starter')

// .controller('AppCtrl', function() {})
// .controller('LoginCtrl', function() {})
// .controller('DashCtrl', function() {});
  .controller('AppCtrl', function ($scope, $state, $ionicPopup, $ionicPopover, AuthService, AUTH_EVENTS) {
    
        $scope.toggleMenu = function() {
        $scope.sideMenuController.toggleLeft();
    }
    
    $scope.username = AuthService.username();

    $scope.logout = function () {
      AuthService.logout();
      $state.go('login');
    };

    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
      var alertPopup = $ionicPopup.alert({
        title: 'Unauthorized!',
        template: 'You are not allowed to access this resource.'
      });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
      AuthService.logout();
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });

    $scope.setCurrentUsername = function (name) {
      $scope.username = name;
    };

    $ionicPopover.fromTemplateUrl('templates/menu.html', {
      scope: $scope,
    }).then(function (popover) {
      $scope.popover = popover;
    });
  })

  .controller('LoginCtrl', function ($scope, $state, $ionicPopup, AuthService) {
    $scope.data = {};

    $scope.login = function (data) {
      AuthService.login(data.username, data.password).then(function (authenticated) {
        $state.go('main.dash', {}, { reload: true });
        $scope.setCurrentUsername(data.username);
      }, function (err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    };
  })

  .controller('DashCtrl', function ($scope, $state, $http, $ionicPopup, AuthService) {
    
    $scope.navTitle = 'Home Page';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

    $scope.performValidRequest = function () {
      $http.get('http://localhost:8100/valid').then(
        function (result) {
          $scope.response = result;
        });
    };

    $scope.performUnauthorizedRequest = function () {
      $http.get('http://localhost:8100/notauthorized').then(
        function (result) {
          // No result here..
        }, function (err) {
          $scope.response = err;
        });
    };

    $scope.performInvalidRequest = function () {
      $http.get('http://localhost:8100/notauthenticated').then(
        function (result) {
          // No result here..
        }, function (err) {
          $scope.response = err;
        });
    };

    $scope.performFingerprint = function () {
      new Fingerprint2().get(function (result) {
        $scope.response = result;
      });
    };
  });
