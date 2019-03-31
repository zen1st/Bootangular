package com.sb.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by fan.jin on 2017-05-08.
 */

@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class PublicController {

    @RequestMapping( method = GET, value= "/foo")
    public Map<String, String> getFoo(HttpServletRequest request) {
    	
        Map<String, String> fooObj = new HashMap<>();
        fooObj.put("foo", "bar");
        return fooObj;
    }

}
