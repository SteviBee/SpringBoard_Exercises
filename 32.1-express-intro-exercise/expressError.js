class expressError extends Error{
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack)
    }
}

// Export so I can import in other file:
module.exports = expressError;