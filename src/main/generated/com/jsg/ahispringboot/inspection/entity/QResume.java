package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QResume is a Querydsl query type for Resume
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResume extends EntityPathBase<Resume> {

    private static final long serialVersionUID = 1545329704L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QResume resume = new QResume("resume");

    public final StringPath createDate = createString("createDate");

    public final com.jsg.ahispringboot.member.entity.QMemberEntity member;

    public final StringPath modifyDate = createString("modifyDate");

    public final NumberPath<Long> resumeCode = createNumber("resumeCode", Long.class);

    public final StringPath resumePath = createString("resumePath");

    public QResume(String variable) {
        this(Resume.class, forVariable(variable), INITS);
    }

    public QResume(Path<? extends Resume> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QResume(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QResume(PathMetadata metadata, PathInits inits) {
        this(Resume.class, metadata, inits);
    }

    public QResume(Class<? extends Resume> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.jsg.ahispringboot.member.entity.QMemberEntity(forProperty("member"), inits.get("member")) : null;
    }

}

