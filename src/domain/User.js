export default class User {
  constructor({ id, name, email, password, roleId, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}