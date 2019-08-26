package com.sb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sb.dao.TestEntityDao;
import com.sb.pojo.TestEntity;

@Service
public class TestEntityService {
	
		@Autowired
	    private TestEntityDao testEntityDao;

	    public List<TestEntity> findAll() {
	        return testEntityDao.findAll();
	    }

	    public Optional<TestEntity> findById(Long id) {
	        return testEntityDao.findById(id);
	    }

	    public TestEntity save(TestEntity testEntity) {
	        return testEntityDao.save(testEntity);
	    }

	    public void deleteById(Long id) {
	    	testEntityDao.deleteById(id);
	    }
}
