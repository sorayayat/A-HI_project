package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * Qresume is a Querydsl query type for resume
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class Qresume extends EntityPathBase<resume> {

    private static final long serialVersionUID = -1833504760L;

    public static final Qresume resume = new Qresume("resume");

    public final StringPath dischargeDate = createString("dischargeDate");

    public final StringPath enlistmentDate = createString("enlistmentDate");

    public final StringPath militaryService = createString("militaryService");

    public final NumberPath<Long> resumeCode = createNumber("resumeCode", Long.class);

    public Qresume(String variable) {
        super(resume.class, forVariable(variable));
    }

    public Qresume(Path<? extends resume> path) {
        super(path.getType(), path.getMetadata());
    }

    public Qresume(PathMetadata metadata) {
        super(resume.class, metadata);
    }

}

