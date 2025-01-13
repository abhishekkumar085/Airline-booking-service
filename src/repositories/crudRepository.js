const { Logger } = require('../config');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // create
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error('something went wrong in crud repo : create');
      throw error;
    }
  }
  // delete by id
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error('something went wrong in crude repo : destroy');
      throw error;
    }
  }
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error('something went wrong in crude repo : get');
      throw error;
    }
  }
  async getAll() {
    try {
      const response = await this.model.findAll( );
      return response;
    } catch (error) {
      Logger.error('something went wrong in crude repo : GETALL');
      throw error;
    }
  }
  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error('something went wrong in crude repo : Update');
      throw error;
    }
  }
}

module.exports=CrudRepository;