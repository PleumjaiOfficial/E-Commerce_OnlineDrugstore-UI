const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

//write file to harddisk
const createImage =  async (imageFile) => {
  const fileData = imageFile.data;
  const decodedFileData = Buffer.from(fileData, 'base64').toString();
  //rename image
  const date = new Date().getTime();
  const names = await imageFile.name.split('.');
  const extension = '.'.concat(names.pop());
  await names.push(date.toString());
  await names.push(extension);
  const fileName = await names.join('');

  //write image to harddisk
  try {
    //filter only binary data
    const base64Image = decodedFileData.split(';base64,').pop();
    fs.writeFileSync(path.resolve("public", "images", fileName), base64Image, { encoding: 'base64' });
    const filePath = 'http://localhost:5000/images/' + fileName;
    return ({
      type: 'SUCCESS',
      path: filePath,
      message: 'successfully create a file'
    });
  } catch (err) {
    console.log(err)
    return ({
      type: 'FAIL',
      message: 'Fail to write a file'
    });
  };
};

//delete image from disk
const deleteImageFromPath = async (imageUrl) => {
  
    const imageName = imageUrl.split('/').pop();
    const imagePath = path.resolve('public', 'images', imageName);
  try {
    fs.unlinkSync(imagePath);
  } catch (err) {
    throw err;
  }
};

//get all products
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    return {
      type: 'FAIL',
      message: 'cannot get all products'
    };
  }
};

//get individual product
const getProduct = async (productId) => {
  try {
    const product =  await Product.findById(productId);
    return product._doc;
  } catch (err) {
    return {
      type: 'FAIL',
      productId: productId,
      message: 'cannot get this product detail'
    };
  }
};

//add new product
const addProduct = async (product) => {
  const savedImageResult = await createImage(product.file);
  if (savedImageResult.type === 'SUCCESS') {
    try {
      const newProduct = new Product({
        name: product.name,
        image: savedImageResult.path,
        description: product.description,
        price: product.price,
        remain: product.remain,
        healthGoal: product.healthGoal
      });

      const saveProduct = await newProduct.save();
      return saveProduct;
    } catch (err) {
      return {
        type: 'FAIL',
        message: 'Cannot add new product'
      };
    }
  } else {
    return savedImageResult;
  }
};

//update product details
const updateProduct = async (productId, product) => {
  try {
    //update product with new image
    if (product.file.data) {
      //create new image
      const savedImageResult = await createImage(product.file);
      if (savedImageResult.type === 'SUCCESS') {
        console.log(product.image);
        deleteImageFromPath(product.image);
        const updatedProduct = Product.findByIdAndUpdate(productId,
          { ...product,
            image: savedImageResult.path }, //update new image path
          { new: true }
        );
        return updatedProduct;
      }
      return savedImageResult;

    } else { //update product without new image
      const updatedProduct = await Product.findByIdAndUpdate(productId, 
        { ...product },
        { new: true });
      return updatedProduct;
    }

  } catch (err) {
    return {
      type: 'FAIL',
      productId: productId,
      message: 'cannot update this product'
    };
  }
};

//delete product from database
const deleteProduct = async (productId) => {
  try {
    const product = await getProduct(productId);
    await Product.findByIdAndDelete(productId);
    //also delete image on disk 
    deleteImageFromPath(product.image);
    return {
      type: 'SUCCESS',
      productId: productId,
      message: 'successfully removed product'
    }
  } catch (err) {
    return {
      type: 'FAIL',
      productId: productId,
      message: 'cannot delete this product'
    }
  }
}

module.exports = { 
  getAllProducts: getAllProducts,
  getProduct: getProduct, 
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
}