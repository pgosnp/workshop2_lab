angular.module('app.controllers', [])

  .controller('ladiesItemsCtrl', ['$scope', '$stateParams', 'Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, Store) {
      $scope.items = Store.getLadiesItems();
      $scope.department = "Ladies Items";
    }
  ])

  .controller('menItemsCtrl', ['$scope', '$stateParams', 'Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, Store) {
      $scope.items = Store.getMenItems();
      $scope.department = "Men items";

    }
  ])

  .controller('myCartCtrl', ['$scope', '$stateParams', 'Store', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, Store, $state, $http) {

      $scope.$on("$ionicView.beforeEnter", function () {

        var items = Store.getSelected();

        var sum = 0;

        items.forEach(function (item) {

          sum += item.quantity * item.price;

        });

        $scope.items = items;
        $scope.total = sum;

      });

      $scope.emptyCart = function () {

        Store.clearSelected();

        $state.go($state.current, {}, {
          reload: true
        });

      }

      $scope.placeOrder = function () {

        $http.post('https://httpbin.org/post', Store.getSelected())
          .then(function (response) {
            console.log(response.data);
          });

      }

    }
  ])

  .controller('itemDetailsCtrl', ['$scope', '$stateParams', 'Store', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, Store, $ionicHistory) {

      $scope.item = Store.getItem($stateParams.id);

      $scope.data = {};

      $scope.data.quantity = $scope.item.quantity;
      $scope.data.showAdd = $stateParams.showAdd;

      $scope.addCartItem = function () {

        $scope.item.quantity = $scope.data.quantity;
        $ionicHistory.goBack();

      }

      $scope.updateCartItem = function () {

        $scope.item.quantity = $scope.data.quantity;
        $ionicHistory.goBack();

      }

      $scope.removeCartItem = function () {

        $scope.item.quantity = 0;
        $ionicHistory.goBack();

      }


    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicHistory', '$ionicPopup','Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $ionicHistory, $ionicPopup,Store) {

      $scope.data = {};

      $scope.login = function () {

        // $http.post("https://httpbin.org/post", $scope.data)
        //   .then(function (response) {
        //     console.log(response.data);
        //     $ionicHistory.goBack();
        //   });
        $http.post("http://localhost:1337/user/login", $scope.data)
          .then(function (response) {

            if (response.data == "login successfully.") {

              console.log("granted");
              Store.setLogin(true);
              $ionicHistory.goBack();

            } else {
              var alertPopup = $ionicPopup.alert({
                title: response.data,
                template: 'Login failed. Please try again.'
              });
            }

          });
      }

    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])
