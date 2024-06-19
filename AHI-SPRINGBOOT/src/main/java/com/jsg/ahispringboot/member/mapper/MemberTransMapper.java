package com.jsg.ahispringboot.member.mapper;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.ConfirmTokenDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.ConfirmTokenEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberTransMapper {
    MemberTransMapper INSTANCE = Mappers.getMapper(MemberTransMapper.class);

    @Mapping(target = "role", ignore = true)
    // @Mapping(target = "companyEntity", ignore = true)
    MemberEntity dtoToEntity(MemberDto memberDto);

    @Mapping(target = "check", ignore = true)
    MemberDto entityToDto(MemberEntity memberEntity);

    CompanyEntity cDtoToEntity(CompanyDto companyDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    // @Mapping(target = "companyEntity", ignore = true)
    MemberEntity cDtoToMemberEntity(CompanyDto companyDto);

}
