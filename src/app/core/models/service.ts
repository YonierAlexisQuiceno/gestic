import { Category } from './category';

// Enumeración para representar el estado de un servicio en el catálogo.
// Los valores coinciden con los estados definidos en la base de datos
// (ACTIVO, RETIRADO, PLANIFICADO)【204630901375654†L1058-L1073】. Utilizar un
// tipo de unión en lugar de una cadena libre ayuda a prevenir
// errores tipográficos y facilita el filtrado en la UI.
export type ServiceStatus = 'ACTIVO' | 'RETIRADO' | 'PLANIFICADO';

/**
 * Representa un servicio ofrecido por la OTIC. Cada servicio
 * pertenece a una categoría y tiene asociado un acuerdo de nivel de
 * servicio (SLA). El backend devuelve la relación con la categoría
 * para permitir mostrar el nombre de la categoría sin una segunda
 * llamada【204630901375654†L1016-L1040】.
 */
export interface Service {
  /** Identificador único del servicio. */
  id: number;
  /** Nombre del servicio (por ejemplo, "Correo Institucional"). */
  name: string;
  /** Descripción detallada del servicio. */
  description: string;
  /** Identificador de la categoría a la que pertenece el servicio. */
  categoryId: number;
  /** Objeto de la categoría asociado (proporcionado por la API). */
  category?: Category;
  /** Acuerdo de nivel de servicio (SLA) que define tiempos de
   * respuesta o resolución. */
  sla: string;
  /** Estado actual del servicio: ACTIVO, RETIRADO o PLANIFICADO. */
  status: ServiceStatus;
  /** Identificador del usuario que creó el servicio (opcional). */
  createdBy?: number;
  /** Fecha de creación del servicio (opcional, ISO 8601). */
  createdAt?: string;
}