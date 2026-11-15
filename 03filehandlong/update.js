const fs = require('fs');

fs.appendFile('./hello.txt', '\nWelcome to Node.js', (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log('Data added successfully');

});