function basicAdminAuth(req, res, next) {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return next();
  }
  return res.status(401).json({ message: 'Invalid credentials' });
}

module.exports = { basicAdminAuth };

