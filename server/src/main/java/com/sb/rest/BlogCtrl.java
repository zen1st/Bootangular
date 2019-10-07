package com.sb.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.sb.dao.BlogRepository;
import com.sb.dao.AuthorityRepository;
import com.sb.dto.BlogDto;
import com.sb.pojo.Blog;
import com.sb.pojo.Authority;
import com.sb.pojo.User;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogCtrl {

    @Autowired
    BlogRepository blogRepository;
    
    @Autowired
    AuthorityRepository authRepo;

    // Get all articles
    @GetMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Blog> getAllArticle() {
        return blogRepository.findAll();
    }
    
	// Create a new article
    @PostMapping("/blogs")
    public Blog createArticle(@Valid @RequestBody Blog blog) {
        return blogRepository.save(blog);
    }
    
    // Get a single article
    @GetMapping("/blogs/{id}")
    public ResponseEntity<BlogDto> getArticleById(HttpServletRequest request,@PathVariable(value = "id") Long articleId) {
    	Blog blog = blogRepository.getOne(articleId);
    	
        if(blog == null) {
            return ResponseEntity.notFound().build();
        }
        
    	BlogDto blogDto = new BlogDto();
    	
    	//articleDto.setId(article.getId());
    	blogDto.setTitle(blog.getTitle());
    	blogDto.setCreatedBy(blog.getCreatedBy());
    	blogDto.setCreatedAt(blog.getCreatedAt());
    	blogDto.setContent(blog.getContent());
    	
        User user;
        String name="";
        
        //Prevents ERR_TOO_MANY_REDIRECTS
        if(!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")){
            user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            name = user.getUsername(); //get logged in username
        }
        
        if(blog.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
        	blogDto.setEditable(true);
        }
        else {
        	blogDto.setEditable(false);
        }
        return ResponseEntity.ok().body(blogDto);
    }

	// Update a article
    @PutMapping("/blogs/{id}")
    public ResponseEntity<Blog> updateArticle(HttpServletRequest request,
    		@PathVariable(value = "id") Long articleId, 
    		@Valid @RequestBody Blog blogDetails) {
        Blog blog = blogRepository.getOne(articleId);
        if(blog == null) {
            return ResponseEntity.notFound().build();
        }
        
 
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name = user.getUsername(); //get logged in username
        
        //Prevent other users from editing your article
        if(blog.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
	        blog.setTitle(blogDetails.getTitle());
	        blog.setContent(blogDetails.getContent());
	
	        Blog updatedArticle = blogRepository.save(blog);
	        return ResponseEntity.ok(updatedArticle);
        }
        else {
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    // Delete a article
    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Blog> deleteArticle(HttpServletRequest request, @PathVariable(value = "id") Long articleId) {
        Blog blog = blogRepository.getOne(articleId);
        if(blog == null) {
            return ResponseEntity.notFound().build();
        }

        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name = user.getUsername(); //get logged in username
        
        //Prevent other users from deleting your article
        if(blog.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
        	blogRepository.delete(blog);
        	return ResponseEntity.ok().build();
        }
        else {
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
}