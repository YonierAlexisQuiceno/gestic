import { Service } from './service';

// Enumeración de posibles estados para una solicitud. Estos valores
// reflejan el flujo natural de una petición: desde su creación
// (PENDIENTE), pasando por el procesamiento (EN_PROCESO), hasta su
// resolución (COMPLETADA) o cancelación (CANCELADA).
export type RequestStatus = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA' | 'CANCELADA';

/**
 * Modelo que representa una solicitud de servicio realizada por un
 * usuario. Incluye la fecha de solicitud y el estado actual. El
 * backend devolverá además el objeto de servicio solicitado y,
 * eventualmente, el usuario solicitante.
 */
export interface Request {
  /** Identificador único de la solicitud. */
  id: number;
  /** Identificador del usuario que realiza la solicitud. */
  userId: number;
  /** Identificador del servicio solicitado. */
  serviceId: number;
  /** Fecha en la que se crea la solicitud (cadena ISO 8601). */
  requestDate: string;
  /** Estado actual de la solicitud. */
  status: RequestStatus;
  /** Descripción o detalles de la solicitud. */
  details: string;
  /** Objeto del servicio asociado (opcional, devuelto por la API). */
  service?: Service;
}