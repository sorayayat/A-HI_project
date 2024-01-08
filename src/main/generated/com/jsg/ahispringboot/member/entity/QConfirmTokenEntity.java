package com.jsg.ahispringboot.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConfirmTokenEntity is a Querydsl query type for ConfirmTokenEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConfirmTokenEntity extends EntityPathBase<ConfirmTokenEntity> {

    private static final long serialVersionUID = -69310851L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConfirmTokenEntity confirmTokenEntity = new QConfirmTokenEntity("confirmTokenEntity");

    public final QMemberEntity memberEntity;

    public final StringPath token = createString("token");

    public QConfirmTokenEntity(String variable) {
        this(ConfirmTokenEntity.class, forVariable(variable), INITS);
    }

    public QConfirmTokenEntity(Path<? extends ConfirmTokenEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConfirmTokenEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConfirmTokenEntity(PathMetadata metadata, PathInits inits) {
        this(ConfirmTokenEntity.class, metadata, inits);
    }

    public QConfirmTokenEntity(Class<? extends ConfirmTokenEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberEntity = inits.isInitialized("memberEntity") ? new QMemberEntity(forProperty("memberEntity"), inits.get("memberEntity")) : null;
    }

}

