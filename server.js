// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ), //MongoDB integration
    dispatcher = require('./lib/dispatcher.js'); //require custom dispatcher

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    app.use( express.cookieParser() );

    app.use(express.session({secret: '1234567890QWERTY'}));

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/', function( request, response ) {
    //dispatch our request
    dispatcher.dispatch(request, response);
});

// signup
app.post('/signup', function(request, response) {
    request.session.userId = '';
    var user = new UserModel({
        first_name: request.body.firstName,
        last_name: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    });
    user.save( function( err, user ) {
        if( !err ) {
            response.cookie('userid', user._id, { maxAge: 5 * 24 * 60 * 60 * 1000 });
            request.session.userId = user._id;
            response.redirect('/');

            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
});

// signin
app.post('/session', function(request, response) {
    var email = request.body.userName;
    var password = request.body.password;
    console.log('email: ' + email);
    console.log('password: ' + password);

    UserModel.findOne( {email: email}, function(err, userDetails) {
        console.log(err);
        console.log(userDetails);
        if( !err ) {
            if (userDetails.password === password) {
                console.log('matched');
                response.cookie('userid', userDetails._id, { maxAge: 5 * 24 * 60 * 60 * 1000 });
                request.session.userId = userDetails._id;
                response.redirect('/');
            } else {
                console.log('unmatched');

                response.redirect("/");
            }
        } else {
            return console.log( err );
        }
    });
});

//Connect to database
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/vocab_database';
mongoose.connect( mongoUri );

//Schemas
var Word = new mongoose.Schema({
    name: String,
    meaning: String,
    remembered: Boolean,
    userId: String
});

var User = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

//Models
var WordModel = mongoose.model( 'Word', Word );
var UserModel = mongoose.model( 'User', User );

//Get a list of all words
app.get( '/api/words', function( request, response ) {
    console.log('sessionId: ' + request.session.userId);

    return WordModel.find( { 'userId': request.session.userId }, 'name meaning remembered _id', function( err, words ) {
        if( !err ) {
            return response.send( words );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new word
app.post( '/api/words', function( request, response ) {
    var word = new WordModel({
        name: request.body.name,
        meaning: request.body.meaning,
        remembered: request.body.remembered,
        userId: request.session.userId
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
    return WordModel.findById( request.params.id, function( err, word ) {
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
    return WordModel.findById( request.params.id, function( err, word ) {
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

