export type Query = Record<string, unknown>;

export interface Repository<T = unknown> {
  create: (data: T) => Promise<T>;
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
