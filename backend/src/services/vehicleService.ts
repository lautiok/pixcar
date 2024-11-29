import {
  Vehicle,
  VehicleRepositories,
  VehicleServices,
} from "../types/vehiclesType";

export class VehicleService implements VehicleServices {
  private vehicleRepository: VehicleRepositories;

  constructor(vehicleRepository: VehicleRepositories) {
    this.vehicleRepository = vehicleRepository;
  }

  async create(data: Vehicle): Promise<Vehicle> {
    return await this.vehicleRepository.create(data);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }

  async findById(id: string): Promise<Vehicle> {
    return await this.vehicleRepository.findById(id);
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return await this.vehicleRepository.findOne({ placa: plate });
  }

  async update(id: string, data: Vehicle): Promise<Vehicle> {
    return await this.vehicleRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return await this.vehicleRepository.delete(id);
  }
}
