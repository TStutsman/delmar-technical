# Loyal Customers Script

This script is written in JavaScript and tested using Node 18.19.1

The command to run the script is ```node printLoyalCustomers.js```

## Outstanding Questions for the Client

1. How would you like the loyal client list to be displayed?

Currently, it is printed to a 'loyalCustomers.txt' file, and it only shows the customer's ID's. We could integrate this information with the customer's emails, names, etc.

2. Would it be useful to integrate this solution with something that runs regularly? 

Since the script only runs when it is called, potentially setting up a regular schedule to update the list when a new logFile is created


## Notes and Thought Process

- As I am building this project, the first step I take is to split it into 4 parts:

    1. Read data from a file
    2. Organize data to target users
    3. Find which users are loyal customers
    4. Output loyal customers to terminal or a file

- In stage one, I set up a file reading function to read every file in a folder

- In stage two, I create a hash to hold unique dates/pageIds for the user that visits

- In stage three I initially created a function to filter the loyal customers from the userData, and realized that I could save computing power by checking if the users were loyal customers on the first pass (in stage two that is). Using this idea, I refactored my solution to include this optimization (doing steps 2 and 3 at the same time)

- In the last stage, I chose to output the data to a file, since the terminal is a limited size, and highly ephemeral. With a file, the user can scroll (meaning increased capacity), and the data isn't lost when the file is closed.