import path from 'path';

module.exports = {
  dbUrl: process.env.DEV_MONGODB_CONNEXION_URL!,
  cert: path.join(__dirname, '../ssl/local.crt'),
  key: path.join(__dirname, '../ssl/local.key'),
};
