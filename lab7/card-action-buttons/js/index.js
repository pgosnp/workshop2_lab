angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

  .controller('AppCtrl', function ($scope, $http, Mottos) { // for logic
    // $scope.imagePath = 'img/washedout.png';
    // var events = [{
    //     name: "Keynote Speech",
    //     fullDes: "Keynote speakers included Prof. Rikiya Abe, The University of Tokyo, and Dr. Alice Siu, Center for Deliberative Democracy at Stanford University, and other speakers included scholars and practitioners from North America, Europe, and other parts of Asia, including Hong Kong. About 50 people from utility companies, businesses, academia, NGOs, consulates, consultants, and HKBU and other local universities participated in various sessions of the Conference.",
    //     image: "http://sosc.hkbu.edu.hk/sites/default/files/news/AESC-keynote.jpg",
    //     id: 1,
    //   },
    //   {
    //     name: "Science Faculty Admission Talk",
    //     fullDes: "There was a featured talk on 'Navigate JUPAS admissions, explore HKBU programmes' delivered by Dr. Esther Ho, Chairperson of the Hong Kong Association of Careers Masters and Guidance Masters; Dr. So Kwok-sang, Academic Registrar; and representatives from each Faculty/School/Academy.",
    //     image: "http://www.sci.hkbu.edu.hk/attachment/news/2012-11/2012-11-01/news.jpg",
    //     id: 2,
    //   }
    // ];

    $http.get("https://api.myjson.com/bins/3num0")
      .then(function (response) {
        console.log(response.data);
        $scope.events = response.data;
      });

    // $scope.events = events;

    $scope.like = function (event) {

      if (event.target.style.fill == "red") {
        event.target.style.fill = "";
      } else {
        event.target.style.fill = "red";
      }

    }

    $scope.action1 = function () {

      $scope.message = $scope.message.toUpperCase();

    }

    $scope.action2 = function () {

      $scope.message = Mottos.getNextMotto();

    }

  }).service('Mottos', function () { // for data

    const mottos = [
      "A faithful friend is hard to find.",
      "A friend in need in a friend indeed.",
      "Two heads are better than one."
    ];

    var counter = -1;

    this.getNextMotto = function () {

      counter++;

      if (counter == mottos.length) counter = 0;

      return mottos[counter];
    }

  });


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/