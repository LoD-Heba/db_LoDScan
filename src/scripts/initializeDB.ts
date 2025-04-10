// src/scripts/initializeDB.ts
import { Role, NovelType } from '../models';

async function initializeDatabase() {
  try {
    // Roles predefinidos del sistema
    const roles = [
      { name: 'admin', description: 'Administrador con acceso total al sistema' },
      { name: 'moderador', description: 'Modera contenido y usuarios' },
      { name: 'nuevo', description: 'Usuario recién registrado con permisos básicos' },
      { name: 'autor_principiante', description: 'Autor con menos de 5 obras publicadas' },
      { name: 'autor_promedio', description: 'Autor con experiencia y varias obras' },
      { name: 'autor_profesional', description: 'Autor verificado y reconocido' }
    ];

    // Tipos de novela predefinidos
    const novelTypes = [
      { type_name: 'Novela Ligera' },
      { type_name: 'Manga' },
      { type_name: 'Manhwa' },
      { type_name: 'Web Novel' },
      { type_name: 'Fanfiction' }
    ];

    // Insertamos solo si no existen
    await Role.bulkCreate(roles, { ignoreDuplicates: true });
    await NovelType.bulkCreate(novelTypes, { ignoreDuplicates: true });

    console.log('✅ Base de datos inicializada con roles y tipos de novela');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    process.exit(1); // Salir con error
  }
}

export default initializeDatabase;