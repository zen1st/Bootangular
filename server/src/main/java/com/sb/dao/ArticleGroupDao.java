package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sb.pojo.ArticleGroup;

public interface ArticleGroupDao extends JpaRepository<ArticleGroup, Integer>{
	
}
