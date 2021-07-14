# Rodo Assessment

## Installation and Running Instructions

---

This assessment has custom scripts that when executed will perform all necessary installations and spin up all required servers.

1. First you must download the assessment to your machine and open a terminal.
2. Once in the terminal, navigate to the downloaded folder's directory. It should be named **rodo-assessment**.
3. Type in the following script and press enter in order to install all required packages: `npm run get`
4. Now its time to spin up the db with the following command: `npm run startDB`
5. Open a new terminal window in the same directory and run the following command to spin up the server: `npm run startServer`
6. Open another terminal window within the directory called **frontend** and run the following command to start the application: `npm start`
7. You may see a warning within the terminal indicating that a port is already in use. If so, then type `y` in order for the application to use an alternate port.
