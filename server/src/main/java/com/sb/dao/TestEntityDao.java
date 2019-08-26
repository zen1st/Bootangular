package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.TestEntity;

public interface TestEntityDao extends JpaRepository<TestEntity, Long> {
}