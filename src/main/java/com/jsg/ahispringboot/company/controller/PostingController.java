package com.jsg.ahispringboot.company.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.PostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/posting")
@RequiredArgsConstructor
@Slf4j
public class PostingController {

    private final PostingService postingService;


    @PostMapping("regist/{companyCode}")
    public ResponseEntity<ResponseDTO> registCompany(@RequestParam String postingTitle,
                                                        @RequestParam String location,
                                                        @RequestParam String education,
                                                        @RequestParam String selectedCareer,
                                                        @RequestParam String selectedConditions,
                                                        @RequestParam String position,
                                                        @RequestParam String selectedSkills,
                                                        @RequestParam String content,
                                                        @RequestParam String endDate,
                                                        @RequestParam String closingForm,
                                                        @PathVariable Integer companyCode) {


        PostingDTO postingDTO = new PostingDTO();

        postingDTO.setPostingTitle(postingTitle);
        postingDTO.setLocation(location);
        postingDTO.setEducation(education);
        postingDTO.setSelectedCareer(selectedCareer);
        postingDTO.setSelectedConditions(selectedConditions);
        postingDTO.setPosition(position);
        postingDTO.setSelectedSkills(selectedSkills);
        postingDTO.setContent(content);
        postingDTO.setEndDate(endDate);
        postingDTO.setClosingForm(closingForm);

        postingService.registPosting(postingDTO, companyCode);


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());

    }

    @GetMapping("jobListing")
    public ResponseEntity<ResponseDTO> selectJobPosting() {


        Map<String, List> map = postingService.selectJobPosting();

        System.out.println("확인" +  map.get("skillList"));


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .data(map)
                        .message("success")
                        .build());
    }

}
