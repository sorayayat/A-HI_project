package com.jsg.ahispringboot.company.repository;


import com.jsg.ahispringboot.company.dto.CompanyDTO;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long > {

    CompanyEntity findByCompanyId(Integer companyId);

    CompanyEntity findByCompany(String searchName);

}
