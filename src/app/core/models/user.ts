// Modelo básico de usuario. Se puede extender con más campos como
// nombre completo, correo electrónico, etc. Por ahora sólo se
// utiliza el identificador y el nombre de usuario, acorde con el
// esquema de la base de datos propuesta.
export interface User {
  id: number;
  username: string;
  roleId: number;
}