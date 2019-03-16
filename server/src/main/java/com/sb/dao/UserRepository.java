package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.User;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername( String username );
    
    User findByEmail(String email);

    @Override
    void delete(User user);
}

