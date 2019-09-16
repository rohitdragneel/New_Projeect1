const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;
class Product{
  constructor(title,imageUrl,price,description,id){
    this.title=title;
    this.imageUrl=imageUrl;
    this.price=price;
    this.description=description;
    this._id=id ?new mongodb.ObjectId(id):null;
  }
  save(){
   const db=getDb();
   let dbOp;
   if(this._id){
     //update product
     return db.collection('Products').updateOne({_id:this._id},{$set:this}).then(result=>{console.log(result)})
     .catch(err=>console.log(err));
   }
   else{
   return db.collection('Products').insertOne(this)
   .then(result=>{console.log(result)})
   .catch(err=>console.log(err));
   }
  }
  static fetchAll(){
    const db=getDb();
    return db.collection('Products').find().toArray().then(products=>{
      console.log(products);
      return products;
    }).catch(err=>{
      console.log(err);
    })
  }
  static findById(prodId){
    const db=getDb();
    return db.collection('Products').find({_id:new mongodb.ObjectId(prodId)}).next()
    .then(product=>{
      console.log(product);
      return product;
    })
    .catch(err=>{
      console.log(err);
    })
  }
  static DeleteById(prodId){
    const db=getDb();
   return db.collection('Products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then().catch(err=>console.log(err))
  }
}


module.exports = Product;
