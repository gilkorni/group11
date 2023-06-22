//Validate requestconst sql = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const sql = require('./db');


    const NewSearch = (req, res) => {

  // Retrieve the search parameters from the request body
  const { car, year, itemtype, area } = req.body;

  // Construct the base SQL query
  let query = 'SELECT * FROM Uploads';

  // Construct the WHERE clause based on the provided parameters
  const conditions = [];
  const values = [];

  if (car) {
    conditions.push('car = ?');
    values.push(car);
  }

  if (year) {
    conditions.push('year = ?');
    values.push(year);
  }

  if (itemtype) {
    conditions.push('itemtype = ?');
    values.push(itemtype);
  }

  if (area) {
    conditions.push('area = ?');
    values.push(area);
  }

  // Append the WHERE clause if conditions are provided
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Execute the SQL query with the search parameters
  sql.query(query, values, (err, results) => {
    if (err) {
      console.log('Error fetching search results:', err);
      console.log('Query:', query);
      console.log('Values:', values);
      res.status(500).json({ error: 'Failed to fetch search results' });
    } else {
      res.render('Search', { data: results });
    }
  });
};


    const NewsubmitOffer = (req, res) => {

    const itemId = req.body.itemId;
    const offer = parseFloat(req.body.offer);
    const user = req.cookies?.SignedUser;

  // Retrieve the current price of the item
    const getPriceQuery = 'SELECT price FROM Uploads WHERE id = ?';
    sql.query(getPriceQuery, [itemId], function (error, results, fields) {
      if (error) {
        console.log('Error retrieving item price:', error);
        res.status(500).send('Error retrieving item price');
       } else {
      // Check if the offer is lower than the current price
         const currentPrice = parseFloat(results[0].price);
        if (offer < currentPrice) {
          console.log('offer:', offer, '< current price:', currentPrice);
        // res.render('Search', { error: 'Your offer is lower than the current price.' });
          res.redirect('/Search');
        } else {
        // Update the price in the database
          const updatePriceQuery = 'UPDATE Uploads SET price = ?, buyer = ? WHERE id = ?';
          sql.query(updatePriceQuery, [offer,user, itemId], function (error, results, fields) {
            if (error) {
             console.log('Error updating price:', error);
              res.status(500).send('Error updating price');
            } else {
              console.log('Price updated successfully');
              res.redirect('/Search'); // Redirect to the desired page after the update
           }
        });
      }
    }
  });
};


    const Newsellitem = (req, res) => {
          const idToDelete = req.body.id;
          const values0 = [idToDelete];
          const { car, year, itemtype, area, seller, buyer, price } = req.body;
          const values = { car, year, itemtype, area, seller, buyer, price };
          const query1 = "INSERT INTO BoughtItems SET ?";
          const query2 = 'DELETE FROM Uploads WHERE id = ?';

          sql.query(query1, values, (err, mysqlres) => {
            if (err) {
              console.log("Error:", err);
              res.status(400).send({ message: "Error in creating upload: " + err });
              return;
            }
          });

          // Execute the SQL query with the ID parameter
          sql.query(query2, values0, (err, mresults) => {
            if (err) {
              console.log('Error deleting item:', err);
              res.status(500).json({ error: 'Failed to delete item' });
            } else {
              // Handle successful deletion
              console.log('Item deleted successfully');
              res.redirect('/myItems'); // Redirect to the MyItems page or the desired destination
            }
          });
    }


      const MyItems =(req,res)=>{
             // Retrieve the user from the cookie
      const user = req.cookies?.SignedUser;

      // Construct the SQL query with the user as a filter
      const query = 'SELECT * FROM Uploads WHERE seller = ?';
      const values = [user];

      // Execute the SQL query with the filter
      sql.query(query, values, (err, results) => {
        if (err) {
          console.log('Error fetching search results:', err);
          res.status(500).json({ error: 'Failed to fetch search results' });
        } else {
          // Pass the fetched data to the 'MyItems' view
          res.render('MyItems', { data: results });
        }
      });
    }


    // getting the dropdowns
      const dropdownvalues1 =(req,res)=>{
        const query = 'SELECT distinct car FROM Uploads';
        sql.query(query, (err, results) => {
          if (err) {
            console.log('Error fetching dropdown values:', err);
            res.status(500).json({ error: 'Failed to fetch dropdown values' });
          } else {
            const dropdownValues = results.map((row) => row.car);
            res.json({ values: dropdownValues });
          }
        });
    }

      const dropdownvalues2 =(req,res)=>{
        const query = 'SELECT distinct area FROM Uploads';
        sql.query(query, (err, results) => {
          if (err) {
            console.log('Error fetching dropdown values:', err);
            res.status(500).json({ error: 'Failed to fetch dropdown values' });
          } else {
            const dropdownValues = results.map((row) => row.area);
            res.json({ values: dropdownValues });
          }
        });
    }

      const dropdownvalues3 =(req,res)=>{

        const query = 'SELECT distinct itemtype FROM Uploads';
        sql.query(query, (err, results) => {
          if (err) {
            console.log('Error fetching dropdown values:', err);
            res.status(500).json({ error: 'Failed to fetch dropdown values' });
          } else {
            const dropdownValues = results.map((row) => row.itemtype);
            res.json({ values: dropdownValues });
          }
        });
    }

    const BoughtItems =(req,res)=>{
        // Retrieve the user from the cookie
      const user = req.cookies?.SignedUser;

      // Construct the SQL query with the user as a filter

      const query = 'SELECT * FROM BoughtItems WHERE buyer = ?';
      const values = [user];

      // Execute the SQL query with the filter
      sql.query(query, values, (err, results) => {
        if (err) {
          console.log('Error fetching search results:', err);
          res.status(500).json({ error: 'Failed to fetch search results' });
        } else {
          // Pass the fetched data to the 'MyItems' view
          res.render('BoughtItems', { data: results });
        }
      });
    }

   const SoldItems =(req,res)=>{
          // Retrieve the user from the cookie
      const user = req.cookies?.SignedUser;

      // Construct the SQL query with the user as a filter

      const query = 'SELECT * FROM BoughtItems WHERE seller = ?';
      const values = [user];

      // Execute the SQL query with the filter
      sql.query(query, values, (err, results) => {
        if (err) {
          console.log('Error fetching search results:', err);
          res.status(500).json({ error: 'Failed to fetch search results' });
        } else {
          // Pass the fetched data to the 'MyItems' view
          res.render('SoldItems', { data: results });
        }
      });
    }


   const Search =(req,res)=>{
      const Q1 = 'select * from Uploads';
      sql.query(Q1, (err, results)=>{
          if(err) throw err;
          res.render('Search', {data:results})
      })
    }


module.exports = {
    NewSearch,
  NewsubmitOffer,
    Newsellitem,
    MyItems,
    dropdownvalues1,
    dropdownvalues2,
    dropdownvalues3,
    BoughtItems,
    SoldItems,
    Search
};