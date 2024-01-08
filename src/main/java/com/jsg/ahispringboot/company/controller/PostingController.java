package com.jsg.ahispringboot.company.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.Criteria;
import com.jsg.ahispringboot.common.PageDTO;
import com.jsg.ahispringboot.common.PagingResponseDTO;
import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.CompanyDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.company.service.PostingService;
import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
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




        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .build());


    }

    @GetMapping("jobListing/{offset}")
    public ResponseEntity<ResponseDTO> selectJobPosting(@PathVariable String offset) {

        System.out.println(offset + "offset");

        int total = 0;

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);

        List<PostingDTO> postingDTOList = postingService.selectJobPostingListPaging(cri);

        total = postingService.selectPostingTotal();

        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
        /* 1. offset의 번호에 맞는 페이지에 뿌려줄 Product들 */
        pagingResponseDTO.setData(postingDTOList);
        /* 2. PageDTO : 화면에서 페이징 처리에 필요한 정보들 */
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));



//        List<PostingDTO> postingDTOList = postingService.selectJobPosting();



        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .data(pagingResponseDTO)
                        .message("success")
                        .build());
    }



    @PutMapping("updateLike/{memberCode}")
    public ResponseEntity<ResponseDTO> updatePostingLike(@RequestBody PostingDTO postingDTO, @PathVariable Long memberCode ) {


        boolean result =  postingService.updatePostingLike(postingDTO, memberCode);

        System.out.println(result + "왜이래");


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



        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(result)
                        .build());
    }




    @GetMapping("searchPage")
    public ResponseEntity<ResponseDTO> searchCompany() {

        List<CompanyDTO> companyDtoList = postingService.searchCompany();

        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(companyDtoList)
                        .build());
    }

    @GetMapping("{searchName}")
    public ResponseEntity<ResponseDTO> searchCompanyName(@PathVariable String searchName) {

        System.out.println(searchName);

        List<PostingDTO> postingDTO = postingService.searchCompanyName(searchName);


        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
                        .data(postingDTO)
                        .build());
    }

    @DeleteMapping("delete/{postingCode}")
    public ResponseEntity<ResponseDTO> deletePosting(@PathVariable Integer postingCode) {

        System.out.println("postingCode" + postingCode);

        postingService.deletePosting(postingCode);

        // FastAPI 엔드포인트 URL
        String fastApiEndpoint = "http://localhost:8000/posting/delete/{postingCode}";

        // HTTP 헤더 설정 (필요한 경우 추가 설정)
        HttpHeaders headers = new HttpHeaders();

        // HTTP 엔티티 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        // URL에 postingCode를 맵핑
        Map<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("postingCode", postingCode);

        // RestTemplate을 사용하여 DELETE 요청 전송
        ResponseEntity<ResponseDTO> responseEntity = new RestTemplate().exchange(
                fastApiEndpoint,
                HttpMethod.DELETE,
                requestEntity,
                ResponseDTO.class,
                uriVariables
        );




        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .status(HttpStatus.valueOf(HttpStatus.CREATED.value()))
                        .message("success")
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
