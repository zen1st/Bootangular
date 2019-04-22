package com.sb.rest;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import com.sb.dao.ArticleRepository;
import com.sb.pojo.Article;
import com.sb.pojo.User;

@Controller
public class ArticleUiCtrl {
	
    @Autowired
    ArticleRepository articleRepository;
    
    @Autowired
    private MessageSource messages;
    
    // Get a Single article
    @GetMapping("/article/edit/{id}")
    public ModelAndView editArticleById(HttpServletRequest request,
    		@PathVariable(value = "id") Long articleId) {
    	
    	Locale locale = request.getLocale();
    	
        Article article = articleRepository.findOne(articleId);
        
        if(article == null) {
            ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/404");
            return modelAndView;
            
        }
       
        User user;
        String name="";
        
        //Prevents ERR_TOO_MANY_REDIRECTS
        if(!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")){
            user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            name = user.getUsername(); //get logged in username
        }
        
        if(article.getCreatedBy().equals(name) || request.isUserInRole("ROLE_ADMIN")){
        	ModelAndView modelAndView = new ModelAndView();
        	return modelAndView;
        }
        else {
	        ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/403");
	        return modelAndView;
        }
    }
    
    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
