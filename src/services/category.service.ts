import ApiService from './api.service'

class CategoryService extends ApiService {
  constructor() {
    super('categories');
  }
}

export default new CategoryService()