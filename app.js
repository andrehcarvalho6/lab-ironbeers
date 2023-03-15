const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response, next) => {
  punkAPI
    .getBeers()
    .then(beerArr => {
      const data = {
        beers: beerArr
      };
      response.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (request, response, next) => {
  punkAPI
    .getRandom()
    .then(beerArr => {
      const data = {
        randomBeer: beerArr
      };
      console.log(data);
      response.render('random-beer', data);
    })
    .catch(error => {
      console.log(error);
    });
});

//attemp to make iteration 6

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;
  // const beerIds = getObjectById(beerId);
  punkAPI
    .getBeer(beerId)
    .then(beerArr => {
      // const data = {
      //   beerClick: beerArr
      // };
      const [data] = beerArr;
      console.log(data);
      res.render('beerClick', data);
    })
    .catch(error => {
      console.log(error);
    });
});

//

app.listen(3000, () => console.log('🏃‍ on port 3000'));
