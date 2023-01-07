package ru.kata.appspringboot.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.appspringboot.repository.UserRepository;
import ru.kata.appspringboot.service.UserServiceImpl;
import ru.kata.appspringboot.entity.User;
import ru.kata.appspringboot.repository.RoleRepository;

@Controller
@AllArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin")
public class AdminController {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserServiceImpl userService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @GetMapping()
    public String index(Model model, User user) {
        model.addAttribute("title", "Admin panel");
        model.addAttribute("user", user);
        model.addAttribute("users", userRepository.findAll());
        model.addAttribute("roles", roleRepository.findAll());
        return "users/index";
    }

    @GetMapping("/users/{id}")
    public String show(@PathVariable("id") long id, Model model) {
        model.addAttribute("title", "User information-page");
        model.addAttribute("users", userRepository.findAll());
        model.addAttribute("user", userRepository.findFirstById(id));
        return "users/show";
    }

    @PostMapping()
    public String create(@ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@ModelAttribute("user") User user) {
        userRepository.delete(user);
        return "redirect:/admin";
    }

}