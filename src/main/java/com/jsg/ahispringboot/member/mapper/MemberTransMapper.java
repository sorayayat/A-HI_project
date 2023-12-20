package com.jsg.ahispringboot.member.mapper;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberTransMapper {
    MemberTransMapper INSTANCE = Mappers.getMapper(MemberTransMapper.class);

    MemberEntity dtoToEntity(MemberDto memberDto);

    MemberDto entityToDto(MemberEntity memberEntity);

    CompanyEntity cDtoToEntity(CompanyDto companyDto);

    MemberEntity cDtoToMemberEntity(CompanyDto companyDto);

}
