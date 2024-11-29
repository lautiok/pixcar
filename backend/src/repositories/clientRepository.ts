import { Client, ClientRepositories } from "../types/clientType";
import { ClientModel } from "../models/client.models";
import { Query } from "../types/repositoryTypes";

export class ClientRepository implements ClientRepositories {
  async create(data: Client): Promise<Client> {
    const newClient = new ClientModel(data);
    return await newClient.save();
  }

  async findAll(): Promise<Client[]> {
    return await ClientModel.find().exec();
  }

  async findOne(query: Query): Promise<Client | null> {
    return await ClientModel.findOne(query);
  }

  async findById(id: string): Promise<Client> {
    const client = await ClientModel.findById(id).exec();
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: string, data: Client): Promise<Client> {
    const client = await ClientModel.findByIdAndUpdate(id, data, { new: true });
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return client;
  }
  async delete(id: string): Promise<void> {
    const client = await ClientModel.findByIdAndDelete(id);
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return;
  }
  async findbyemail(email: string): Promise<Client | null> {
    return await ClientModel.findOne({ email });
  }
}
