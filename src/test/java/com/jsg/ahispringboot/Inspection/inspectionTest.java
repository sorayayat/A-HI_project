package com.jsg.ahispringboot.Inspection;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;

import javax.sound.midi.Patch;

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

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

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
            LocalDate date = LocalDate.now();
            String newDate = date.format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분"));
            r.setResumePath(path);
            r.setCreateDate(newDate);
            r.setModifyDate(newDate);
            r.setMemberId(1L);
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

}
