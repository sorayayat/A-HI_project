package com.jsg.ahispringboot.company.controller;

import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}
