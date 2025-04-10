CREATE DATABASE IF NOT EXISTS lod_scan;
USE lod_scan;

#Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderador', 'nuevo') DEFAULT 'nuevo',
    avatar VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#Tabla de Tipos de Novela (Novela, Manga, Manhwa)
CREATE TABLE IF NOT EXISTS novel_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL  #Ejemplo: "Novela Ligera", "Manga", "Manhwa"
);

#Tabla de Géneros
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

#Tabla de Novelas
CREATE TABLE IF NOT EXISTS novels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,  #Para URLs amigables
    author VARCHAR(100) NOT NULL,
    synopsis TEXT NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),  #Ruta de la imagen de portada
    status ENUM('ongoing', 'completed', 'hiatus') DEFAULT 'ongoing',
    uploader_id INT NOT NULL,
    type_id INT NOT NULL, #Se relaciona con novel_types
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploader_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES novel_types(id) ON DELETE CASCADE
);

#Relación Novelas - Géneros
CREATE TABLE IF NOT EXISTS novel_genres (
    novel_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (novel_id, genre_id),
    FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

# Tabla de Capítulos
CREATE TABLE IF NOT EXISTS chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    novel_id INT NOT NULL,
    chapter_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE
);

#Tabla para almacenar imágenes de capítulos (para mangas/manhwas)
CREATE TABLE IF NOT EXISTS chapter_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,  -- Ruta de la imagen
    position INT NOT NULL,  -- Posición en el capítulo
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);

# Tabla de Comentarios
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    chapter_id INT DEFAULT NULL,  # Puede ser a la novela o a un capítulo específico
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);

# Tabla de Favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, novel_id),  # Un usuario no puede marcar como favorito la misma novela dos veces
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE
);

#Tabla de Ratings
CREATE TABLE IF NOT EXISTS ratings (
    user_id INT NOT NULL,
    novel_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    PRIMARY KEY (user_id, novel_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE CASCADE
);
