const Product = require("../models/schema");

const getAllProducts = async(req,res) => {
    const { id, category, name, featured, subcategory, sort, select }  = req.query;
    const queryObject = {};

    if(category){
        queryObject.category =  { $regex: category, $options: "i" };
    }

    if(name){
        queryObject.name = { $regex: name, $options: "i" };
    }

    if(subcategory){
        queryObject.subcategory = { $regex: subcategory, $options: "i" };
    }

    if(featured){
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 12;

    // let skip = (page - 1) * limit;

    // apiData = apiData.skip(skip).limit(limit);

    // console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({ Products });
};

const getAllProductsTesting = async(req,res) => {

    const Products = await Product.find(req.query);
    res.status(200).json({ Products });
    
};

module.exports = { getAllProducts, getAllProductsTesting };


// const Product = require("../models/schema");

// const getSingleProduct = async (req, res) => {
//   const { category, name, featured, subcategory, sort, select } = req.query;
//   const queryObject = {};

//   if (category) {
//     queryObject.category = { $regex: category, $options: "i" };
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" };
//   }

//   if (subcategory) {
//     queryObject.subcategory = { $regex: subcategory, $options: "i" };
//   }

//   if (featured) {
//     queryObject.featured = featured;
//   }

//   const apiData = Product.find(queryObject);

//   if (sort) {
//     let sortFix = sort.split(",").join(" ");
//     apiData = apiData.sort(sortFix);
//   }

//   if (select) {
//     let selectFix = select.split(",").join(" ");
//     apiData = apiData.select(selectFix);
//   }

//   const product = await apiData.limit(1).lean(); // Limit to one product and use lean to return a plain JavaScript object

//   if (product.length === 1) {
//     res.status(200).json(product[0]); // Return the single product
//   } else {
//     res.status(404).json({ error: "Product not found" });
//   }
// };

// module.exports = { getSingleProduct };

