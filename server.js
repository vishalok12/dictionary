// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running ' + request.type );
});

/*
//Connect to database
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/vocab_database';
mongoose.connect( mongoUri );

//Schemas
var Word = new mongoose.Schema({
    name: String,
    meaning: String,
    remembered: Boolean
});


//Models
var WordModel = mongoose.model( 'Word', Word );
*/

//Get a list of all words
app.get( '/api/words', function( request, response ) {
    console.log('request for books');
/*
    return WordModel.find( function( err, words ) {
        if( !err ) {
            return response.send( words );
        } else {
            return console.log( err );
        }
    });
*/
		return response.send( 'Mil gayi request' );
});

//Insert a new word
/*
app.post( '/api/words', function( request, response ) {
    var word = new WordModel({
        name: request.body.name,
        meaning: request.body.meaning,
        remembered: request.body.remembered
    });
    word.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( word );
});
*/

// Get a single word by id
// app.get( '/api/books/:id', function( request, response ) {
//     return BookModel.findById( request.params.id, function( err, book ) {
//         if( !err ) {
//             return response.send( book );
//         } else {
//             return console.log( err );
//         }
//     });
// });

//Update a word
app.put( '/api/words/:id', function( request, response ) {
    console.log( 'Updating word ' + request.body.name );
    return BookModel.findById( request.params.id, function( err, word ) {
        word.name = request.body.name;
        word.meaning = request.body.meaning;
        word.remembered = request.body.remembered;

        return word.save( function( err ) {
            if( !err ) {
                console.log( 'word updated' );
            } else {
                console.log( err );
            }
            return response.send( word );
        });
    });
});

//Delete a word
app.delete( '/api/words/:id', function( request, response ) {
    console.log( 'Deleting word with id: ' + request.params.id );
    return wordModel.findById( request.params.id, function( err, word ) {
        return word.remove( function( err ) {
            if( !err ) {
                console.log( 'word removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = process.env.PORT || 3000;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

