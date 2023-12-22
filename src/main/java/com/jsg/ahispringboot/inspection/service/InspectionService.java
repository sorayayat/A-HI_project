package com.jsg.ahispringboot.inspection.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.jsg.ahispringboot.inspection.dto.ResumeDTO;
import com.jsg.ahispringboot.inspection.entity.Resume;
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

    public void selcetResumeDetall(Long code) {

    }

}
