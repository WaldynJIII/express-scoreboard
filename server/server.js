let PORT = 5000;

// ref the express package
let express = require('express');

// Create an express app instance & ref it with 'app'
let app = express();

// Listen for requests
app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
})

// Use the stuff in server/public as the default route '/' (or something like that)
app.use(express.static('server/public'));