package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * Quser is a Querydsl query type for user
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class Quser extends EntityPathBase<user> {

    private static final long serialVersionUID = -1695658394L;

    public static final Quser user = new Quser("user");

    public final StringPath phonNumber = createString("phonNumber");

    public final ListPath<resume, Qresume> resume = this.<resume, Qresume>createList("resume", resume.class, Qresume.class, PathInits.DIRECT2);

    public final NumberPath<Long> userCode = createNumber("userCode", Long.class);

    public final StringPath userId = createString("userId");

    public final StringPath userName = createString("userName");

    public final StringPath userPwd = createString("userPwd");

    public Quser(String variable) {
        super(user.class, forVariable(variable));
    }

    public Quser(Path<? extends user> path) {
        super(path.getType(), path.getMetadata());
    }

    public Quser(PathMetadata metadata) {
        super(user.class, metadata);
    }

}

