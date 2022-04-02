const express = require("express")
const router = new express.Router()
const ExpressError  = require("../expressError")
const items = require("../fakeDb")


// Routes -----> Note all routes have "/items" prefixed on them due to the app
router.get('/', function (req, res) {
    // Fake add to help debug:
    // let newItem = {name: "stephen"}
    // items.push(newItem)

    res.json({items})
})
// POST /items - this route should accept JSON data and add it to the shopping list.
router.post('/', function (req, res) {
    const newItem = {name: req.body.name}
    items.push(newItem)

    res.status(201).json({items})
})

// Get one single
router.get('/:name', function (req, res) {
    
    const foundItem = items.find(item => item.name === req.params.name)
    console.log("item name ", foundItem)
    console.log("Data base / array  ", items)
    console.log("req params name ", req.params.name )
    if(foundItem === undefined){
      throw new ExpressError("Item not found", 404)
    }

    res.json({item: foundItem})
})

router.patch('/:name', function (req, res) {
    console.log("req params ", req.params, req.body.name)
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
      throw new ExpressError("Item not found for update", 404)
    }
    // Updating current value before returning data
    foundItem.name = req.body.name

    res.json({item: foundItem})
  })

router.delete('/:name', function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Cat not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
  })





module.exports = router;