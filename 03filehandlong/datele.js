const fs = require('fs');

fs.unlink('./hello.txt', (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log('File deleted successfully');

});