package com.jsg.ahispringboot.inspection.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.jsg.ahispringboot.inspection.dto.ReaderDTO;

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

    public HttpEntity<MultiValueMap<String, Object>> Createbody(ByteArrayResource resource, String bodyKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add(bodyKey, resource);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        return requestEntity;
    }

    public ReaderDTO GetJsonData(String endPoing, HttpEntity<MultiValueMap<String, Object>> requestEntity) {
        try {
            ResponseEntity<ReaderDTO> responseEntity = restTemplate.postForEntity(
                    endPoint + "/inspection/ReadResume",
                    requestEntity,
                    ReaderDTO.class);
            ReaderDTO reader = responseEntity.getBody();
            return reader;
        } catch (Exception e) {
            System.out.println("에러요");
            return null;
        }

    }
}
