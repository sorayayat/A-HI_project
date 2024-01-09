package com.jsg.ahispringboot.inspection.utils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.jsg.ahispringboot.inspection.dto.AnswerDTO;
import com.jsg.ahispringboot.inspection.dto.ModifyResumeDTO;
import com.jsg.ahispringboot.inspection.dto.ReaderDTO;
import com.jsg.ahispringboot.inspection.dto.SelfIntroductionDTO;

import lombok.extern.slf4j.Slf4j;
import okhttp3.internal.http.HttpMethod;

@Slf4j
public class FileUtilsImpl implements FileUtils {

    @Value("${fastapi.endpoint}")
    private String endPoint;
    @Value("${Patch.staicPatch}")
    private String staticPath;
    private final RestTemplate restTemplate;

    @Autowired
    public FileUtilsImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ByteArrayResource FileToByteArray(String path) {
        Path filePath = Paths.get(staticPath + path);
        try {
            byte[] padData = Files.readAllBytes(filePath);
            ByteArrayResource resource = new ByteArrayResource(padData) {
                @Override
                public String getFilename() {
                    String[] spits = path.split("/");
                    System.out.println(spits);
                    String exe = spits[spits.length - 1];
                    String title = exe.replace(".pdf", "");
                    return title;
                }
            };
            return resource;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public ByteArrayResource UploadFileToByteArray(MultipartFile file, String title) {
        try {
            return new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return title;
                }
            };
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    public HttpEntity<MultiValueMap<String, Object>> FileCreatebody(ByteArrayResource resource, String bodyKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add(bodyKey, resource);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        return requestEntity;
    }

    public HttpEntity<MultiValueMap<String, Object>> ListCreatebody(ModifyResumeDTO resource,
            String bodyKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add(bodyKey, resource);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        return requestEntity;
    }

    public HttpEntity<MultiValueMap<String, Object>> UploadFileCreatebody(ByteArrayResource resource, String bodyKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add(bodyKey, resource);
        return new HttpEntity<>(body, headers);
    }

    public ReaderDTO GetJsonData(String endPoing, HttpEntity<MultiValueMap<String, Object>> requestEntity) {
        try {
            ResponseEntity<ReaderDTO> responseEntity = restTemplate.postForEntity(
                    endPoint + "/inspection/ReadResume",
                    requestEntity,
                    ReaderDTO.class);
            ReaderDTO result = responseEntity.getBody();
            return result;
        } catch (Exception e) {
            System.out.println("에러요");
            return null;
        }

    }

    public AnswerDTO ModifyJsonData(String endPoing,
            HttpEntity<MultiValueMap<String, Object>> requestEntity) {

        try {
            ResponseEntity<AnswerDTO> responseEntity = restTemplate.postForEntity(
                    endPoint + "/inspection/modify",
                    requestEntity,
                    AnswerDTO.class);
            AnswerDTO modifyResumeDTO = responseEntity.getBody();
            return modifyResumeDTO;
        } catch (Exception e) {
            System.out.println("에러요");
            return null;
        }
    }

    public byte[] getPdf(String endPoint, HttpEntity<MultiValueMap<String, Object>> requestEntity) {
        try {
            ResponseEntity<byte[]> responseEntity = restTemplate.postForEntity(
                    endPoint + "/inspection/modifyResume",
                    requestEntity,
                    byte[].class);
            return responseEntity.getBody();
        } catch (Exception e) {
            // log.info("Exception : {}", e);
            return null;
        }
    }

    public String getTitle(String path) {
        String[] spits = path.split("/");
        String exe = spits[spits.length - 1];
        String title = exe.replace(".pdf", "");
        return title;
    }

    public String SavePdf(byte[] resource, String name, String title) {
        String path = staticPath + "resume/" + name + "/" + title + "-수정본" + ".pdf";
        FilenameFilter filter = new FilenameFilter() {
            public boolean accept(File f, String name) {
                return name.contains(title + "-수정본");
            }
        };
        try {
            File file = new File(path);

            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdir();
            }
            if (file.exists()) {
                String[] fileName = file.list(filter);
                if (fileName == null) {
                    fileName = new String[0];
                }
                String newPath = staticPath + "resume/" + name + "/" + title + "-수정본" + (fileName.length + 1) + ".pdf";
                File newFile = new File(newPath);
                try (FileOutputStream fos = new FileOutputStream(newFile)) {
                    fos.write(resource);
                }

                return Change(newPath);
            } else {
                try (FileOutputStream fos = new FileOutputStream(file)) {
                    fos.write(resource);
                }
            }

        } catch (Exception e) {
            log.info("[SavePdf] 에러 : {}", e);
        }

        return Change(path);

    }

    public String Change(String path) {
        String resourcesPath = "/static";
        String renamePath = path.substring(path.indexOf(resourcesPath) + resourcesPath.length());
        String change = renamePath.replace('\\', '/');
        return change;
    }
}
