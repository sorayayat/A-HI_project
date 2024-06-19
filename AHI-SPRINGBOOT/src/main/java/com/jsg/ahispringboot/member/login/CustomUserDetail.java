package com.jsg.ahispringboot.member.login;

import com.jsg.ahispringboot.member.entity.MemberEntity;
//import com.mysql.cj.log.Log;
import com.jsg.ahispringboot.member.memberEnum.MemberRole;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
@RequiredArgsConstructor
@Getter
@Setter
public class CustomUserDetail implements UserDetails {

    private final MemberEntity memberEntity;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(() ->{
            return memberEntity.getRole().toString();
        });
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return memberEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return memberEntity.getEmail();
    }

    public String getRealName(){
        return memberEntity.getName();
    }

    public String getPhoneNumber(){
        return memberEntity.getPhoneNumber();
    }

    public Long getPk(){
        return memberEntity.getId();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        boolean result = (memberEntity.getRole()== MemberRole.ROLE_GUEST)?false:true;
        return result;

    }

     public String company(){
         return memberEntity.getCompanyEntity().getCompany();
     }
     public String companyType(){
         return memberEntity.getCompanyEntity().getCompanyType();
     }
     public int employeesNumber(){
         return memberEntity.getCompanyEntity().getEmployeesNumber();
     }
     public Date establishmentDate(){
         return memberEntity.getCompanyEntity().getEstablishmentDate();
     }
     public String companyHomepage(){
         return memberEntity.getCompanyEntity().getCompanyHomepage();
     }
     public Long companyPk(){
         return memberEntity.getCompanyEntity().getCompanyId();
     }
}
