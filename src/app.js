const path = require("path");
const express = require("express");
const  hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

console.log(__dirname);
console.log(path.join(__dirname, "../public"));
// console.log(__filename);


//expressjs.com
const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


/////// Setup handlebars engine 
// setting HBS (handlebars) engine to create dynamic hbs pages
app.set('view engine', 'hbs')
// change default views directory from "views" to "templates"
app.set('views', viewsPath)
// set the partials path
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index",{
    title:'Weather App',
    name:'Barak Fihser'
  });
});

app.get("/about", (req, res) => {
  res.render("about",{
    title:'About',
    name:'Barak Fihser'
  });
});

app.get("/help", (req, res) => {
  res.render("help",{
    title:'Help',
    name:'Barak Fihser'
  });
});

app.get("/weather", (req, res) => {
  const {address} = req.query;
  if(!address){
    return res.send('You must provide an address')
  }
    geocode(`${address}.json`, (err, {lat,lon,location}={}) => {
        if (err) {
          return res.send(err);
        }
        const latLonStr = `${lat},${lon}`;
        forcast(latLonStr, (err, forcastData) => {
            if(err){
                return res.send(err);
            }
          return res.send([
            {
              forcastData,
              location,
              address
            },
          ]);

        });
      });



});


app.get("/products", (req, res) => {
  
   const {search} = req.query;
   if(!search){
     return res.send({
       error:'You must prive search term'
     })
   }
     res.send({
       products:[]
     })
  
})

// 404 pages
app.get("/help/*",(req,res)=>{
  res.render("404",{title:"help 404 page"})
  })
app.get("*",(req,res)=>{
res.render("404",{
  title:"404",
  errorMsg:"Page Not Found",

})
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
