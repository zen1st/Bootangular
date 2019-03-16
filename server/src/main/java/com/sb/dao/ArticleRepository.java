package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sb.pojo.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

}
