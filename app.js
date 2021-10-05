//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
let path = require('path')
app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.get('/actors/:id', actors.getOne);

app.post('/actors', actors.createOne);

app.put('/actors/changeByear/:year', actors.updateByear)
app.put('/actors/:id', actors.updateOne);
app.put('/actors/:id/movies', actors.addMovie);
app.put('/actors/:Aid/:Mid', actors.deleteMovieInActor);

app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/with', actors.deleteOneWithMovies);



//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/moviesgreaterthan', movies.getAllgreaterthan);
app.get('/movies/:id', movies.getOne);
app.get('/movies/:year1/:year2', movies.getAllBetweenYear);

app.post('/movies', movies.createOne);

app.put('/movies/:id', movies.updateOne);
app.put('/movies/delete/:Mid/:Aid', movies.deleteActorInMovie);
app.put('/movies/add/:Mid/:Aid', movies.addActorInMovie);


app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:year1/:year2', movies.deleteAllBetweenYear);