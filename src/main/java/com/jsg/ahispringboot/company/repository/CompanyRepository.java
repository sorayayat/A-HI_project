package com.jsg.ahispringboot.company.repository;


import com.jsg.ahispringboot.member.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long > {

    CompanyEntity findByCompanyId(Integer companyId);

    CompanyEntity findByCompany(String searchName);
}
