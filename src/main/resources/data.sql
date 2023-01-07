-- добавление ролей
# INSERT INTO roles (name)
# SELECT 'ROLE_ADMIN'
# WHERE NOT EXISTS(
#         SELECT name FROM roles WHERE name = 'ROLE_ADMIN'
#     )
# UNION ALL
# SELECT 'ROLE_USER'
# WHERE NOT EXISTS(
#         SELECT name FROM roles WHERE name = 'ROLE_USER'
#     );
#
# -- добавление пользователей
# INSERT INTO users (first_name,
#                    last_name,
#                    age,
#                    email,
#                    password)
# SELECT 'q', 'Admin', '1', 'C', '$2a$12$NE368iuJjxJ5KqP7vshvEOAarG4Fedd4Mlf8HTNIMKA22jKEpEkL6'
# WHERE NOT EXISTS(
#         SELECT first_name FROM users WHERE first_name = 'q'
#     )
# UNION ALL
# SELECT 'w', 'User', '2', 'user@user.com', '$2a$10$bCitI3RzxHX.3xKx9cXVQuIeCwJUxCzHdxnk3QuuSe0GIrFZdwa.2'
# WHERE NOT EXISTS(
#         SELECT first_name FROM users WHERE first_name = 'w'
#     );
#
#
# -- связь роль с пользователями
# INSERT INTO users_roles (user_id,
#                          role_id)
# SELECT '1', '1'
# WHERE NOT EXISTS(
#         SELECT user_id FROM users_roles WHERE user_id = '1'
#     )
# UNION ALL
# SELECT '2', '2'
# WHERE NOT EXISTS(
#         SELECT user_id FROM users_roles WHERE user_id = '2'
#     );
