package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer > {

    Company findByCompanyId(Integer companyId);
}
