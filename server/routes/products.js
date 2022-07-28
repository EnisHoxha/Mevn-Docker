var Products = require("../models/products");
var express = require("express");
var router = express.Router();
const multer = require("multer");

/*Merri krejt produktet qka jane new arriwals*/
router.get("/newproducts", function (req, res, next) {
  var query = { newproduct: true };
  Products.find(query, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL products */
router.get("/", function (req, res, next) {
  Products.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get("/:id", function (req, res, next) {
  Products.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

const upload = multer({
  dest: "images",
  // limits: {
  // fileSize: 1000000 //1MB
  // }
  filename: (req, file, cb) => {
    cb(
      undefined,
      req.file.fieldname + "." + path.extname(req.file.originalname)
    );
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
      // nese file nuk eshte PDF,ose jpg ose jpeg, mos me lan me bo upload
      return cb(
        new Error("File must be a PDF or JPG or JPEG or PNG to be uploaded")
      );
    }
    cb(undefined, true);
  },
});

/* SAVE PRODUCT */
//upload.single() sepse vetem nje foto kemi me bo upload per me bo me shum duhet me specifiku array e jo single
router.post("/create", upload.array("images", 1), (req, res) => {
  const newProduct = new Products({
    name: req.body.name,
    title: req.body.title,
    images: req.files.map((file) => file.path), //req.files is an array of objects (files), so you have to use Array.prototype.map() to create a new array that contains only the path of each file
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    color: req.body.color,
    size: req.body.size,
    quantity: req.body.quantity,
    newproduct: req.body.newproduct,
  });
  console.log(req.body);
  return newProduct
    .save()
    .then((response) => {
      res.status(200).json({
        message: "Product created successfully",
        response: newProduct,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: error });
    });
});

//method for search by title.
router.post("/search", function (req, res, next) {
  console.log("Search method.....");
  console.log(req.body.title);
  var query = req.body.title;
  Products.find(
    { title: { $regex: ".*" + query + ".*" } },
    function (err, products) {
      if (err) return next(err);
      res.send(products);
    }
  );
});

/* UPDATE PRODUCT */
router.put("/:id", function (req, res, next) {
  console.log(req.body);
  Products.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//for quantity
router.put("/:id", function (req, res, next) {
  console.log(req.body);
  Products.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete("/:id", function (req, res, next) {
  Products.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
