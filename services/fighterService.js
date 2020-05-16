const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    const items = FighterRepository.getAll();
    if (!items.length) {
      throw new Error("Fighters not found!");
    }
    return items;
  }

  create(data) {
    const item = FighterRepository.create(data);
    if (!item.id) {
      throw new Error("Fighter not created!");
    }
    return item;
  }

  update(id, data) {
    const item = FighterRepository.update(id, data);
    if (!item.id) {
      throw new Error(`Fighter not updated by id = ${id}!`);
    }
    return item;
  }

  delete(id) {
    const item = FighterRepository.delete(id);

    if (!item.length) {
      throw new Error(`Fighter not deleted by id = ${id}!`);
    }
    return item;
  }

  get(id) {
    const item = FighterRepository.getOne({ id });
    if (!item) {
      throw new Error(`Fighter not found by id = ${id}!`);
    }
    return item;
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  canSave(search, id = "") {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return true;
    }
    return id && item.id === id;
  }
}

module.exports = new FighterService();
