import ApiService from './api.service'

class UserService extends ApiService {
  constructor() {
    super('users');
  }
}

export default new UserService()