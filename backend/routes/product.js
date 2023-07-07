const User = require("../models/User");
const Product = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
const newProduct = new Product(req.body);

try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct)

}catch(error){
    res.status(500).json(error)
}

})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {


  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {

  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if(qnew ){
        //If there are new products then sort them by date and limit them to 5
        products = await Product.find().sort({createdAt:-1}).limit(5)
    } else if(qCategory){
        products = await Product.find({
       
            categories:{
                $in:[qCategory],

            }
                
        })
    } else{
        products = await Product.find()
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;