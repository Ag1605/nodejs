const fs = require('fs');

fs.readFile('hello.txt', 'utf8', (err, data) => {
// they expext some error handling here, so we need to check if there is an error it reyruns 
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});

console.log('Program finished');