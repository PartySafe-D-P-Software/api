CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(2) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_departments_name(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS provinces (
  id VARCHAR(4) NOT NULL,
  name VARCHAR(45) NOT NULL,
  department_id VARCHAR(2) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_provinces_name_department_id(name, department_id),
  KEY IX_provinces_department_id(department_id),
  CONSTRAINT FK_provinces_department_id FOREIGN KEY(department_id) REFERENCES departments(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS districts (
  id VARCHAR(6) NOT NULL,
  name VARCHAR(45) NOT NULL,
  province_id VARCHAR(4) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_districts_name_province_id(name, province_id),
  KEY IX_districts_province_id(province_id),
  CONSTRAINT FK_districts_province_id FOREIGN KEY(province_id) REFERENCES provinces(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS users(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('C', 'O') NOT NULL DEFAULT 'C',
  phone VARCHAR(9) NULL UNIQUE,
  email VARCHAR(100) NULL UNIQUE,
  password VARCHAR(50) NULL,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  dni VARCHAR(8) NULL UNIQUE,
  local_name VARCHAR(100) NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS security_contacts(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(9) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT FK_security_contacts_user_id FOREIGN KEY(user_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS cards(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  holder_name VARCHAR(50) NOT NULL,
  card_number VARCHAR(16) NOT NULL UNIQUE,
  exp_date DATE NOT NULL,
  email VARCHAR(50) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT FK_cards_user_id FOREIGN KEY(user_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS events(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  district_id VARCHAR(6) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT FK_events_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT FK_events_district_id FOREIGN KEY(district_id) REFERENCES districts(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tickets(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  information TEXT NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  event_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT FK_tickets_user_id FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT FK_tickets_event_id FOREIGN KEY(event_id) REFERENCES events(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS security_centers(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(9) NOT NULL UNIQUE,
  type ENUM ('P', 'H', 'C') NOT NULL DEFAULT 'P',
  district_id VARCHAR(6) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT FK_security_centers_district_id FOREIGN KEY(district_id) REFERENCES districts(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;