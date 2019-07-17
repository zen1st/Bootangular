package com.sb.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

@Configuration
public class AppConfig {

	@Value("${spring.datasource.driver-class-name}") private String className;
	@Value("${spring.jpa.properties.hibernate.dialect}") private String dialect; 
	@Value("${spring.datasource.url}") private String url; 
	@Value("${spring.datasource.username}") private String username; 
	@Value("${spring.datasource.password}") private String password; 
	@Value("${hibernate.hbm2ddl.auto}") private String hbm2ddl; 
	
	  @Bean(name="entityManagerFactory")
	  public LocalSessionFactoryBean getSessionFactory() {
	    LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();

	    Properties props = new Properties();

	    // Setting JDBC properties
	    //...

	    // Setting Hibernate properties
	    props.setProperty("hibernate.connection.driver_class", className);
	    props.setProperty("hibernate.dialect", dialect);
	    props.setProperty("hibernate.connection.url", url);
	    props.setProperty("hibernate.connection.username", username);
	    props.setProperty("hibernate.connection.password", password);

	    //props.setProperty("hibernate.show_sql", "true");
	    props.setProperty("hibernate.hbm2ddl.auto", hbm2ddl);
	    
	    /*
	    # Hibernate properties
	    hibernate.show_sql=true
	    hibernate.hbm2ddl.auto=validate
	    
	    #C3P0 properties
	    hibernate.c3p0.min_size=5
	    hibernate.c3p0.max_size=20
	    hibernate.c3p0.acquire_increment=1
	    hibernate.c3p0.timeout=1800
	    hibernate.c3p0.max_statements=150
	    */
	    
	    // Setting C3P0 properties
	    //props.setProperty("hibernate.c3p0.min_size", "5");
	    //props.setProperty("hibernate.c3p0.max_size", "20");
	   // props.setProperty("hibernate.c3p0.acquire_increment", "1");
	    //props.setProperty("hibernate.c3p0.timeout", "1800");
	    //props.setProperty("hibernate.c3p0.max_statements", "150");
	    
	    factoryBean.setHibernateProperties(props);
	    factoryBean.setPackagesToScan(new String[] { "com.sb.pojo" });
	    return factoryBean;
	  }

	}