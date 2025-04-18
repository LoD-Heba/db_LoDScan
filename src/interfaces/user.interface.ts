export interface IUserAttributes {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export interface IUserCreationAttributes extends IUserAttributes {
  // Puedes añadir campos opcionales
}