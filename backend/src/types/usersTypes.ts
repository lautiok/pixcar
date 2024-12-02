import { Query, Repository } from "./repositoryTypes";

export interface User {
  _id?: string;
  name: string;
  identification: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UIuserRepository extends Repository<User> {
  findOne: (query: Query) => Promise<User | null>;
  updatePassword: (id: string, password: string) => Promise<User>;
}

export interface UIuserService {
  create: (data: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findbyemail: (email: string) => Promise<User | null>;
  findByIdentification: (identification: string) => Promise<User | null>;
  findById: (id: string) => Promise<User>;
  update: (id: string, data: User) => Promise<User>;
  delete: (id: string) => Promise<void>;
}
