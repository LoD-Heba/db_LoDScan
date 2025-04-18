
export interface IRatingAttributes {
    value: number;
    userId: number;
    novelId: number;
  }

  export interface IRatingCreationAttributes extends IRatingAttributes {
    // Puedes añadir campos opcionales
  }