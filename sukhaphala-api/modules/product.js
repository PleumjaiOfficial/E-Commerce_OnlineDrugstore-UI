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
    throw ({
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
    if (imageName !== 'default-image.jpg') {
      fs.unlinkSync(imagePath);
    }
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot delete this image from the disk'
    };
  }
};

//get all products
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot get all products from database.'
    };
  }
};

//get individual product
const getProduct = async (productId) => {
  try {
    const product =  await Product.findById(productId);
    return product._doc;
  } catch (err) {
    throw {
      type: 'FAIL',
      productId: productId,
      message: 'cannot get this product detail'
    };
  }
};

//add new product
const addProduct = async (product) => {
  //use haveFile to be middle varaible that check the image
  // - if request comes from UI interface, there will always be product.file
  //    to check if there is file with a request, check product.file.data
  // - if request comes from internal interface and there is no file with request,
  //    we can check from product.file
  let haveFile = '';
  if (product.file) {
    haveFile = product.file.data;
  }
  try { 
    if (haveFile) {
      //if there is image of this product
      const savedImageResult = await createImage(product.file);
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
    } else {
      //if there is no image of this product
      const newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        remain: product.remain,
        healthGoal: product.healthGoal
      });

      const saveProduct = await newProduct.save();
      return saveProduct;
    }
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot add new product'
    };
  }
};

//update product details
const updateProduct = async (productId, product) => {
  let haveFile = '';
  if (product.file) {
    haveFile = product.file.data;
  }
  try {
    //update product with new image
    if (haveFile) {
      //create new image
      const savedImageResult = await createImage(product.file);
      deleteImageFromPath(product.image); //delete old image of this product
      const updatedProduct = Product.findByIdAndUpdate(productId,
        { ...product,
          image: savedImageResult.path }, //update new image path
        { new: true }
      );
      return updatedProduct;

    } else { 
      //update product without new image
      const updatedProduct = await Product.findByIdAndUpdate(productId, 
        { ...product },
        { new: true });
      return updatedProduct;
    }

  } catch (err) {
    console.log(err);
    throw {
      type: 'FAIL',
      message: `cannot update this product (product id: ${productId})`
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
      message: `successfully removed product (product id: ${productId})`
    }
  } catch (err) {
    throw {
      type: 'FAIL',
      message: `cannot delete this product (product id: ${productId})`
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