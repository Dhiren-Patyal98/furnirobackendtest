
const category = require ('../models/category')
const categoryDetails = async(req,res) =>
{
    try{
        const categoryName = req.body.description
        const categoryUpdate = new category({
            description: categoryName
        })
        const finddes = await category.findOne({description:categoryName})
        if(!finddes){
        const product_category = await categoryUpdate.save();
        res.status(200).send({success:true, data : product_category})
        }
        else{
            res.status(404).send({success:false, msg:"category already exists"})
        }
    }
    catch(err)
    {
        res.status(404).send("user already exist");
    }
};

const getCategory = async (req,res,next) =>{
    const getdata= await category.find();
    res.send({data:getdata})
 }
exports.categoryDetails = categoryDetails;
exports.getCategory = getCategory;