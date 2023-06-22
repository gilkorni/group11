const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const sql = require('./db');



app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const InsertData_Uploads = (req, res, next) => {
  const Q2 = "INSERT INTO Uploads SET ?";
  const csvFilePath = path.join(__dirname, "Data_Uploads.csv");

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);

      const insertPromises = jsonObj.map((element) => {
        const NewEntry = {
          car: element.car,
          year: element.year,
          itemtype: element.itemtype,
          area: element.area,
          price: element.price,
          seller: element.seller,
          buyer: element.buyer,
        };

        return new Promise((resolve, reject) => {
          SQL.query(Q2, NewEntry, (err, mysqlres) => {
            if (err) {
              console.log("Error in inserting data", err);
              reject(err);
              return;
            }

            console.log("Created row in Uploads table successfully");
            resolve();
          });
        });
      });

      Promise.all(insertPromises)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log("Error in inserting data", error);
          req.insertDataError = error;
          next();
        });
    })
    .catch((error) => {
      console.log("Error reading CSV file", error);
      req.insertDataError = error;
      next();
    });
};

const InsertData_Registrations = (req, res, next) => {
  const Q2 = "INSERT INTO Registrations SET ?";
  const csvFilePath = path.join(__dirname, "Data_Registrations.csv");

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);

      const insertPromises = jsonObj.map((element) => {
        const NewEntry = {
          name: element.name,
          phone: element.phone,
          email: element.email,
          password: element.password,
        };

        return new Promise((resolve, reject) => {
          SQL.query(Q2, NewEntry, (err, mysqlres) => {
            if (err) {
              console.log("Error in inserting data", err);
              reject(err);
              return;
            }

            console.log("Created row in Registrations table successfully");
            resolve();
          });
        });
      });

      Promise.all(insertPromises)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log("Error in inserting data", error);
          req.insertDataError = error;
          next();
        });
    })
    .catch((error) => {
      console.log("Error reading CSV file", error);
      req.insertDataError = error;
      next();
    });
};

const InsertData_BoughtItems = (req, res, next) => {
  const Q2 = "INSERT INTO BoughtItems SET ?";
  const csvFilePath = path.join(__dirname, "Data_BoughtItems.csv");

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);

      const insertPromises = jsonObj.map((element) => {
        const NewEntry = {
          car: element.car,
          year: element.year,
          itemtype: element.itemtype,
          area: element.area,
          price: element.price,
          seller: element.seller,
          buyer: element.buyer,
        };

        return new Promise((resolve, reject) => {
          SQL.query(Q2, NewEntry, (err, mysqlres) => {
            if (err) {
              console.log("Error in inserting data", err);
              reject(err);
              return;
            }

            console.log("Created row in BoughtItems table successfully");
            resolve();
          });
        });
      });

      Promise.all(insertPromises)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log("Error in inserting data", error);
          req.insertDataError = error;
          next();
        });
    })
    .catch((error) => {
      console.log("Error reading CSV file", error);
      req.insertDataError = error;
      next();
    });
};

module.exports = {

};