//Validate requestconst sql = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const sql = require('./db');


// for uploading a new piece of car
    const CreateNewUpload = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const user = req.cookies?.SignedUser;

  const newUpload = {
    car: req.body.car,
    year: req.body.year,
    itemtype: req.body.itemtype,
    area: req.body.area,
    seller: user,
    buyer: ' ',
    price: req.body.price
  };

  const query = "INSERT INTO Uploads SET ?";

  sql.query(query, newUpload, (err, mysqlres) => {
    if (err) {
      console.log("Error:", err);
      res.status(400).send({ message: "Error in creating upload: " + err });
      return;
    }

    console.log("Created Upload:", { id: mysqlres.insertId, ...newUpload });

    res.sendFile(path.join(__dirname, '../views/Home.html'));
  });
};


// for updating details page
    const NewUpdateDetails = (req, res) => {
  const sql = require("./db");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = req.cookies?.SignedUser;

  if (!user) {
    res.status(400).send({
      message: "User not found!",
    });
    return;
  }

  const NewUpdate = {
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    email: user,
  };

  const Q1 = "UPDATE Registrations SET name = ? WHERE email = ?";
  const Q2 = "UPDATE Registrations SET phone = ? WHERE email = ?";
  const Q3 = "UPDATE Registrations SET password = ? WHERE email = ?";

if(req.body.name !== ''){
     sql.query(Q1, [NewUpdate.name, NewUpdate.email], (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "Error in updating account: " + err });
      return;
    }
  });
}
if(req.body.phone !== ''){
     sql.query(Q2, [ NewUpdate.phone, NewUpdate.email], (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "Error in updating account: " + err });
      return;
    }
  });
}
if(req.body.password !== ''){
     sql.query(Q3, [ NewUpdate.password, NewUpdate.email], (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "Error in updating account: " + err });
      return;
    }
  });
}
     res.sendFile(path.join(__dirname, "../views/Home.html")); // Go to home page after successful update
};


    const NewRegistration =(req,res)=>{
     res.cookie('SignedUser', req.body.email); ///add a SignedUser cookie
    console.log('Cookies: ', req.body.email);///print to console SignedUser cookie
    const sql = require("./db");
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
 const Registr = {
    "name": req.body.name,
    "phone": req.body.phone,
    "password": req.body.password,
    "email": req.body.email,
  };
    const Q3="insert into Registrations set ?"
    sql.query(Q3, Registr, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating Search: " + err});
            return;
        }
        console.log("created account: ", { id: mysqlres.insertId, ...Registr });
       res.sendfile(path.join(__dirname,'../views/Home.html')); //end of upload go to home page
        return;
        })
};

    const Newlogin = (req, res) => {
    res.cookie('SignedUser', req.body.email); ///add a SignedUser cookie
    console.log('Cookies: ', req.body.email);///print to console SignedUser cookie
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  checkUserExists(email, password, (err, userExists) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "Error in checking user existence: " + err });
      return;
    }

    if (userExists) {
      console.log("User exists");
      res.sendFile(path.join(__dirname, '../views/Home.html')); // Redirect to home page
    }
    else {
      console.log("User does not exist or incorrect password");
      // alert("Incorrect password. Please try again.");

      // Display a pop-up message indicating incorrect password
      const script = `
        <script>
          alert("Incorrect password. Please try again.");
          window.location.href = "/"; // Refresh the login page
        </script>
      `;
      res.send(script);
    }
  });
};

    const checkUserExists = (email, password, callback) => {
  const query = "SELECT * FROM Registrations WHERE email = ? AND password = ?";
  sql.query(query, [email, password], (err, rows) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }

    if (rows.length) {
      callback(null, true); // User exists
    } else {
      callback(null, false); // User does not exist
    }
  });
};

    const Createcontact =(req,res)=>{
    const sql = require("./db");
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
 const Newontact = {
    "name": req.body.name,
    "phone": req.body.phone,
    "email": req.body.email,
    "description": req.body.description,
  };
    const Q3="insert into Contacts set ?"
    sql.query(Q3, Newontact, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating Search: " + err});
            return;
        }
        console.log("created Search: ", { id: mysqlres.insertId, ...Newontact });
       res.sendfile(path.join(__dirname,'../views/Home.html')); //end of upload go to home page
        return;
        })
};

    const deleteItem =(req,res)=>{
      // Retrieve the ID to delete from the request body
      const idToDelete = req.body.id;

      // Construct the SQL query with the ID parameter
      const query = 'DELETE FROM Uploads WHERE id = ?';
      const values = [idToDelete];

      // Execute the SQL query with the ID parameter
      sql.query(query, values, (err, results) => {
        if (err) {
          console.log('Error deleting item:', err);
          res.status(500).json({ error: 'Failed to delete item' });
        } else {
          // Handle successful deletion
          console.log('Item deleted successfully');
          res.redirect('/myItems'); // Redirect to the MyItems page or the desired destination
        }
      });
    };







module.exports = {
  CreateNewUpload,
    Createcontact,
  NewUpdateDetails,
    NewRegistration,
    Newlogin,
    deleteItem,
};