package com.jsg.ahispringboot.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostingLike is a Querydsl query type for PostingLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostingLike extends EntityPathBase<PostingLike> {

    private static final long serialVersionUID = 68693752L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostingLike postingLike = new QPostingLike("postingLike");

    public final QMemberEntity memberEntity;

    public final com.jsg.ahispringboot.company.entity.QPosting posting;

    public QPostingLike(String variable) {
        this(PostingLike.class, forVariable(variable), INITS);
    }

    public QPostingLike(Path<? extends PostingLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostingLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostingLike(PathMetadata metadata, PathInits inits) {
        this(PostingLike.class, metadata, inits);
    }

    public QPostingLike(Class<? extends PostingLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberEntity = inits.isInitialized("memberEntity") ? new QMemberEntity(forProperty("memberEntity"), inits.get("memberEntity")) : null;
        this.posting = inits.isInitialized("posting") ? new com.jsg.ahispringboot.company.entity.QPosting(forProperty("posting"), inits.get("posting")) : null;
    }

}

