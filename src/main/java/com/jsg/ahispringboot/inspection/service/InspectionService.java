package com.jsg.ahispringboot.inspection.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.jsg.ahispringboot.inspection.dto.FileDTO;
import com.jsg.ahispringboot.inspection.entity.File;
import com.jsg.ahispringboot.inspection.repository.InspectionRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InspectionService {

    private final InspectionRepository inspectionRepositroy;
    // private final InspectionMapper inspectionMapper;
    private final ModelMapper modelMapper;

    public InspectionService(InspectionRepository inspectionRepositroy, ModelMapper modelMapper) {
        this.inspectionRepositroy = inspectionRepositroy;
        this.modelMapper = modelMapper;
    }

    // public List<ResumeDTO> findResume(Long code) {
    // List<Resume> resume = inspectionRepositroy.findByUserUserCode(code);
    // List<ResumeDTO> resumeDTO = resume.stream().map(res ->
    // modelMapper.map(resume, ResumeDTO.class))
    // .collect(Collectors.toList());

    // log.info("resume : {}", resumeDTO);

    // return null;
    // }

    public void selectMemberResume(Long memberId) {
        List<File> files = inspectionRepositroy.FindById(memberId);
        List<FileDTO> fileDTOs = files.stream().map(file -> modelMapper.map(file, FileDTO.class))
                .collect(Collectors.toList());
        fileDTOs.forEach(file -> log.info("file :", file));

    }

}
