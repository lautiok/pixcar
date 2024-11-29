import {
  Client,
  ClientRepositories,
  ClientServices,
} from "../types/clientType";

export class ClientService implements ClientServices {
  private clientRepository: ClientRepositories;

  constructor(clientRepository: ClientRepositories) {
    this.clientRepository = clientRepository;
  }

  async create(data: Client): Promise<Client> {
    return await this.clientRepository.create(data);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
  async findById(id: string): Promise<Client> {
    return await this.clientRepository.findById(id);
  }
  async findbyemail(email: string): Promise<Client | null> {
    return await this.clientRepository.findOne({ email });
  }
  async findByIdentification(identification: string): Promise<Client | null> {
    return await this.clientRepository.findOne({ identification });
  }
  async update(id: string, data: Client): Promise<Client> {
    return await this.clientRepository.update(id, data);
  }
  async delete(id: string): Promise<void> {
    return await this.clientRepository.delete(id);
  }
}
