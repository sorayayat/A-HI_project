package com.jsg.ahispringboot.inspection.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFile is a Querydsl query type for File
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFile extends EntityPathBase<File> {

    private static final long serialVersionUID = -1697067977L;

    public static final QFile file = new QFile("file");

    public final NumberPath<Long> fileCode = createNumber("fileCode", Long.class);

    public final StringPath filePath = createString("filePath");

    public final StringPath fileType = createString("fileType");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final NumberPath<Long> postionCode = createNumber("postionCode", Long.class);

    public QFile(String variable) {
        super(File.class, forVariable(variable));
    }

    public QFile(Path<? extends File> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFile(PathMetadata metadata) {
        super(File.class, metadata);
    }

}

