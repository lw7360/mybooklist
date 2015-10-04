import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import Joi from 'joi';

let schema = Joi.object().keys({
  username: Joi.string().alphanum().min(1).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(3).max(50)
});

let validate = Promise.promisify(Joi.validate);

function register (params) {
  return validate(params, schema).then((validated) => {
    validated.password = bcrypt.hashSync(validated.password, 10);
    return validated;
  });
}

export default register;
