package com.jsg.ahispringboot.company.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import javax.print.attribute.Attribute;
import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final RestTemplate restTemplate;

    @PostMapping("/resume")
    public ResponseEntity<ResponseDTO> resumeRecommendation(MultipartHttpServletRequest file) {

        // 파일 정보 출력
        System.out.println("file" + file);

        // postingDTO 조회
        List<PostingDTO> postingDTO = recommendationService.selectPosting();

        // postingDTO를 JSON 문자열로 변환 (Jackson과 같은 라이브러리 필요)
        String postingDTOJson = convertPostingDTOToJson(postingDTO);

        System.out.println("postingDTOJson: " + postingDTOJson);

        // 요청에 사용할 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // JSON 페이로드와 헤더를 갖는 요청 엔터티 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(postingDTOJson, headers);

        // FastAPI 엔드포인트 URL 지정
        String fastApiEndpoint = "http://localhost:8000/recommendation/resume";

        // POST 요청 전송
        ResponseEntity<ResponseDTO> responseEntity = restTemplate.postForEntity(
                fastApiEndpoint,
                requestEntity,
                ResponseDTO.class
        );

        // 응답 생성 및 반환
        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());
    }

    // postingDTO를 JSON 문자열로 변환하는 메서드
    private String convertPostingDTOToJson(List<PostingDTO> postingDTO) {
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
