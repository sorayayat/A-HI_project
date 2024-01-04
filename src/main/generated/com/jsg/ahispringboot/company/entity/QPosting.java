package com.jsg.ahispringboot.company.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPosting is a Querydsl query type for Posting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPosting extends EntityPathBase<Posting> {

    private static final long serialVersionUID = -169392494L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPosting posting = new QPosting("posting");

    public final StringPath closingForm = createString("closingForm");

    public final com.jsg.ahispringboot.member.entity.QCompanyEntity company;

    public final StringPath content = createString("content");

    public final StringPath education = createString("education");

    public final StringPath endDate = createString("endDate");

    public final StringPath location = createString("location");

    public final StringPath position = createString("position");

    public final NumberPath<Integer> postingCode = createNumber("postingCode", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> postingDate = createDateTime("postingDate", java.time.LocalDateTime.class);

    public final ListPath<PostingExperience, QPostingExperience> postingExperienceList = this.<PostingExperience, QPostingExperience>createList("postingExperienceList", PostingExperience.class, QPostingExperience.class, PathInits.DIRECT2);

    public final StringPath postingTitle = createString("postingTitle");

    public final ListPath<Skill, QSkill> skillList = this.<Skill, QSkill>createList("skillList", Skill.class, QSkill.class, PathInits.DIRECT2);

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public final ListPath<WorkType, QWorkType> workTypeList = this.<WorkType, QWorkType>createList("workTypeList", WorkType.class, QWorkType.class, PathInits.DIRECT2);

    public QPosting(String variable) {
        this(Posting.class, forVariable(variable), INITS);
    }

    public QPosting(Path<? extends Posting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPosting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPosting(PathMetadata metadata, PathInits inits) {
        this(Posting.class, metadata, inits);
    }

    public QPosting(Class<? extends Posting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new com.jsg.ahispringboot.member.entity.QCompanyEntity(forProperty("company")) : null;
    }

}

