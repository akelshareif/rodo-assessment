// Express Error class will create error objects that display status code and a message

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        // Prints the stack trace to error console
        console.error(this.stack);
    }
}

module.exports = ExpressError;
