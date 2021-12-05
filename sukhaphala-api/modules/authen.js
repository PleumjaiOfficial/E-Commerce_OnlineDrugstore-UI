const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerInterface = require('../modules/customer');
const saltRounds = 10;

const register =  async (user) => {
  //check if there is no email and password
  // if (!(newCustomer.password && newCustomer.email && newCustomer.firstname && newCustomer.lastname)) {
  //   throw {
  //     type: 'FAIL',
  //     message: 'cannot leave firstname, surname, email, and password blank'
  //   };
  // }

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //check if there is no email and password
  if (!(user.password && user.email)) {
    throw {
      type: 'FAIL',
      message: 'cannot leave email and password blank'
    }
  //check if there is no firstname and lastname
  } else if (!(user.firstname && user.lastname)) {
    throw {
      type: 'FAIL',
      message: 'cannot leave firstname and lastname blank'
    }
  //validate email
  } else if(!(user.email.match(mailformat))){
    throw {
      type: 'FAIL',
      message: 'email is not valid'
    }
  //check if there is no phone number
  } else if(!(user.phone)){
    throw {
      type: 'FAIL',
      message: 'cannot leave phone contact blank'
    }
  }

  //check if there is the already existed email
  const alreadyEmail = await customerInterface.getCustomerByEmail(user.email);
  if (alreadyEmail) {
    throw {
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

  //check if there is no email and password
  if (!(password && email)) {
    throw {
      type: 'FAIL',
      message: 'cannot leave email and password blank'
    };
  }

  //check if username is not in the database
  const targetCustomer = await customerInterface.getCustomerByEmail(email);
  if (targetCustomer === null || targetCustomer.type === 'FAIL') {
    throw {
      type: 'FAIL',
      message: 'invalid username/password'
    };
  }

  //check if password is the same in DB
  const passwordCheck = bcrypt.compareSync(password, targetCustomer.password);
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
    //password is not correct
    throw {
      type: 'FAIL',
      message: 'invalid username/password'
    };
  }
}

module.exports = {
  register: register,
  login: login
};