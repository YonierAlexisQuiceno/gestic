// Define the supported service levels. These follow the typical
// “bronce/plata/oro” segmentation used in service catalogues. Feel
// free to extend these values if your organisation uses other
// tiers. Changing this type will propagate into forms and lists
// automatically via TypeScript type checking.
export type ServiceLevel = 'Bronce' | 'Plata' | 'Oro';

// Define the possible states a service can be in. “Activo”
// indicates a service currently offered to the community; “Inactivo”
// identifies services that have been retired or are not available
// for new requests. Additional states (e.g. “Planificado”) can be
// added to support future functionality.
export type ServiceStatus = 'Activo' | 'Inactivo';

// Enumerate the types of requests that a service can accept. These
// codes align with the ITIL distinction between Incidencias (I),
// Requerimientos (R) o ambos (R/I). Using single-letter codes
// makes it easy to display in tables while still being explicit.
export type ServiceRequestType = 'I' | 'R' | 'R/I';

/**
 * The core data model for a service within the Gestic application.
 *
 * This interface extends the original fields with optional
 * attributes for the service’s support schedule (horario) and the
 * types of solicitudes (incidente, requerimiento) it accepts. The
 * ANS field remains optional to allow administrators to omit it
 * initially and add it later.
 */
export interface Service {
  /**
   * Unique identifier for the service. In the absence of a backend
   * database this is a simple numeric value generated on the client
   * side (e.g. using Date.now()). When a backend is introduced
   * this would become an auto‐incrementing primary key.
   */
  id: number;
  /** Human readable name of the service. */
  nombre: string;
  /** Category under which the service is grouped (e.g. “Soporte”, “Infraestructura”). */
  categoria: string;
  /** Service level – determines the ANS target and price tier. */
  nivel: ServiceLevel;
  /** Area or team responsible for delivering the service. */
  responsable: string;
  /** Detailed description outlining the scope of the service. */
  descripcion: string;
  /** Optional agreed service level (e.g. response time or resolution time). */
  ans?: string;
  /** Current availability status of the service. */
  estado: ServiceStatus;
  /** Optional schedule indicating the hours during which the service is available. */
  horario?: string;
  /**
   * Optional request type(s) accepted for this service. “I” for
   * Incidente, “R” for Requerimiento, or “R/I” when both are
   * accepted. When undefined the type will not be displayed in
   * the lists.
   */
  tipoSolicitud?: ServiceRequestType;
}