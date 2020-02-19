import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import i18n from '../../config/i18n';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({error: i18n.__('TokenNotProvided')});
  }

  const [, token ] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch ( err) {
    return res.status(401).json({ error: i18n.__('InvalidToken')});
  }
}
