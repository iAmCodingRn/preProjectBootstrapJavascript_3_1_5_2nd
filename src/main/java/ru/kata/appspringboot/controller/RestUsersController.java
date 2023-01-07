package ru.kata.appspringboot.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestWrapper;
import org.springframework.web.bind.annotation.*;
import ru.kata.appspringboot.entity.Role;
import ru.kata.appspringboot.entity.User;
import ru.kata.appspringboot.repository.RoleRepository;
import ru.kata.appspringboot.repository.UserRepository;
import ru.kata.appspringboot.service.UserServiceImpl;

import java.security.Principal;
import java.util.Collection;


@RestController
@AllArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api")
public class RestUsersController {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserServiceImpl userService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @GetMapping("users")
    @ResponseStatus(HttpStatus.OK)
    public Collection<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("roles")
    @ResponseStatus(HttpStatus.OK)
    public Collection<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN') || hasRole('USER')")
    @GetMapping("users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getOne(@PathVariable Long id, SecurityContextHolderAwareRequestWrapper request, Principal principal) {
        boolean isAdmin = request.isUserInRole("ROLE_ADMIN");
        return isAdmin ? userRepository.findFirstById(id) : userRepository.findFirstByEmail(principal.getName());
    }

    @PostMapping("/users")
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(userRepository.findFirstByEmail(user.getEmail()), HttpStatus.OK);
    }

    @PatchMapping("users/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(path = "users/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userRepository.delete(userRepository.findFirstById(id));
        return ResponseEntity.ok("user deleted");
    }

}