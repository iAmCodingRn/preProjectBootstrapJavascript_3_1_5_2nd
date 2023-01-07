package ru.kata.appspringboot.util;

import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import ru.kata.appspringboot.entity.Role;
import ru.kata.appspringboot.entity.User;
import ru.kata.appspringboot.repository.RoleRepository;
import ru.kata.appspringboot.repository.UserRepository;
import ru.kata.appspringboot.service.UserServiceImpl;

import java.util.*;

@Component
@AllArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserServiceImpl userService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        final Role adminRole = createRoleIfNotFound("ROLE_ADMIN");
        final Role userRole = createRoleIfNotFound("ROLE_USER");

        createUserIfNotFound(
                "q",
                "Admin",
                (byte) 1,
                "q@q.q",
                "q",
                new HashSet<>(Collections.singletonList(roleRepository.findFirstByName("ROLE_ADMIN"))));

        createUserIfNotFound(
                "w",
                "User",
                (byte) 2,
                "w@w.w",
                "w",
                new HashSet<>(Collections.singletonList(roleRepository.findFirstByName("ROLE_USER"))));

        createUserIfNotFound(
                "e",
                "User",
                (byte) 3,
                "e@e.e",
                "e",
                new HashSet<Role>(Arrays.asList(
                        roleRepository.findFirstByName("ROLE_ADMIN"),
                        roleRepository.findFirstByName("ROLE_USER"))));

    }

    protected Role createRoleIfNotFound(final String name) {
        Role role = roleRepository.findFirstByName(name);
        if (role == null) {
            role = new Role();
            role.setName(name);
            role = roleRepository.save(role);
        }
        return role;
    }

    protected void createUserIfNotFound(String firstName, String lastName, Byte age, String email, String password, Collection<Role> roles) {
        User user = userRepository.findFirstByFirstName(firstName);
        if (user == null) {
            user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setAge(age);
            user.setPassword(password);
            user.setEmail(email);
        }
        Objects.requireNonNull(user).setRoles(roles);
        userService.save(user);
    }

}
