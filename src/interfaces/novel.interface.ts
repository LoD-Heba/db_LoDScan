import { Optional } from "sequelize";

export interface INovelAttributes {
  title: string;
  description: string;
  coverImage: string;
  authorId: number;
    typeId: number;
}

export interface INovelCreationAttributes extends Optional<INovelAttributes, 'description' | 'coverImage'> {}
