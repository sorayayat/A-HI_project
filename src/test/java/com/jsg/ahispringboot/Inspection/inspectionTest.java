package com.jsg.ahispringboot.Inspection;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

import java.io.File;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import com.jsg.ahispringboot.inspection.dto.ResumeDTO;
import com.jsg.ahispringboot.inspection.entity.Resume;
import com.jsg.ahispringboot.inspection.repository.InspectionRepository;

@SpringBootTest
@Commit
public class inspectionTest {

    private final InspectionRepository inspectionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public inspectionTest(InspectionRepository inspectionRepository, ModelMapper modelMapper) {
        this.inspectionRepository = inspectionRepository;
        this.modelMapper = modelMapper;
    }

    @Test
    @DisplayName("파일 경로 저장 테스트")
    @Transactional
    public void 경로_찾기_테스트() throws IOException {
        // give
        System.out.println("테스트 시작");
        String findPdf = "C:/Users/gangc/dev/Project/A_Hi/back/AHI-SPRINGBOOT/src/main/resources/static/resume/test1";
        File filePath = new File(findPdf);
        File[] fw = filePath.listFiles();
        List<String> filePaths = new ArrayList<>();
        List<ResumeDTO> ResumeDTOs = new ArrayList<>();

        // when
        for (File f : fw) {
            if (f.isFile()) {
                findPdf = f.getPath();
                System.out.println("f : " + f);
                filePaths.add(Change(findPdf));
            }
            System.out.println("fileList : " + filePaths);
        }

        for (String path : filePaths) {
            ResumeDTO r = new ResumeDTO();
            LocalDateTime date = LocalDateTime.now();
            String newDate = date.format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분"));
            r.setResumePath(path);
            r.setCreateDate(newDate);
            r.setModifyDate(newDate);
            r.getMember().setId(1L);
            ResumeDTOs.add(r);
        }
        System.out.println("fileDTOs : " + ResumeDTOs);
        // then
        try {
            List<Resume> resume = ResumeDTOs.stream()
                    .map(r -> modelMapper.map(r, Resume.class))
                    .collect(Collectors.toList());
            inspectionRepository.saveAll(resume);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String Change(String path) {
        String resourcesPath = "\\static";
        String renamePath = path.substring(path.indexOf(resourcesPath) + resourcesPath.length());
        String change = renamePath.replace('\\', '/');
        return change;
    }

    @Test
    @DisplayName("path에서 title 만 분리")
    public void 문자열_삼분활로찢기() {
        Long code = 1L;
        List<Resume> resume = inspectionRepository.FindById(code);
        List<ResumeDTO> resumeDTO = resume.stream().map(res -> modelMapper.map(res, ResumeDTO.class))
                .collect(Collectors.toList());

        for (int i = 0; i < resumeDTO.size(); i++) {
            String path = resumeDTO.get(i).getResumePath();
            String[] spits = path.split("/");
            System.out.println(spits);
            String exe = spits[spits.length - 1];
            String titly = exe.replace(".pdf", "");
            System.out.println(titly);
        }
    }

    @Test
    @DisplayName("조인 테스트")
    public void 잘가져오나() {
        Long resumeCode = 1L;
        Long userid = 3L;
        Resume resume = inspectionRepository.findResumeCode(resumeCode, userid);
        ResumeDTO resumeDTO = modelMapper.map(resume, ResumeDTO.class);
        System.out.println("resumeDTO : " + resumeDTO);
    }

}
