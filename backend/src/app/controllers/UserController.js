import i18n from 'i18n';
import User from '../models/User';

class UserController {
  async store(req, res){
    try{
      const { email } = req.body;

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

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    //verify new email is different and if email exist in database
    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email }});
      if (userExist) {
        return res.status(400).json({ error: i18n.__('ExistUserError')});
      }
    }

    //verify old passoword
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({error: i18n.__('UserPasswordError') });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email
    })

  }
}

export default new UserController();
