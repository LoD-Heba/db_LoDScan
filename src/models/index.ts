// src/models/index.ts
import sequelize from '../config/db';
import User from './User.model';
import Role from './Role.model';
import Novel from './Novel.model';
import NovelType from './NovelType.model';
import Genre from './Genre.model';
import NovelGenre from './NovelGenre.model';
import Chapter from './Chapter.model';
import ChapterImage from './ChapterImage.model';
import Comment from './Comment.model';
import Favorite from './Favorite.model';
import Rating from './Rating.model';

// Establecer relaciones
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

Novel.belongsTo(User, { foreignKey: 'uploader_id' });
User.hasMany(Novel, { foreignKey: 'uploader_id' });

Novel.belongsTo(NovelType, { foreignKey: 'type_id' });
NovelType.hasMany(Novel, { foreignKey: 'type_id' });

Novel.belongsToMany(Genre, { through: NovelGenre, foreignKey: 'novel_id' });
Genre.belongsToMany(Novel, { through: NovelGenre, foreignKey: 'genre_id' });

Chapter.belongsTo(Novel, { foreignKey: 'novel_id' });
Novel.hasMany(Chapter, { foreignKey: 'novel_id' });

ChapterImage.belongsTo(Chapter, { foreignKey: 'chapter_id' });
Chapter.hasMany(ChapterImage, { foreignKey: 'chapter_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

Comment.belongsTo(Novel, { foreignKey: 'novel_id' });
Novel.hasMany(Comment, { foreignKey: 'novel_id' });

Comment.belongsTo(Chapter, { foreignKey: 'chapter_id' });
Chapter.hasMany(Comment, { foreignKey: 'chapter_id' });

Favorite.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Favorite, { foreignKey: 'user_id' });

Favorite.belongsTo(Novel, { foreignKey: 'novel_id' });
Novel.hasMany(Favorite, { foreignKey: 'novel_id' });

Rating.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Rating, { foreignKey: 'user_id' });

Rating.belongsTo(Novel, { foreignKey: 'novel_id' });
Novel.hasMany(Rating, { foreignKey: 'novel_id' });

export {
  sequelize,
  User,
  Role,
  Novel,
  NovelType,
  Genre,
  NovelGenre,
  Chapter,
  ChapterImage,
  Comment,
  Favorite,
  Rating
};