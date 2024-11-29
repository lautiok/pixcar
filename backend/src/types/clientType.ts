import { Query, Repository } from "./repositoryTypes";

export interface Client {
  _id?: string;
  name: string;
  email: string;
  identification: string;
  vehicles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientRepositories extends Repository<Client> {
  findOne: (query: Query) => Promise<Client | null>;
}

export interface ClientServices {
  create: (data: Client) => Promise<Client>;
  findAll: () => Promise<Client[]>;
  findbyemail: (email: string) => Promise<Client | null>;
  findByIdentification: (identification: string) => Promise<Client | null>;
  findById: (id: string) => Promise<Client>;
  update: (id: string, data: Client) => Promise<Client>;
  delete: (id: string) => Promise<void>;
}
