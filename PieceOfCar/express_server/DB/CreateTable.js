const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const SQL = require('./db');
const sql = require("./db");
const csv=require('csvtojson');

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



///////////////////////////////////createTable////////////////////////////////////////////////////////
const createTableUploads = (req, res, next) => {
  const query = "CREATE TABLE Uploads (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, car varchar(255) NOT NULL, year varchar(255) NOT NULL, itemtype varchar(255) NOT NULL, area varchar(255) NOT NULL, price varchar(255) NOT NULL, seller varchar(255) NOT NULL, buyer varchar(255) NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('Uploads table created');
    next();
  });
};

const createTableUpdateDetails = (req, res, next) => {
  const query = "CREATE TABLE UpdateDetails (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, password varchar(255) NOT NULL, phone varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('UpdateDetails table created');
    next();
  });
};

const createTableContacts = (req, res, next) => {
  const query = "CREATE TABLE Contacts (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, phone varchar(255) NOT NULL, email varchar(255) NOT NULL, description varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('Contacts table created');
    next();
  });
};

const createTableRegistrations = (req, res, next) => {
  const query = "CREATE TABLE Registrations (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, phone varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('Registrations table created');
    next();
  });
};

const createTableConnections = (req, res, next) => {
  const query = "CREATE TABLE Connections (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(255) NOT NULL, password varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('Connections table created');
    next();
  });
};

const createTableBoughtItems = (req, res, next) => {
  const query = "CREATE TABLE BoughtItems (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, car varchar(255) NOT NULL, year varchar(255) NOT NULL, itemtype varchar(255) NOT NULL, area varchar(255) NOT NULL, price varchar(255) NOT NULL, seller varchar(255) NOT NULL, buyer varchar(255) NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error:", err);
      req.tableCreationError = err;
      next();
      return;
    }
    console.log('BoughtItems table created');
    next();
  });
};

///////////////////////////////////InsertData////////////////////////////////////////////////////////


const InsertData_Uploads = (req, res, next) => {
  const Q2 = "INSERT INTO Uploads SET ?";
  const csvFilePath = path.join(__dirname, "Data_Uploads.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
          car: element.car,
          year: element.year,
          itemtype: element.itemtype,
          area: element.area,
          price: element.price,
          seller: element.seller,
          buyer: element.buyer,
        };
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                res.render('CrushView',{GetMsg: "There was a problem adding a new climb record "+err});
                return;
            }
            console.log("created row sucssefuly ");
        });
    });
 });
 };


const InsertData_Registrations = (req, res, next) => {
  const Q2 = "INSERT INTO Registrations SET ?";
  const csvFilePath = path.join(__dirname, "Data_Registrations.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
          name: element.name,
          phone: element.phone,
          email: element.email,
          password: element.password,
        };
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                res.render('CrushView',{GetMsg: "There was a problem adding a new climb record "+err});
                return;
            }
            console.log("created row sucssefuly ");
        });
    });
 });
 };
const InsertData_BoughtItems = (req, res, next) => {
  const Q2 = "INSERT INTO BoughtItems SET ?";
  const csvFilePath = path.join(__dirname, "Data_BoughtItems.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
          car: element.car,
          year: element.year,
          itemtype: element.itemtype,
          area: element.area,
          price: element.price,
          seller: element.seller,
          buyer: element.buyer,
        };
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                res.render('CrushView',{GetMsg: "There was a problem adding a new climb record "+err});
                return;
            }
            console.log("created row sucssefuly ");
        });
    });
 });
 };



const createTables = async (req, res, next) => {
  try {
    await createTableUploads(req, res, next);
    await createTableUpdateDetails(req, res, next);
    await createTableContacts(req, res, next);
    await createTableRegistrations(req, res, next);
    await createTableConnections(req, res, next);
    await createTableBoughtItems(req, res, next);
    await InsertData_Uploads(req, res, next);
    await InsertData_Registrations(req, res, next);
    await InsertData_BoughtItems(req, res, next);


    res.render('TablesCreated', { status: 'success', message: "All tables created successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.render('TablesCreated', { status: 'error', message: "There was a problem creating the tables: " + error });
  }
};





module.exports = {
  createTables,

};