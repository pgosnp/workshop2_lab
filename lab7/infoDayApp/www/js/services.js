angular.module('app.services', []).service('Events', function () {

    var events = [{
        title: "Keynote Speech",
        fullDes: "Keynote speakers included Prof. Rikiya Abe, The University of Tokyo, and Dr. Alice Siu, Center for Deliberative Democracy at Stanford University, and other speakers included scholars and practitioners from North America, Europe, and other parts of Asia, including Hong Kong. About 50 people from utility companies, businesses, academia, NGOs, consulates, consultants, and HKBU and other local universities participated in various sessions of the Conference.",
        avatar: "http://www.hknotebook.com/np17/hkbu/img/u_hkbu/256x256.png",
        image: "http://sosc.hkbu.edu.hk/sites/default/files/news/AESC-keynote.jpg",
        id: 1
      },
      {
        title: "Science Faculty Admission Talk",
        fullDes: "There was a featured talk on -- Navigate JUPAS admissions, explore HKBU programmes -- delivered by Dr. Esther Ho, Chairperson of the Hong Kong Association of Careers Masters and Guidance Masters; Dr. So Kwok-sang, Academic Registrar; and representatives from each Faculty/School/Academy.",
        avatar: "http://a5.mzstatic.com/eu/r30/Purple/v4/a2/5d/c3/a25dc3d6-78f3-5b54-92a0-b1e3ccfd9227/icon175x175.png",
        image: "http://www.sci.hkbu.edu.hk/attachment/news/2012-11/2012-11-01/news.jpg",
        id: 2
      }
    ];

    this.getAllEvents = function () {
      return events;
    };

    this.getThisEvent = function (id) {
      return events[id - 1];
    };

  })

  .factory('BlankFactory', [function () {

  }])

  .service('BlankService', [function () {

  }]);
