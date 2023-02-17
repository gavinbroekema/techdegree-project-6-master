const express = require('express');
const app = express();
const data = require('./data.json');

// Optionally - the path module which can be used when setting the absolute path in the express.static function.

app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.set('view engine', 'pug');

// use a static route and the express.static method to serve the static files located in the public folder
// app.use((res, req, next) => {
//     const err = new Error('Uh Oh..');
//     err.status = 500;
//     next(err);
// })

app.get('/', (req, res) => {
    res.render('index', data);
})

app.get('/about', (req, res) => {
    res.render('about', data);
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    res.render('project', { data, id: req.params.id } );
})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err); 
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    console.log(status);
    res.status(status);
    res.render('error');
})

app.listen('3000', () => { console.log('App is running...')}) 