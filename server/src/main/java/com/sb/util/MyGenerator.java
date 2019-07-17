package com.sb.util;

import java.io.Serializable;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class MyGenerator implements IdentifierGenerator {

    public static final String generatorName = "myGenerator";

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		RandomString gen = new RandomString(8, ThreadLocalRandom.current());
		return gen.toString().replace("-", "");// UUID.randomUUID().toString().replace("-", "");
	}
}