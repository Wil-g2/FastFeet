import User from '../models/User';
import i18n from 'i18n';

class UserController {
  async store(req, res){
    try{
      const { email } = req.body;
      console.log(email);
      const userExist = await User.findOne({ where: { email }});

      if (userExist) {
        return res.status(400).json({ error: i18n.__('ExistUserError')});
      }

      const user = await User.create(req.body);
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    }catch (error) {
      console.log(error);
    }

  }
}

export default new UserController();
