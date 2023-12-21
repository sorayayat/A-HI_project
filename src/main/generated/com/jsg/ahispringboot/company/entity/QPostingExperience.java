package com.jsg.ahispringboot.company.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostingExperience is a Querydsl query type for PostingExperience
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostingExperience extends EntityPathBase<PostingExperience> {

    private static final long serialVersionUID = -433197668L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostingExperience postingExperience = new QPostingExperience("postingExperience");

    public final NumberPath<Integer> experienceCode = createNumber("experienceCode", Integer.class);

    public final StringPath experienceLevel = createString("experienceLevel");

    public final QPosting posting;

    public QPostingExperience(String variable) {
        this(PostingExperience.class, forVariable(variable), INITS);
    }

    public QPostingExperience(Path<? extends PostingExperience> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostingExperience(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostingExperience(PathMetadata metadata, PathInits inits) {
        this(PostingExperience.class, metadata, inits);
    }

    public QPostingExperience(Class<? extends PostingExperience> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.posting = inits.isInitialized("posting") ? new QPosting(forProperty("posting"), inits.get("posting")) : null;
    }

}

