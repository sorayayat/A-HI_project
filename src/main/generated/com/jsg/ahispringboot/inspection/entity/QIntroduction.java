package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIntroduction is a Querydsl query type for Introduction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIntroduction extends EntityPathBase<Introduction> {

    private static final long serialVersionUID = 1362379733L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QIntroduction introduction = new QIntroduction("introduction");

    public final StringPath content = createString("content");

    public final NumberPath<Long> introductionCode = createNumber("introductionCode", Long.class);

    public final QResume resume;

    public final StringPath title = createString("title");

    public QIntroduction(String variable) {
        this(Introduction.class, forVariable(variable), INITS);
    }

    public QIntroduction(Path<? extends Introduction> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QIntroduction(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QIntroduction(PathMetadata metadata, PathInits inits) {
        this(Introduction.class, metadata, inits);
    }

    public QIntroduction(Class<? extends Introduction> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.resume = inits.isInitialized("resume") ? new QResume(forProperty("resume"), inits.get("resume")) : null;
    }

}

