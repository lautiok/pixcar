import { UIuserRepository, UIuserService, User } from "../types/usersTypes";

export class UserService implements UIuserService {
  private userRespository: UIuserRepository;

  constructor(userRespository: UIuserRepository) {
    this.userRespository = userRespository;
  }

  async create(data: User): Promise<User> {
    return await this.userRespository.create(data);
  }

  async findAll(): Promise<User[]> {
    return await this.userRespository.findAll();
  }
  async findById(id: string): Promise<User> {
    return await this.userRespository.findById(id);
  }

  async findbyemail(email: string): Promise<User | null> {
    return await this.userRespository.findOne({ email });
  }
  async findByIdentification(identification: string): Promise<User | null> {
    return await this.userRespository.findOne({ identification });
  }

  async update(id: string, data: User): Promise<User> {
    return await this.userRespository.update(id, data);
  }
  async delete(id: string): Promise<void> {
    return await this.userRespository.delete(id);
  }
}
