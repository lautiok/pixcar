import { Client } from "./clientType";
import { Repository, Query } from "./repositoryTypes";

export interface Vehicle {
  _id?: string;
  marca: string;
  modelo: string;
  placa: string;
  color: string;
  cliente?: Client;
  status?: string;
  price: string;
  kilometros: string;
  año: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VehicleRepositories extends Repository<Vehicle> {
  findOne: (query: Query) => Promise<Vehicle | null>;
}

export interface VehicleServices {
  create: (data: Vehicle) => Promise<Vehicle>;
  findAll: () => Promise<Vehicle[]>;
  findById: (id: string) => Promise<Vehicle>;
  findByPlate: (plate: string) => Promise<Vehicle | null>;
  update: (id: string, data: Vehicle) => Promise<Vehicle>;
  delete: (id: string) => Promise<void>;
}
