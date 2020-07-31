import path from 'path';

module.exports = {
  dbUrl: process.env.PROD_MONGODB_CONNEXION_URL!,
  cert: path.join(__dirname, process.env.PROD_SSL_CERTIFICATE_PATH!),
  key: path.join(__dirname, process.env.PROD_RSA_KEY_PATH!),
};
