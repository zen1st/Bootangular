package com.sb.util;

import org.hibernate.Session;
import org.hibernate.tuple.ValueGenerator;
import org.springframework.security.core.context.SecurityContextHolder;

public class LoggedUserGenerator implements ValueGenerator<String> {
	@Override
	public String generateValue(Session session, Object owner) {
		// TODO Auto-generated method stub
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
}