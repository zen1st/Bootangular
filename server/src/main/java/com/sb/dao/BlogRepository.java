package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sb.pojo.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

}
