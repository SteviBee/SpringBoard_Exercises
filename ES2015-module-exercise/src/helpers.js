function choice(items) {
    let randNum = Math.floor(Math.random() * items.length)
    return items[randNum] 
}

function remove(items, item) {

    return items.filter(function(i) {
        return i !== item
    })
}

export { choice, remove }