package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
  Authority findByName(String name);

  @Override
  void delete(Authority role);
}
