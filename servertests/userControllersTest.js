var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');
var UserController = require('../controllers/userControllers.js');

var dbURI = 'mongodb://localhost/mapstest';

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {
  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  beforeEach(function (done) {
    clearDB(function () {
        var users = [
          {
            username: 'lex',
            password: 'lexylex',
            pins: [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}}]
          },
          {
            username: 'Ian',
            password: 'Ianyian',
            pins: []
          },
          {
            username: 'Nikola',
            password: 'nikoaynik',
            pins: [{"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
          }
        ];
     
      User.create(users, done);
    })
  });

    it('should have a method that creates a new user record in the database', function (done) {
    // console.log('create user test')
    var query = {username: 'mark', password: 'mypassword', pins: [] }; 
  
    UserController.addUser(query, function(err, res) {
      expect(JSON.stringify(res)).to.equal(JSON.stringify(query));
    });

    done();
  });

   it('should have a method that deletes a user record in the database', function (done) {

    var newuser = {username: 'mark'}; 
    UserController.removeUser(newuser, function(err, res) {
      expect(res).to.equal(JSON.stringify({"ok":1,"n":0}));
    });
    done();

  });

  it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
  
    var userSearchObj = {username: 'lex'};
    UserController.findOne(userSearchObj, function(err, res) {
      expect(res.pins.timestamp).to.equal(1452391665585);
    });
    
    done();

  });

  xit('should have a method that given the name of a user, updates their `email` property', function (done) {
  
    // var username = 'Magee';
    // var oldemail = 'magee@magee.com';
    // var newemail = 'aaa@magee.com';

    // UserController.updateEmailByName(username, newemail, function(err, updatedUser) {
    //   expect(updatedUser.email).to.equal(newemail);
    // });

    // done();
  });

  xit('should have a method that reads all users from the database at once', function (done) {

    // UserController.getAll(function(err, res) {
    //   expect(res.length).to.equal(3);
    // });

    // done();
  });

});


// var dbURI = 'mongodb://localhost/mapstest';

// var clearDB = function (done) {
//   mongoose.connection.collections['users'].remove(done);
// };

// describe('User Ctrl: start and stop accounts.', function(){

//   before(function (done) {
//     if (mongoose.connection.db) {
//       return done();
//     }
//     mongoose.connect(dbURI, done);
//   });

//   console.log('before each')
//   beforeEach(function (done) {
//     clearDB(function () {

//     User.create([], done);
//   });

  
//   it('should have a method that creates a new user record in the database', function (done) {
//     // console.log('create user test')
//     var query = {username: 'mark', password: 'mypassword', pins: [] }; 
  
//     UserController.addUser(query, function(err, res) {
//       console.log('res....', res)
//       // expect(JSON.stringify(res)).to.equal(JSON.stringify(query));

//       var query = {username: 'mark'}
//       UserController.findOne(query, function(err, res) {
//         expect(res.password).to.equal('mypassword');
//       });

//     });

    

//     done();
//   });

//   xit('should have a method that deletes a user record in the database', function (done) {
//     // console.log('delete user test')
//     var newuser = {username: 'mark'}; 
//     console.log(newuser)
//     UserController.removeUser(newuser, function(err, res) {
//        expect(JSON.stringify(res)).to.equal(JSON.stringify(newuser));
//         console.log('444')
  
//     });

//     done();
//   });

// });

// // xdescribe('User Controller II', function () {

// //   describe('Pins Functionality:', function(){

// //       before(function (done) {
// //     if (mongoose.connection.db) {
// //       return done();
// //     }
// //     mongoose.connect(dbURI, done);
// //   });

// //   beforeEach(function (done) {
// //       clearDB(function () {

// //         var users = [
// //           {
// //             username: 'lex',
// //             password: 'lexylex',
// //             pins: []
// //           },
// //           {
// //             username: 'Ian',
// //             password: 'Ianyian',
// //             pins: []
// //           },
// //           {
// //             username: 'Nikola',
// //             password: 'nikoaynik',
// //             pins: []
// //           }
// //         ];

// //         User.create(users, done);
        
// //       });

// //   });

// //     // var newPin1 = {"lat":37.78650430839168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note": "meh could be better..."},"infoWindow":{"content":"<p>llllalala</p>"}};
// //     // var newPin2 = {"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}};

// //     it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
    
// //       var userSearchObj = {username: 'mark'}; 
// //       console.log(userSearchObj);

// //       UserController.findOne(userSearchObj, function(err, res) {
// //         expect(res[0].timestamp).to.equal(1452391665585);
// //         // expect(res[0].lat).to.equal(37.78696217255432);
// //       });
// //       done();
// //     });

// //     // xit('should have a method that given the name of a user, updates their pins, i.e., add a new breadcrumb', function (done) {

// //     //   var username = 'lex';

// //     //   UserController.updatePins({username: username}, newPin1, function(err, enteredPin) {
// //     //     expect(JSON.stringify(newPin1)).to.equal(JSON.stringify(enteredPin));
// //     //   });

// //     //   done();
// //     // });

// //     // xit('should have a method that deletes the most recent pin added', function (done) {

// //     //   var username = 'Ian';
// //     //   UserController.updatePins({username: username}, newPin1, function(err, updatedpin) {
// //     //     if (err) {
// //     //       return res.json({err: err});
// //     //     }
// //     //     res.json(updatedpin);
// //     //   });
// //     //   console.log('a')

// //     //   UserController.updatePins({username: username}, newPin2, function(err, updatedPin) {
// //     //     if (err) {
// //     //       return res.json({err: err});
// //     //     }
// //     //     res.json(updatedPin);
// //     //   });

// //     //   console.log('b')

// //     //   UserController.removeLastPin({username: username}, function(err, res) {
// //     //     if (err) {
// //     //       return res.json({err: err});
// //     //     }
// //     //     res.json(updatedPin);
// //     //   });


// //     //   UserController.findOne({username: username}, function(err, res) {
// //     //     expect(res.length).to.equal(1);
// //     //   });
  
// //     //   done();
// //     // });

// //   });

// // });
