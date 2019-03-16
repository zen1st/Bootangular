package com.sb.service;

import java.util.List;

import com.sb.pojo.Authority;

public interface AuthorityService {
  List<Authority> findById(Long id);

  List<Authority> findByname(String name);

}
