const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerInterface = require('../modules/customer');
const saltRounds = 10;

const register =  async (user) => {
  //check if there is the already existed email
  const alreadyEmail = await customerInterface.getCustomerByEmail(user.email);
  if (alreadyEmail) {
    return {
      type: 'FAIL',
      message: 'This email has been already registered'
    };
  }

  //hash user's password before store in DB
  const hashPassword = bcrypt.hashSync(user.password, saltRounds);
  user.password = hashPassword;

  const registedUser = await customerInterface.createCustomer(user);
  const { password, ...otherInfo } = registedUser._doc;
  return otherInfo;

}

const login = async (credential) => {
  const { email, password } = credential;

  const targetCustomer = await customerInterface.getCustomerByEmail(email);

  if (targetCustomer.type === 'FAIL' || targetCustomer === null) {
    return {
      type: 'FAIL',
      message: 'invalid credential'
    };
  }
  const passwordCheck = bcrypt.compareSync(password, targetCustomer.password);
  //if password is the same in DB
  if (passwordCheck) {
    //sign jwt
    const token = jwt.sign(
      {
        id: targetCustomer._id,
        isAdmin: targetCustomer.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    const { password, ...otherInfo } = targetCustomer._doc;
    otherInfo.token = token;
    return otherInfo;
  } else {
    return {
      type: 'FAIL',
      message: 'invalid username/password'
    };
  }
}

module.exports = {
  register: register,
  login: login
};