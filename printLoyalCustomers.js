const fs = require('fs');

// userData - a hash storing unique pages and dates for each user
// key: unique userId
// value: object containing {
//  pagesVisted: a set of unique pages the user visited
//  daysVisited: a set of unique days the user visited
// }
const userData = {};

// loyalCustomers - a set containing unique users who fulfill
// the 2 days and 2 pages criteria
const loyalCustomers = new Set();

// readRow - reads a single row from a file
// and adds the user to loyalCustomers if the user satisfies the criteria
function readRow(row, date) {
    const [_time, userId, pageId] = row.split(', ');
    
    // if the user visiting is already a loyal customer, skip
    if(loyalCustomers.has(userId)) {
        return;
    }
    
    // if this is the first visit for this user, create a new user
    if(!userData[userId]) {
        userData[userId] = {
            pagesVisited: new Set(),
            daysVisited: new Set()
        };
    }
    
    // retrieve the user's data from the hash
    // and add the visit page and day to the relevant sets
    const currentUser = userData[userId];
    currentUser.pagesVisited.add(pageId);
    currentUser.daysVisited.add(date);
    
    // lastly, check if the user fulfills
    // the criteria for a 'loyal customer'
    if(currentUser.pagesVisited.size > 1 && currentUser.daysVisited.size > 1) {
        loyalCustomers.add(userId);
    }
}

// readFromFolder - reads all files in a folder
// and processes the rows using readRow
function readFromFolder(path) {
    const files = fs.readdirSync(path);
    
    files.forEach(filename => {
        const file = fs.readFileSync(path + '/' + filename, {encoding: 'utf-8'});
        const rows = file.split('\n');
        
        rows.forEach(row => readRow(row, filename));
    });
}

// Optional Functionality:
// swapping './logFiles' with filePath variable
// and uncommenting this line allows the user
// to specify a filepath dynamically like:
// node printLoyalCustomers.js <[filename]>
// const filePath = process.argv[2];


// Call the main function
readFromFolder('./logFiles');

// Output the list of loyal customers to a file for easy permanent access
fs.writeFileSync('loyalCustomers.txt', Array.from(loyalCustomers).sort().join('\n'));