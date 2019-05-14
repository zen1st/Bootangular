package com.sb.pojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ArticleGroupAuthor")
public class ArticleGroupAuthor {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "articleGroup_id")
    ArticleGroup articleGroup;
 
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
