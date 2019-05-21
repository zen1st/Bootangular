package com.sb.rest;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;

import org.openqa.selenium.By;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScrapCtrl {

    @RequestMapping(value="/api/scrap/1", method = RequestMethod.GET)
    public String  scrapTitle(){
    	java.util.logging.Logger.getLogger("c.g.htmlunit").setLevel(Level.OFF);
    	
    	HtmlUnitDriver driver = new HtmlUnitDriver(); 
    	
    	driver.get("https://www.facebook.com/");
    	
    	WebElement username = driver.findElement(By.cssSelector("#email"));
    	WebElement password = driver.findElement(By.cssSelector("#pass"));
    	WebElement loginbutton = driver.findElement(By.cssSelector("#loginbutton input"));
    	
    	username.sendKeys("ezeng1010@hotmail.com");
    	password.sendKeys("3699357fez");
    	loginbutton.click();
    	
    	driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS);
    	
    	WebElement name = driver.findElement(By.cssSelector("div[data-click=\"profile_icon\"]"));

    	
    	return name.getText();
    	
    	//return driver.getTitle();
    }
    
    /*
    public String  scrapTitle(){
    	HtmlUnitDriver driver = new HtmlUnitDriver(); 
    	
    	driver.get("https://www.facebook.com/");
    	
    	WebElement username = driver.findElement(By.cssSelector("#email"));
    	WebElement password = driver.findElement(By.cssSelector("#pass"));
    	WebElement loginbutton = driver.findElement(By.cssSelector("#loginbutton input"));
    	
    	username.sendKeys("ezeng1010@hotmail.com");
    	password.sendKeys("erikzeng3699357");
    	loginbutton.click();
    	
    	driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS);
    	
    	return driver.getTitle();
    }*/
    
    @RequestMapping(value="/api/scrap/2", method = RequestMethod.GET)
    public String scrap2(){
    	
    	HtmlUnitDriver driver = new HtmlUnitDriver(); 
    	
    	java.util.logging.Logger.getLogger("com.gargoylesoftware").setLevel(Level.OFF); 
    	
    	//Set up proxy
    	Proxy proxy = new Proxy();
    	proxy.setHttpProxy("103.1.93.135:41426"); 
    	proxy.setSslProxy("186.208.71.242:51476"); 
    	driver.setProxySettings(proxy);
    	
    	//Url navigation
    	driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS);
    	driver.get("https://www.expressvpn.com/what-is-my-ip");
    	
    	System.out.println(driver.getTitle());
    	//Event
    	WebElement we1 = driver.findElement(By.cssSelector(".tool-panel__body"));
    	
    	return we1.getText();
    	
    }
    
    @RequestMapping(value="/api/scrap/3", method = RequestMethod.GET)
    public String scrap3(){
    	
    	HtmlUnitDriver driver = new HtmlUnitDriver(); 
    	
    	java.util.logging.Logger.getLogger("com.gargoylesoftware").setLevel(Level.OFF); 
    	
    	//Set up proxy
    	Proxy proxy = new Proxy();
    	proxy.setHttpProxy("103.1.93.135:41426"); 
    	proxy.setSslProxy("186.208.71.242:51476"); 
    	driver.setProxySettings(proxy);
    	
    	//Url navigation
    	driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS);
    	driver.get("https://www.facebook.com/");
    	
    	WebElement username = driver.findElement(By.cssSelector("#email"));
    	WebElement password = driver.findElement(By.cssSelector("#pass"));
    	WebElement loginbutton = driver.findElement(By.cssSelector("#loginbutton input"));
    	
    	username.sendKeys("ezeng1010@hotmail.com");
    	password.sendKeys("erikzeng3699357");
    	loginbutton.click();
    	
    	
    	WebElement we1 = driver.findElement(By.cssSelector(".noCount"));
    	
    	return we1.getText();
    	
    }
    
    @RequestMapping(value="/api/scrap/4", method = RequestMethod.GET)
    public String scrap4(){
    	
    	HtmlUnitDriver driver = new HtmlUnitDriver(); 
    	
    	java.util.logging.Logger.getLogger("com.gargoylesoftware").setLevel(Level.OFF); 
    	
    	//Set up proxy
    	Proxy proxy = new Proxy();
    	proxy.setHttpProxy("103.1.93.135:41426"); 
    	proxy.setSslProxy("186.208.71.242:51476"); 
    	driver.setProxySettings(proxy);
    	
    	//Url navigation
    	driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS);
    	driver.get("https://onehallyu.com/index.php?app=core&module=global&section=login");
    	
    	WebElement username = driver.findElement(By.cssSelector("#ips_username"));
    	WebElement password = driver.findElement(By.cssSelector("#ips_password"));
    	WebElement loginbutton = driver.findElement(By.cssSelector(".submit input"));
    	
    	username.sendKeys("realisticzenist");
    	password.sendKeys("oez3699357");
    	loginbutton.click();
    	
    	System.out.println(driver.getTitle());
    	
    	WebElement we1 = driver.findElement(By.cssSelector("#user_link"));
    	
    	return we1.getAttribute("href");
    	
    }

}

