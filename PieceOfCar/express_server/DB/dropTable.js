const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const SQL = require('./db');




///////////////////////////////////dropTable////////////////////////////////////////////////////////


const dropTableUploads = (req, res, next) => {
  const query = "DROP TABLE IF EXISTS Uploads";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("Uploads table dropped");
    next();
  });
};



const dropTableUpdateDetails = (req, res, next) => {
  const query = "DROP TABLE  IF EXISTS UpdateDetails";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("UpdateDetails table dropped");
    next();
  });
};

const dropTableContacts = (req, res, next) => {
  const query = "DROP TABLE IF EXISTS Contacts";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("Contacts table dropped");
    next();
  });
};

const dropTableRegistrations = (req, res, next) => {
  const query = "DROP TABLE IF EXISTS Registrations";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("Registrations table dropped");
    next();
  });
};

const dropTableConnections = (req, res, next) => {
  const query = "DROP TABLE IF EXISTS Connections";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("Connections table dropped");
    next();
  });
};

const dropTableBoughtItems = (req, res, next) => {
  const query = "DROP TABLE IF EXISTS BoughtItems";
  SQL.query(query, (err, mySQLres) => {
    if (err) {
      console.log("Error in dropping table:", err);
      req.tableDropError = err;
      next();
      return;
    }
    console.log("BoughtItems table dropped");
    next();
  });
};

const dropTables = async (req, res, next) => {
  try {
    await dropTableUploads(req, res, next);
    await dropTableUpdateDetails(req, res, next);
    await dropTableContacts(req, res, next);
    await dropTableRegistrations(req, res, next);
    await dropTableConnections(req, res, next);
    await dropTableBoughtItems(req, res, next);
    res.render('TablesCreated', { status: 'success', message: "All tables dropped successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.render('TablesCreated', { status: 'error', message: "There was a problem dropping the tables: " + error });
  }
};


module.exports = {
  dropTables,
};