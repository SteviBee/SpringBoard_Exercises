function curriedAdd(total) {
    let sum = 0;
    if (!total) {
        return 0
    }
    return function sumIfArgs(num) {        
        if (num === undefined) return total
        // add total with num
        total += num
        return sumIfArgs 
    }

}

module.exports = { curriedAdd };
