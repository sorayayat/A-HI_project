package com.jsg.ahispringboot.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCompanyEntity is a Querydsl query type for CompanyEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanyEntity extends EntityPathBase<CompanyEntity> {

    private static final long serialVersionUID = -33261569L;

    public static final QCompanyEntity companyEntity = new QCompanyEntity("companyEntity");

    public final StringPath company = createString("company");

    public final StringPath companyHomepage = createString("companyHomepage");

    public final NumberPath<Integer> companyId = createNumber("companyId", Integer.class);

    public final StringPath companyType = createString("companyType");

    public final StringPath employeesNumber = createString("employeesNumber");

    public final StringPath establishmentDate = createString("establishmentDate");

    public QCompanyEntity(String variable) {
        super(CompanyEntity.class, forVariable(variable));
    }

    public QCompanyEntity(Path<? extends CompanyEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCompanyEntity(PathMetadata metadata) {
        super(CompanyEntity.class, metadata);
    }

}

