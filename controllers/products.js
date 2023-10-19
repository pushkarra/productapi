const Product = require("../models/schema");

const getAllProducts = async(req,res) => {
    const { category, name, featured, subcategory, sort, select }  = req.query;
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

    // const Products = await apiData;
    res.status(200).json({ apiData });
};

const getAllProductsTesting = async(req,res) => {

    // const Products = await Product.find(req.query);
    res.status(200).json({ apiData });
    
};

module.exports = { getAllProducts, getAllProductsTesting };
