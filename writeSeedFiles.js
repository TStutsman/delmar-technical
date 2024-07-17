const fs = require('fs');

const randomTimes = () => new Array(100).fill(1).map(() => new Date(Math.random() * 86399000).toTimeString().split(' ')[0]);
const randomUsersTimes = () => randomTimes().map(time => time + ', ' + Math.floor(9999*Math.random()).toString().padStart(4, '0'));
const randomPagesUsersTimes = () => randomUsersTimes().map(user => user + ', ' + Math.floor(Math.random() * 30).toString().padStart(2, '0'));

for(let i = 20240710; i < 20240717; i++) {
    fs.writeFileSync(`./logFiles/${i}.txt`, randomPagesUsersTimes().sort().join('\n'));
}