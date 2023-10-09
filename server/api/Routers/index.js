const { v4: uuidv4 } = require('uuid');

// API - Router
const express = require('express');
const router = express.Router();


// Response Object
const RESPONSE = {
    Title: "User",
    status: null,
    message: null,
    data: null
}
// DB Connection - York_project_DB
const { yorkprojectConnection } = require('../app.config');
// Query Actions
bling_actionz = function (statement) {
    const bling = new Promise(function (resolve, reject) {
        yorkprojectConnection.connect(function (error, client, release) {
            if (error) { resolve(error); }
            else if (client) {
                client.query(statement)
                    .then(data => { resolve(data); })
                    .catch(error => { reject(error); })
                    .finally(() => { release(); })
            }
        });
    }); return bling;
};

// Add User
  router.post('/addUser', function(req, res) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Add User";
    let payLoad = {
        user_id: uuidv4(),
        user_name: req.body.userInfo.name,
        user_email: req.body.userInfo.email,
        User_password: req.body.userInfo.password
    }
    async function FIRE() {
        // PayLoads
        let collect_results = new Array();
        let statementQ = `INSERT INTO Users.userInfo (user_id, user_name, user_pwd, user_email) VALUES ('${payLoad.user_id}', '${payLoad.user_name}', '${payLoad.User_password}', '${payLoad.user_email}');`
        try {
            await bling_actionz(statementQ).then(res => {collect_results.push(res)});
            User_Response.message = `Good`;
            User_Response.status = true;
            User_Response.data = collect_results;
            console.log("GOOOOOD");
        } catch (errr) {
            User_Response.message = `Error fetching`;
            User_Response.status = false;
            User_Response.data = errr;
            console.log("BAD: ", JSON.stringify(errr));
        } finally {
            res.send(User_Response);
        }
    } FIRE();
  });

// Login
router.post('/login', function(req, res) {
    let User_Response = Object.create(RESPONSE);
    User_Response.Title = "Login User";
    let payLoad = {
        user_email: req.body.userInfo.username,
        User_password: req.body.userInfo.password
    }
    async function FIRE() {
        // PayLoads
        let collect_results = new Array();
        let statementQ = `SELECT * FROM Users.userInfo WHERE user_pwd = '${payLoad.User_password}' AND user_email = '${payLoad.user_email}' LIMIT 1;`
        try {
            await bling_actionz(statementQ).then(res => {collect_results.push(res)});
            User_Response.message = `Good`;
            User_Response.status = true;
            User_Response.data = collect_results;
            console.log("Good");
        } catch (errr) {
            User_Response.message = `Error fetching`;
            User_Response.status = false;
            User_Response.data = errr;
            console.log("BAD: ", JSON.stringify(errr));
        } finally {
            res.send(User_Response);
        }
    } FIRE();
  });


// Add vehicle status
router.post('/Addvehicle', function(req, res) {
 //  console.log("REQ:userInfo " + JSON.stringify(req.body.userInfo));
 //  console.log("REQ:questions " + JSON.stringify(req.body.questions));
 //  console.log("REQ:vechicleInfo " + JSON.stringify(req.body.vechicleInfo));

   let User_Response = Object.create(RESPONSE);
   User_Response.Title = "vehicle Status";
   let payLoad = {
    vehicleID: req.body.vechicleInfo.vechicle,
    vehicleOdometer: req.body.vechicleInfo.odometer,
    vehicleOperator: req.body.vechicleInfo.operator,
    vehicleDate: req.body.vechicleInfo.date,
    vehicleState: JSON.stringify(req.body.questions),
   }

   async function FIRE() {
        // PayLoads
        let collect_results = new Array();
        let statementQ = `INSERT INTO vehicle.vehicleInfo (vehicleid, vehicleodometer, vehicleoperator, vehicledate, vehiclestate) VALUES ('${payLoad.vehicleID}', '${payLoad.vehicleOdometer}', '${payLoad.vehicleOperator}', '${payLoad.vehicleDate}', '${payLoad.vehicleState}');`
        try {
            await bling_actionz(statementQ).then(res => {collect_results.push(res)});
            User_Response.message = `Good`;
            User_Response.status = true;
            User_Response.data = collect_results;
            console.log("GOOOOOD");
        } catch (errr) {
            User_Response.message = `Error fetching`;
            User_Response.status = false;
            User_Response.data = errr;
            console.log("BAD: ", JSON.stringify(errr));
        } finally {
            res.send(User_Response);
        }
    } FIRE();

  });

    // view vehicle status
    router.post('/viewvehicle', function(req, res) {

        let User_Response = Object.create(RESPONSE);
        User_Response.Title = "vehicle Status";
        async function FIRE() {
             // PayLoads
             let collect_results = new Array();
             let statementQ = `SELECT * FROM vehicle.vehicleInfo`
             try {
                 await bling_actionz(statementQ).then(res => {collect_results.push(res)});
                 User_Response.message = `Good`;
                 User_Response.status = true;
                 User_Response.data = collect_results;
                 console.log("GOOOOOD");
             } catch (errr) {
                 User_Response.message = `Error fetching`;
                 User_Response.status = false;
                 User_Response.data = errr;
                 console.log("BAD: ", JSON.stringify(errr));
             } finally {
                 res.send(User_Response);
             }
         } FIRE();
     });







// Export 
module.exports = router;