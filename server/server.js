let PORT = 5000;

// ref the express package
let express = require('express');

// Create an express app instance & ref it with 'app'
let app = express();

app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
})

