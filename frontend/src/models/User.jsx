export class User {
    constructor({ id, username, password, role }) {
      this.id = id;
      this.username = username;
      this.password = password; // en login este campo puede no venir
      this.role = role;
    }
  }
  