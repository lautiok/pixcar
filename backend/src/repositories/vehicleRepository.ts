import { Vehicle, VehicleRepositories } from "../types/vehiclesType";
import { VehicleModel } from "../models/vehicles.models";
import { Query } from "../types/repositoryTypes";

export class VehicleRepository implements VehicleRepositories {
  async create(data: Vehicle): Promise<Vehicle> {
    const newVehicle = new VehicleModel(data);
    return await newVehicle.save();
  }

  async findAll(): Promise<Vehicle[]> {
    return await VehicleModel.find().exec();
  }

  async findOne(query: Query): Promise<Vehicle | null> {
    return await VehicleModel.findOne(query).exec();
  }

  async findById(id: string): Promise<Vehicle> {
    const vehicle = await VehicleModel.findById(id).exec();
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(id: string, data: Vehicle): Promise<Vehicle> {
    const vehicle = await VehicleModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async delete(id: string): Promise<void> {
    await VehicleModel.findByIdAndDelete(id).exec();
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return await VehicleModel.findOne({ placa: plate }).exec();
  }
}
