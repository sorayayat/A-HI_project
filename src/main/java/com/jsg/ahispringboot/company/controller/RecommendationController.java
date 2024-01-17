package com.jsg.ahispringboot.company.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final RestTemplate restTemplate;

    @PostMapping("/selectResume")
    public ResponseEntity<ResponseDTO> selectCompany(@RequestBody Map<String, Object> data) {

        // 원래 데이터를 가져옵니다.
        List<?> tempMatchingIds = (List<?>) data.get("matching_job_ids");


        Map<String, String> reasonsMap = (Map<String, String>) data.get("Reasons");

        System.out.println(reasonsMap);


        // 안전하게 Integer로 변환합니다.
        List<Integer> matchingIds = tempMatchingIds.stream()
                .map(Object::toString)
                .map(Integer::parseInt)
                .collect(Collectors.toList());



        List<PostingDTO> postingDTO = recommendationService.matchingIdsPosting(matchingIds);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("postingDTO", postingDTO);
        responseData.put("reasonsMap", reasonsMap);




        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(responseData)
                        .build());
    }


    @GetMapping("selectLike/{memberCode}")
    public ResponseEntity<ResponseDTO> selectLikePosting(@PathVariable Integer memberCode) {


        List<PostingDTO> postingDTOList = recommendationService.selectLikePosting(memberCode);


        // JSON 페이로드와 헤더를 갖는 요청 엔터티 생성
        String postingDTOJson = convertPostingDTOListToJson(postingDTOList);

        String fastApiEndpoint = "http://localhost:8000/likePosting/postingList";

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);



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
