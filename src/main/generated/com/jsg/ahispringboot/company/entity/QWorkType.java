package com.jsg.ahispringboot.company.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWorkType is a Querydsl query type for WorkType
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWorkType extends EntityPathBase<WorkType> {

    private static final long serialVersionUID = -1678985061L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWorkType workType = new QWorkType("workType");

    public final QPosting posting;

    public final NumberPath<Integer> workCode = createNumber("workCode", Integer.class);

    public final StringPath workConditions = createString("workConditions");

    public QWorkType(String variable) {
        this(WorkType.class, forVariable(variable), INITS);
    }

    public QWorkType(Path<? extends WorkType> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWorkType(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWorkType(PathMetadata metadata, PathInits inits) {
        this(WorkType.class, metadata, inits);
    }

    public QWorkType(Class<? extends WorkType> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.posting = inits.isInitialized("posting") ? new QPosting(forProperty("posting"), inits.get("posting")) : null;
    }

}

