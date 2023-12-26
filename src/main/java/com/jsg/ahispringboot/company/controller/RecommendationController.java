package com.jsg.ahispringboot.company.controller;

import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;


    @PostMapping("/resume")
    public ResponseEntity<ResponseDTO> resumeRecommendation(MultipartHttpServletRequest file) {

        System.out.println("file" + file);

        List<PostingDTO> postingDTO = recommendationService.selectPosting();


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());
    }

}
