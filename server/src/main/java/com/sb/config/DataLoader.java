package com.sb.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.sb.dao.AuthorityRepository;
import com.sb.dao.UserRepository;
import com.sb.pojo.Authority;
import com.sb.pojo.User;

@Component
public class DataLoader implements ApplicationRunner {

	//@Autowired
    private UserRepository userRepository;
	
	//@Autowired
    private AuthorityRepository authorityRepository;
	
	
    @Autowired
    public DataLoader(UserRepository userRepository, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
    }

    public void run(ApplicationArguments args) {
    	/*
    	User admin = new User();
    	admin.setUsername("admin");
    	admin.setPassword("$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra");
    	
    	Authority adminAuthority = new Authority();
    	adminAuthority.setName("ROLE_ADMIN");

    	Authority userAuthority = new Authority();
    	adminAuthority.setName("ROLE_USER");
    	
    	Collection<Authority> authorities = new ArrayList<Authority>();
    	authorities.add(authorityRepository.save(adminAuthority));
    	authorities.add(authorityRepository.save(userAuthority));

		admin.setAuthorities(authorities);
		
		userRepository.save(admin);
		
    	//System.out.println("hey");
        /*
        if (System.getProperty("RDS_HOSTNAME") != null) {
            try {
            Class.forName("org.postgresql.Driver");
            String dbName = System.getProperty("RDS_DB_NAME");
            String userName = System.getProperty("RDS_USERNAME");
            String password = System.getProperty("RDS_PASSWORD");
            String hostname = System.getProperty("RDS_HOSTNAME");
            String port = System.getProperty("RDS_PORT");
            String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName + "?user=" + userName + "&password=" + password;
            //logger.trace("Getting remote connection with connection string from environment variables.");
            Connection con = DriverManager.getConnection(jdbcUrl);
            //logger.info("Remote connection successful.");
            
            Statement setupStatement = con.createStatement();
            
            String insertRow1 = "INSERT INTO user (id, username, password, enabled, disabled) VALUES (1, 'admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', true, false);";
            String insertRow2 = "INSERT INTO authority (id, name) VALUES (1, 'ROLE_USER');";
            String insertRow3 = "INSERT INTO authority (id, name) VALUES (1, 'ROLE_ADMIN');";
            String insertRow4 = "INSERT INTO user_authority (user_id, authority_id) VALUES (1, 1);";
            String insertRow5 = "INSERT INTO user_authority (user_id, authority_id) VALUES (1, 2);";
            
            setupStatement.addBatch(insertRow1);
            setupStatement.addBatch(insertRow2);
            setupStatement.addBatch(insertRow3);
            setupStatement.addBatch(insertRow4);
            setupStatement.addBatch(insertRow5);
            
            setupStatement.executeBatch();
            setupStatement.close();
            
            //return con;
          }
          catch (ClassNotFoundException e) { //logger.warn(e.toString());
          }
          catch (SQLException e) { //logger.warn(e.toString());}
          }
        }*/
    }
}