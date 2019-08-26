package com.sb.rest;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.primitives.Doubles;
import com.sb.dao.TestEntityDao;
import com.sb.dto.TestEntityDto;
import com.sb.pojo.TestEntity;
import com.sb.service.TestEntityService;

@RestController
@RequestMapping("/api/testEntities")
public class TestEntityCtrl {
	
	@Autowired
    private TestEntityService testEntityService;

	@Autowired
    private TestEntityDao testEntityDao;
	
    @GetMapping
    public ResponseEntity<List<TestEntity>> findAll() {
        return ResponseEntity.ok(testEntityService.findAll());
    }

    @PostMapping
    public ResponseEntity create(@RequestBody TestEntityDto testEntityDto) {

    	if(Doubles.tryParse(testEntityDto.getNumber())!=null)
    	{
        	TestEntity tE = new TestEntity();
        	tE.setName(testEntityDto.getName());
    		tE.setNumber(Double.parseDouble(testEntityDto.getNumber()));
            return ResponseEntity.ok(testEntityService.save(tE));
    	}
    	
    	return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestEntity> findById(@PathVariable Long id) {
        Optional<TestEntity> testEntity = testEntityService.findById(id);
        if (!testEntity.isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(testEntity.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestEntity> update(@PathVariable Long id, @Valid @RequestBody TestEntityDto testEntityDto) {
    	
        
        //System.out.println(testEntity.getId());
    	
    	if(Doubles.tryParse(testEntityDto.getNumber())!=null)
    	{
            if (!testEntityService.findById(id).isPresent()) {
                //log.error("Id " + id + " is not existed");
                ResponseEntity.badRequest().build();
            }

        	TestEntity tE =  testEntityService.findById(id).get();
        	
        	tE.setName(testEntityDto.getName());
    		tE.setNumber(Double.parseDouble(testEntityDto.getNumber()));      
            return ResponseEntity.ok(testEntityService.save(tE));
    	}
    	
    	return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        if (!testEntityService.findById(id).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        testEntityService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
