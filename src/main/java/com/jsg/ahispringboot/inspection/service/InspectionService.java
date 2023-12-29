package com.jsg.ahispringboot.inspection.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.jsg.ahispringboot.inspection.dto.ReaderDTO;
import com.jsg.ahispringboot.inspection.dto.ResumeDTO;
import com.jsg.ahispringboot.inspection.dto.SelfIntroductionDTO;
import com.jsg.ahispringboot.inspection.entity.Resume;
import com.jsg.ahispringboot.inspection.repository.InspectionRepository;
import com.jsg.ahispringboot.inspection.utils.FileUtils;
import com.jsg.ahispringboot.inspection.utils.FileUtilsImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InspectionService {

    private final InspectionRepository inspectionRepositroy;
    private final ModelMapper modelMapper;
    private final FileUtils fileUtils;
    @Value("${fastapi.endpoint}")
    private String endPoint;

    public InspectionService(InspectionRepository inspectionRepositroy,
            ModelMapper modelMapper,
            FileUtilsImpl fileUtilsImpl) {
        this.inspectionRepositroy = inspectionRepositroy;
        this.modelMapper = modelMapper;
        this.fileUtils = fileUtilsImpl;
    }

    public List<ResumeDTO> selectMemberResume(Long memberId) {

        List<Resume> Resumes = inspectionRepositroy.FindById(memberId);
        List<ResumeDTO> resumeDTO = Resumes.stream().map(Resume -> modelMapper.map(Resume, ResumeDTO.class))
                .collect(Collectors.toList());

        for (int i = 0; i < resumeDTO.size(); i++) {
            String path = resumeDTO.get(i).getResumePath();
            String[] spits = path.split("/");
            System.out.println(spits);
            String exe = spits[spits.length - 1];
            String title = exe.replace(".pdf", "");
            resumeDTO.get(i).setResumePath(title);
        }
        return resumeDTO;

    }

    public ReaderDTO selcetResumeDetall(Long resumeCode, Long userCode) {
        
        Long beforeTime = System.currentTimeMillis();
        Resume resume = inspectionRepositroy.findResumeCode(resumeCode, userCode);
        ResumeDTO resumeDTO = modelMapper.map(resume, ResumeDTO.class);
        ByteArrayResource resource = fileUtils.FileToByteArray(resumeDTO.getResumePath());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = fileUtils.Createbody(resource, "file");
        ReaderDTO reader = fileUtils.GetJsonData(endPoint, requestEntity);
        Long afterTime = System.currentTimeMillis();
        Long diffTime = (afterTime - beforeTime) / 1000;
        log.info("실행 시간(sec) : " + diffTime);
        for (SelfIntroductionDTO s : reader.getSelfIntroductionDTO()) {
            log.info("s : {}", s);
        }
        log.info("reader : {}", reader.getPersonalInformationDTO());
        return reader;

    }

}
