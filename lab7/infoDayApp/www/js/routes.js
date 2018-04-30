angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabController.home', {
        url: '/page2',
        views: {
          'tab1': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('tabController.events', {
        url: '/page3',
        views: {
          'tab2': {
            templateUrl: 'templates/events.html',
            controller: 'eventsCtrl'
          }
        }
      })

      .state('tabController.map', {
        url: '/page4',
        views: {
          'tab3': {
            templateUrl: 'templates/map.html',
            controller: 'mapCtrl'
          }
        }
      })

      .state('tabController', {
        url: '/page1',
        templateUrl: 'templates/tabController.html',
        abstract: true
      })

      .state('aboutUs', {
        url: '/page5',
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'
      })

      .state('contactUs', {
        url: '/page6',
        templateUrl: 'templates/contactUs.html',
        controller: 'contactUsCtrl'
      })

      .state('tabController.eventDetails', {
        url: '/page7/:id',
        views: {
          'tab2': {
            templateUrl: 'templates/eventDetails.html',
            controller: 'eventDetailsCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/page1/page2')


  });
