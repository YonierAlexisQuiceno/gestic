/**
 * Representa una solicitud de servicio enviada a través del
 * catálogo. En esta fase de prueba de concepto las solicitudes se
 * mantienen únicamente en memoria, pero la estructura está lista
 * para persistirse en un backend cuando se implemente.
 */
export interface Request {
  /** Identificador único generado en el cliente. */
  id: number;
  /** Nombre de la persona que solicita el servicio. */
  nombre: string;
  /** Correo electrónico de contacto. */
  email: string;
  /** Descripción detallada del requerimiento o incidencia. */
  descripcion: string;
  /** Identificador del servicio solicitado. */
  serviceId: number;
  /** Fecha de creación de la solicitud. */
  createdAt: Date;
}