// Core data model for categories.
// Each category groups services by a domain such as Infrastructure,
// Access, Applications or Support. The API returns these objects
// with an id, a name and a description.
export interface Category {
  id: number;
  /** Nombre de la categoría (por ejemplo, "Infraestructura"). */
  name: string;
  /** Descripción de la categoría. */
  description: string;
}