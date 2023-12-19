package com.jsg.ahispringboot.company.controller;

import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.service.PostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posting")
@RequiredArgsConstructor
@Slf4j
public class PostingController {

    private final PostingService postingService;


    @PostMapping("regist")
    public ResponseEntity<ResponseDTO> registCompany(@RequestBody PostingDTO postingData) {



        System.out.println(postingData);

        postingService.registPosting(postingData);



        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());

    }

}
