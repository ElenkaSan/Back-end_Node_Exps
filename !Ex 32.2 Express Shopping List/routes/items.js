const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function(req, res){
   res.json({items})
});

router.post("/", function (req, res) {
  const newItem = {
		name  : req.body.name,
		price : req.body.price
	};
  items.push(newItem)
  res.json({ item: newItem })
})

router.get("/:name", function (req, res) {
  const itemName = req.params.name;
  const foundItem = items.find((x) => x.name === itemName);
  if(foundItem === undefined){
    throw new ExpressError("Item not found", 404)
  }
  res.json({ item: foundItem})
})

router.patch("/:name", function (req, res) {
  const itemName = req.params.name;
  const updateItem = items.find((x) => x.name === itemName);
  if (updateItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  updateItem.name = req.body.name;
  updateItem.price = req.body.price; 
  return res.json({ item: updateItem });
})

router.delete("/:name", function (req, res) {
  const itemName = req.params.name;
  const itemIndex = items.findIndex((x) => x.name === itemName);
  if (itemIndex === -1) {
    throw new ExpressError("Item not found", 404)
  }
  items.splice(itemIndex, 1)
  return res.json({ message: "Item deleted" })
})

module.exports = router;