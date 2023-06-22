const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
const sql = require('./DB/db'); //connect to DB
const  CRUD =require('./DB/CRUD')
const  dropTable =require('./DB/dropTable')
const  CreateTable =require('./DB/CreateTable')


const functions =require('./DB/functions')
const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "static"))); //find the statics
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"views/index.html" ));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,"views/contact.html" ));
});

app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname,"views/Home.html" ));
});

app.get('/uploadItem', (req, res) => {
    res.sendFile(path.join(__dirname,"views/uploadItem.html" ));
});

app.get('/UpdateDetails', (req, res) => {
    res.sendFile(path.join(__dirname,"views/UpdateDetails.html" ));
});

app.get('/signOut', (req,res)=>{ //to delete the SignedUser Cookie
    res.clearCookie('SignedUser');
    res.redirect('/');
});

app.get("/MyItems", functions.MyItems);
app.get("/BoughtItems", functions.BoughtItems);
app.get("/SoldItems", functions.SoldItems);
app.get("/Search", functions.Search);
app.get("/dropdown-values1", functions.dropdownvalues1);
app.get("/dropdown-values2", functions.dropdownvalues2);
app.get("/dropdown-values3", functions.dropdownvalues3);


app.post('/uploadItem', CRUD.CreateNewUpload);
app.post('/UpdateDetails', CRUD.NewUpdateDetails);
app.post('/contact', CRUD.Createcontact);
app.post('/Registration', CRUD.NewRegistration);
app.post('/Search', functions.NewSearch);
app.post('/submitOffer', functions.NewsubmitOffer);
app.post('/delete', CRUD.deleteItem);
app.post('/sellitem', functions.Newsellitem);
app.post('/login', CRUD.Newlogin);


//app.get("/dropTable", dropTable.dropATable);
// Route for dropping tables
app.get("/DropTables", dropTable.dropTables);

app.get("/CreateTables", CreateTable.createTables);

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
