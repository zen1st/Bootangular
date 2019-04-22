package com.sb.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.sb.dao.ArticleRepository;
import com.sb.dao.AuthorityRepository;
import com.sb.pojo.Article;
import com.sb.pojo.Authority;
import com.sb.pojo.User;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    ArticleRepository articleRepository;
    
    @Autowired
    AuthorityRepository authRepo;

    // Get All Articles
    @GetMapping("/article")
    public List<Article> getAllArticle() {
        return articleRepository.findAll();
    }
    
	// Create a new article
    @PostMapping("/article")
    public Article createArticle(@Valid @RequestBody Article article) {
        return articleRepository.save(article);
    }
    
    // Get a Single article
    @GetMapping("/article/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable(value = "id") Long articleId) {
        Article article = articleRepository.findOne(articleId);
        if(article == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(article);
    }

	// Update a article
    @PutMapping("/article/{id}")
    public ResponseEntity<Article> updateArticle(HttpServletRequest request,
    		@PathVariable(value = "id") Long articleId, 
    		@Valid @RequestBody Article articleDetails) {
        Article article = articleRepository.findOne(articleId);
        if(article == null) {
            return ResponseEntity.notFound().build();
        }
        
 
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name = user.getUsername(); //get logged in username
        
        //Prevent other users from editing your article
        if(article.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
	        article.setTitle(articleDetails.getTitle());
	        article.setContent(articleDetails.getContent());
	
	        Article updatedArticle = articleRepository.save(article);
	        return ResponseEntity.ok(updatedArticle);
        }
        else {
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    // Delete a article
    @DeleteMapping("/article/{id}")
    public ResponseEntity<Article> deleteArticle(HttpServletRequest request, @PathVariable(value = "id") Long articleId) {
        Article article = articleRepository.findOne(articleId);
        if(article == null) {
            return ResponseEntity.notFound().build();
        }

        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name = user.getUsername(); //get logged in username
        
        //Prevent other users from deleting your article
        if(article.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
        	articleRepository.delete(article);
        	return ResponseEntity.ok().build();
        }
        else {
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
}