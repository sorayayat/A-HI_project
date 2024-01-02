package com.jsg.ahispringboot.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanyEntity is a Querydsl query type for CompanyEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanyEntity extends EntityPathBase<CompanyEntity> {

    private static final long serialVersionUID = -33261569L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanyEntity companyEntity = new QCompanyEntity("companyEntity");

    public final StringPath company = createString("company");

    public final StringPath companyHomepage = createString("companyHomepage");

    public final NumberPath<Long> companyId = createNumber("companyId", Long.class);

    public final StringPath companyType = createString("companyType");

    public final NumberPath<Integer> employeesNumber = createNumber("employeesNumber", Integer.class);

    public final DatePath<java.sql.Date> establishmentDate = createDate("establishmentDate", java.sql.Date.class);

    public final QLogoEntity logoEntity;

    public QCompanyEntity(String variable) {
        this(CompanyEntity.class, forVariable(variable), INITS);
    }

    public QCompanyEntity(Path<? extends CompanyEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanyEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanyEntity(PathMetadata metadata, PathInits inits) {
        this(CompanyEntity.class, metadata, inits);
    }

    public QCompanyEntity(Class<? extends CompanyEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.logoEntity = inits.isInitialized("logoEntity") ? new QLogoEntity(forProperty("logoEntity")) : null;
    }

}

