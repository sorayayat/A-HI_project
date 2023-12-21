package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QResume is a Querydsl query type for Resume
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResume extends EntityPathBase<Resume> {

    private static final long serialVersionUID = 1545329704L;

    public static final QResume resume = new QResume("resume");

    public final StringPath createDate = createString("createDate");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath modifyDate = createString("modifyDate");

    public final NumberPath<Long> resumeCode = createNumber("resumeCode", Long.class);

    public final StringPath resumePath = createString("resumePath");

    public QResume(String variable) {
        super(Resume.class, forVariable(variable));
    }

    public QResume(Path<? extends Resume> path) {
        super(path.getType(), path.getMetadata());
    }

    public QResume(PathMetadata metadata) {
        super(Resume.class, metadata);
    }

}

