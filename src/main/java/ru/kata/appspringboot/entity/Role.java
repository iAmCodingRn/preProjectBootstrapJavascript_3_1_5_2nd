package ru.kata.appspringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;

@JsonIgnoreProperties(ignoreUnknown = true, value = {"users"})
@Table(name = "roles", indexes = {
        @Index(name = "name", columnList = "name", unique = true)
})
@Entity
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    private Collection<User> users;

    @Override
    public String getAuthority() {
        return getName();
    }

}