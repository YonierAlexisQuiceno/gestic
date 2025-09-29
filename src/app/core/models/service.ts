export type ServiceLevel = 'Bronce' | 'Plata' | 'Oro';
export type ServiceStatus = 'Activo' | 'Inactivo';

export interface Service {
  id: number;
  nombre: string;
  categoria: string;
  nivel: ServiceLevel;
  responsable: string;
  descripcion: string;
  ans?: string;
  estado: ServiceStatus;
}