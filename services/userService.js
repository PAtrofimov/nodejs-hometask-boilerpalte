const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
    const items = UserRepository.getAll();
    if (!items.length) {
      throw new Error("Users not found!");
    }
    return items;
  }

  create(data) {
    const item = UserRepository.create(data);
    if (!item.id) {
      throw new Error("User not created!");
    }
    return item;
  }

  update(id, data) {
    const item = UserRepository.update(id, data);

    if (!item.id) {
      throw new Error(`User not updated by id = ${id}!`);
    }
    return item;
  }

  delete(id) {
    const item = UserRepository.delete(id);

    if (!item.length) {
      throw new Error(`User not deleted by id = ${id}!`);
    }
    return item;
  }

  get(id) {
    const item = UserRepository.getOne({ id });
    if (!item) {
      throw new Error(`User not found by id = ${id}!`);
    }
    return item;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  canSave(search, id = "") {
    const item = UserRepository.getOne(search);
    if (!item) {
      return true;
    }
    return id && item.id === id;
  }
}

module.exports = new UserService();
