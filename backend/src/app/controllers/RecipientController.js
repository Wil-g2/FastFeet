import * as Yup from 'yup';
import i18n from 'i18n';
import Recipient from "../models/Recipient";

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      additional_address: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: i18n.__('InvalidInsert') });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    const { name, page } = req.query;

    const querySchema = Yup.object().shape({
      name: Yup.string().required(),
      page: Yup.number(),
    });

    if (!(await querySchema.isValid(req.body))) {
      return res.status(400).json({
        error: i18n.__('InvalidParameters'),
      });
    }

    const recipients = await Recipient.findAll({
      where: {
        name: { [Op.iLike]: name ? `${name}%` : `%%` },
      },
      limit: 5,
      offset: ((page || 1) - 1) * 5,
      attributes: [
        "id",
        "name",
        "street",
        "number",
        "additional_address",
        "state",
        "city",
        "zip_code",
      ],
    });

    const numberOfRecipients = await Recipient.count({
      where: {
        name: { [Op.iLike]: name ? `${name}%` : `%%` },
      },
    });
    const maxPage = Math.ceil(numberOfRecipients / 5);

    return res.json({ recipients, maxPage });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      additional_address: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: i18n.__('InvalidInsert')});
    }

    const { id } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: i18n.__('InvalidId') });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: i18n.__('IdRequired') });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: i18n.__('InvalidId') });
    }

    await recipient.destroy();

    return res.json({ msg: i18n.__('DeleteMessage') });
  }
}

export default new RecipientController();
