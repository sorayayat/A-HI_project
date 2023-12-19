package com.jsg.ahispringboot.inspection.dto;

import java.util.ArrayList;
import java.util.List;

import com.jsg.ahispringboot.inspection.entity.Resume;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userCode;
    private String userId;
    private String userPwd;
    private String userName;
    private String phonNumber;
    private List<Resume> resume = new ArrayList<>();
}
