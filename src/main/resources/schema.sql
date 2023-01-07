-- таблица со списком пользователей
# CREATE TABLE IF NOT EXISTS users
# (
#     id         BIGINT AUTO_INCREMENT NOT NULL,
#     first_name VARCHAR(256)          NOT NULL,
#     last_name  VARCHAR(256)          NOT NULL,
#     age        SMALLINT              NOT NULL,
#     email      VARCHAR(256)          NOT NULL,
#     password   VARCHAR(64)           NOT NULL,
#     CONSTRAINT pk_users PRIMARY KEY (id)
# );
# ALTER TABLE users ADD UNIQUE INDEX (email);
# # ALTER TABLE users ADD UNIQUE INDEX (password);
# # CREATE UNIQUE INDEX email ON users (email);
# # CREATE UNIQUE INDEX password ON users (password);
#
# -- таблица с ролями
# CREATE TABLE IF NOT EXISTS roles
# (
#     id   BIGINT AUTO_INCREMENT NOT NULL,
#     name VARCHAR(256)          NOT NULL,
#     CONSTRAINT pk_roles PRIMARY KEY (id)
# );
# ALTER TABLE roles ADD UNIQUE INDEX (name);
# # CREATE UNIQUE INDEX name ON roles (name);
#
# -- таблица связь пользователей с ролями
# CREATE TABLE IF NOT EXISTS users_roles
# (
#     role_id BIGINT NOT NULL,
#     user_id BIGINT NOT NULL,
#     CONSTRAINT pk_users_roles PRIMARY KEY (role_id, user_id),
#     CONSTRAINT fk_userol_on_role FOREIGN KEY (role_id) REFERENCES roles (id),
#     CONSTRAINT fk_userol_on_user FOREIGN KEY (user_id) REFERENCES users (id)
# );
#
# # ALTER TABLE users_roles
# #     ADD CONSTRAINT fk_userol_on_role
# #         FOREIGN KEY (role_id) REFERENCES roles (id);
# # ALTER TABLE users_roles
# #     ADD CONSTRAINT fk_userol_on_user
# #         FOREIGN KEY (user_id) REFERENCES users (id);
