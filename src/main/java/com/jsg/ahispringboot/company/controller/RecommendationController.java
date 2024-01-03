package com.jsg.ahispringboot.company.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final RestTemplate restTemplate;

    @PostMapping("/selectResume")
    public ResponseEntity<ResponseDTO> selectCompany(@RequestBody Map<String, Object> data) {

        List<Integer> matchingIds = (List<Integer>) data.get("matching_job_ids");

        System.out.println(matchingIds);

        List<PostingDTO> postingDTO = recommendationService.matchingIdsPosting(matchingIds);




        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(postingDTO)
                        .build());
    }


    @GetMapping("selectLike/{memberCode}")
    public ResponseEntity<ResponseDTO> selectLikePosting(@PathVariable Integer memberCode) {

        System.out.println(memberCode + "GD");



        List<PostingDTO> postingDTOList = recommendationService.selectLikePosting(memberCode);

        System.out.println("뭐지" + postingDTOList);


        // JSON 페이로드와 헤더를 갖는 요청 엔터티 생성
        String postingDTOJson = convertPostingDTOListToJson(postingDTOList);

        String fastApiEndpoint = "http://localhost:8000/likePosting/postingList";

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

        ResponseDTO responseDTO = responseEntity.getBody();


        List<Integer> postingCode = (List<Integer>) responseDTO.getData();

        System.out.println(postingCode);

        postingDTOList = recommendationService.selectResultLike(postingCode);





        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(postingDTOList)
                        .build());

    }




    private String convertPostingDTOListToJson(List<PostingDTO> postingDTOList) {
        try {
            // ObjectMapper 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // PostingDTO 리스트를 JSON 문자열로 변환
            return objectMapper.writeValueAsString(postingDTOList);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
