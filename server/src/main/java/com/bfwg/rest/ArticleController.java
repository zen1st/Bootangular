package com.bfwg.rest;

import com.bfwg.model.Article;
import com.bfwg.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    ArticleRepository articleRepository;

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
    public ResponseEntity<Article> updateArticle(@PathVariable(value = "id") Long articleId, 
                                           @Valid @RequestBody Article articleDetails) {
        Article article = articleRepository.findOne(articleId);
        if(article == null) {
            return ResponseEntity.notFound().build();
        }
        
        System.out.println(article.getCreatedBy());
        
        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());

        Article updatedArticle = articleRepository.save(article);
        return ResponseEntity.ok(updatedArticle);
    }

    // Delete a article
    @DeleteMapping("/article/{id}")
    public ResponseEntity<Article> deleteArticle(@PathVariable(value = "id") Long articleId) {
        Article article = articleRepository.findOne(articleId);
        if(article == null) {
            return ResponseEntity.notFound().build();
        }

        articleRepository.delete(article);
        return ResponseEntity.ok().build();
    }
}