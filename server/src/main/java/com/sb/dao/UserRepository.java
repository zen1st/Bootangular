package com.sb.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername( String username );
    
    User findByEmail(String email);

    @Override
    void delete(User user);

	Optional<User> findById(long id);
}

