package com.jsg.ahispringboot.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLogoEntity is a Querydsl query type for LogoEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLogoEntity extends EntityPathBase<LogoEntity> {

    private static final long serialVersionUID = 1007881359L;

    public static final QLogoEntity logoEntity = new QLogoEntity("logoEntity");

    public final NumberPath<Long> logoId = createNumber("logoId", Long.class);

    public final StringPath originalName = createString("originalName");

    public final StringPath path = createString("path");

    public final StringPath serverName = createString("serverName");

    public QLogoEntity(String variable) {
        super(LogoEntity.class, forVariable(variable));
    }

    public QLogoEntity(Path<? extends LogoEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLogoEntity(PathMetadata metadata) {
        super(LogoEntity.class, metadata);
    }

}

