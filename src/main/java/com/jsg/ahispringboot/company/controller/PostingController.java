package com.jsg.ahispringboot.company.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.company.service.PostingService;
import com.jsg.ahispringboot.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.awt.*;
import java.io.IOException;
import java.util.*;
import java.util.List;

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

        PostingDTO postingCompanyDTO = postingService.registPosting(postingDTO, companyCode);



        // JSON 페이로드와 헤더를 갖는 요청 엔터티 생성
        String postingDTOJson = convertPostingDTOToJson(postingCompanyDTO);

        String fastApiEndpoint = "http://localhost:8000/posting/regist";

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        System.out.println("postingDTOJson" + postingDTOJson);

        HttpEntity<String> requestEntity = new HttpEntity<>(postingDTOJson, headers);

        // RestTemplate을 사용하여 POST 요청 전송
        ResponseEntity<ResponseDTO> responseEntity = new RestTemplate().exchange(
                fastApiEndpoint,
                HttpMethod.POST,
                requestEntity,
                ResponseDTO.class

        );

        System.out.println(responseEntity + "확인" );


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());


    }

    @GetMapping("jobListing")
    public ResponseEntity<ResponseDTO> selectJobPosting() {


        List<PostingDTO> postingDTOList = postingService.selectJobPosting();




        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .data(postingDTOList)
                        .message("success")
                        .build());
    }



    @PutMapping("updateLike/{memberCode}")
    public ResponseEntity<ResponseDTO> updatePostingLike(@RequestBody PostingDTO postingDTO, @PathVariable Long memberCode ) {


        boolean result =  postingService.updatePostingLike(postingDTO, memberCode);


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(result)
                        .build());

    }

    @PostMapping("getLike/{memberCode}")
    public ResponseEntity<ResponseDTO> getPostingLike(@RequestBody PostingDTO postingDTO, @PathVariable Long memberCode) {

        boolean result = postingService.getPostingLike(postingDTO, memberCode);

        System.out.println(result + "제발제발");

        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(result)
                        .build());
    }










    private String convertPostingDTOToJson(PostingDTO postingDTO) {
        try {
            // ObjectMapper 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // PostingDTO 리스트를 JSON 문자열로 변환
            return objectMapper.writeValueAsString(postingDTO);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
