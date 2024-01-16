package com.jsg.ahispringboot.inspection.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsg.ahispringboot.common.ResponseDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.inspection.dto.AnswerDTO;
import com.jsg.ahispringboot.inspection.dto.ModifyResumeDTO;
import com.jsg.ahispringboot.inspection.dto.ReaderDTO;
import com.jsg.ahispringboot.inspection.dto.ResumeDTO;
import com.jsg.ahispringboot.inspection.dto.SaveResumeDTO;
import com.jsg.ahispringboot.inspection.dto.SelectResumeDTO;
import com.jsg.ahispringboot.inspection.dto.SelfIntroductionDTO;
import com.jsg.ahispringboot.inspection.service.InspectionService;
import com.jsg.ahispringboot.member.dto.MemberDto;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/inspection")
public class InspectionController {

    private final InspectionService inspectionsService;

    public InspectionController(InspectionService inspectionService) {
        this.inspectionsService = inspectionService;
    }

    @PostMapping("/getResumeList")
    public ResponseEntity<ResponseDTO> selectResume(@RequestBody MemberDto member) {
        List<ResumeDTO> resume = inspectionsService.selectMemberResume(member.getId());

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공", resume));
    }

    @PostMapping("/getResume")
    public ResponseEntity<ResponseDTO> selectResume(@RequestBody SelectResumeDTO selectResumeDTO) {
        log.info("selectResumeDTO : {} ", selectResumeDTO);
        ReaderDTO reader = inspectionsService.selcetResumeDetall(selectResumeDTO.getResumeCode(),
                selectResumeDTO.getMemberDto().getId());
        log.info("reader : {}", reader);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공 bro", reader));
    }

    @PostMapping("/getPdf")
    public ResponseEntity<ResponseDTO> getPdf(@RequestParam MultipartFile file) {

        log.info("getPdf : {}", file);
        ReaderDTO reader = inspectionsService.readResume(file);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "통신 완료", reader));
    }

    @PostMapping("/modifyResume")
    public ResponseEntity<ResponseDTO> modifyResume(@RequestBody ModifyResumeDTO modifyResumeDTO) {
        System.out.println(modifyResumeDTO);
        AnswerDTO modifyResume = inspectionsService.modifyResume(modifyResumeDTO);
        log.info("Controller : {} ", modifyResume);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "통신완료", modifyResume));
    }

    // @PostMapping("/saveResume")
    // public ResponseEntity<ResponseDTO> saveResume(@RequestParam("resumeCode")
    // Long resumeCode,
    // @RequestParam("image") MultipartFile image, @RequestParam("memberId") Long
    // memberId) {
    // if (image.isEmpty()) {
    // log.info("파일 없음");
    // return ResponseEntity.badRequest().body(new
    // ResponseDTO(HttpStatus.BAD_REQUEST, "파일이 없습니다.", null));
    // }
    // Map<String, Object> pdf = inspectionsService.imageToPdf(resumeCode, image,
    // memberId);
    // return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공적으로
    // 저장하였습니다.", pdf));
    // }

    @PostMapping("/saveResume")
    public ResponseEntity<ResponseDTO> saveResume(@RequestParam("title") String title,
            @RequestParam("pdf") MultipartFile pdf, @RequestParam("memberId") Long memberId) {
        if (pdf.isEmpty()) {
            log.info("파일 없음");
            return ResponseEntity.badRequest().body(new ResponseDTO(HttpStatus.BAD_REQUEST, "파일이 없습니다.", null));
        }
        String message = inspectionsService.SavePdf(title, pdf, memberId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "성공적으로 저장하였습니다.", message));
    }

    @GetMapping("/search/{search}")
    public ResponseEntity<ResponseDTO> findPosting(@PathVariable String search) {
        log.info("search : {}", search);
        List<PostingDTO> postingDTO = inspectionsService.findPosting(search);
        log.info("postingDTO : {}", postingDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "통신양호", postingDTO));

    }

}