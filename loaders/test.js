const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = [path.join(__dirname, '../src/images/black-boy.jpg'), path.join(__dirname, '../src/images/rubish-cat.jpg')];
console.log(Spritesmith);
Spritesmith.run({src: sprites}, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
    fs.writeFileSync(path.join(__dirname, '../dist/sprite.jpg'), result.image);
});