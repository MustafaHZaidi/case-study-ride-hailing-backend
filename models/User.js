class User {
  constructor(id, name, type, hashedPassword) {
    this.id = id;
    this.name = name;
    this.type = type; // 'passenger' or 'driver'
    this.hashedPassword = hashedPassword;
  }
}

module.exports = User;
