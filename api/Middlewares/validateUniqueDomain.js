const validateUniqueDomains = (req, res, next) => {
  const { users } = req.body;

  const domains = users.map((user) => user.domain);

  if (new Set(domains).size !== domains.length) {
    return res.status(400).json({ error: "members must have unique domains." });
  }
  next();
};
module.exports = validateUniqueDomains;
