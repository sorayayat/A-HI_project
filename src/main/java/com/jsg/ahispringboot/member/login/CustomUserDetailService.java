package com.jsg.ahispringboot.member.login;

import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomUserDetailService implements UserDetailsService {


    private final MemberRepository memberRepositoryImpl;
    private final PasswordEncoder passwordEncoder;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MemberEntity member = memberRepositoryImpl.findMember(username,null);
        if(member!=null){
            return new CustomUserDetail(member);
        }else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
