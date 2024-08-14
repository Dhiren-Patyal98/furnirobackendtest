const products = require('../models/products')
const category = require('../models/category');
const productVariety = require('../models/productVariety')


const protuctDetails = async (req, res) => {
    try{

        const categoryid = req.body.categoryid;
        const product = new products ({
            categoryid:req.body.categoryid,
            productName:req.body.productName,
            productDescription:req.body.productDescription
        });

        const categoryval = await category.findOne({_id: categoryid})

        if(categoryval){
            const products_update = await product.save();
            res.status(200).send({success:true, data : products_update})
        }
        else{
            res.status(404).send({success:false,msg:"category doesnt exists"})
        }

    }
    catch(err)
    {
      res.status(404).send(err.message);
    }
};



  // Make sure the path is correct

const deleteProduct = async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id;

        // Find and delete the product by its ID
        const deletedProduct = await products.findByIdAndDelete(productId);

        // Check if the product was found and deleted
        if (deletedProduct) {
            res.status(200).send({ success: true, message: 'Product deleted successfully' });
        } else {
            res.status(404).send({ success: false, message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};






const getProducts = async (req,res,next) =>
{
    const getdata = await products.find();
    res.send({data:getdata})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const productVarient = async (req,res) =>
{
    try{
        const productidd = req.body.productid
        console.log(productidd);
        
         const product_Vary = new productVariety({
            productid:productidd,
            color:req.body.color,
            image:req.body.image,
            originalprice:req.body.originalprice,
            discountedprice:req.body.discountedprice,
            tag:req.body.tag,
         })

         const productidval = await products.findOne({_id : productidd});
         console.log(productidval)

         if(productidval)
         {
            const productVaryUpdate = await product_Vary.save();
            res.status(200).send({success:true , data : productVaryUpdate })
         }
         else
         {
            res.status(404).send({success:false , msg:"product id doesnt match"})
         }
    }
    catch(err)
    {
         res.status(404).send(err.message)
    }
}



const deleteProductVariety = async (req, res) => {
    try {
        // Extract the product variety ID from the request parameters
        const varietyId = req.params.id;

        // Find and delete the product variety by its ID
        const deletedProductVariety = await productVariety.findByIdAndDelete(varietyId);

        // Check if the product variety was found and deleted
        if (deletedProductVariety) {
            res.status(200).send({ success: true, message: 'Product variety deleted successfully' });
        } else {
            res.status(404).send({ success: false, message: 'Product variety not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};



const getProductvariety = async(req,res) =>
{
    const getdata = await productVariety.find();
    res.send({data:getdata})
}



exports.productVarient =productVarient;
exports.getProductvariety = getProductvariety;
exports.deleteProductVariety = deleteProductVariety;
exports.protuctDetails = protuctDetails;
exports.getProducts = getProducts;
exports.deleteProduct =  deleteProduct;