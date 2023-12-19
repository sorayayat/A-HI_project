package com.jsg.ahispringboot.company.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPosting is a Querydsl query type for Posting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPosting extends EntityPathBase<Posting> {

    private static final long serialVersionUID = -169392494L;

    public static final QPosting posting = new QPosting("posting");

    public final StringPath closingForm = createString("closingForm");

    public final StringPath content = createString("content");

    public final StringPath endDate = createString("endDate");

    public final StringPath location = createString("location");

    public final StringPath position = createString("position");

    public final NumberPath<Integer> postingCode = createNumber("postingCode", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> postingDate = createDateTime("postingDate", java.time.LocalDateTime.class);

    public final StringPath postingTitle = createString("postingTitle");

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public QPosting(String variable) {
        super(Posting.class, forVariable(variable));
    }

    public QPosting(Path<? extends Posting> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPosting(PathMetadata metadata) {
        super(Posting.class, metadata);
    }

}

