package com.jsg.ahispringboot.inspection.utils;

import java.io.File;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class FileUtilsImpl implements FileUtils {
    
    @Value("${fastapi.endpoint}")
    private String endPoint;
    private final RestTemplate restTemplate;

    @Autowired
    public FileUtilsImpl(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
    }

    public void callReadPDF(String path){
        Path filePath = Paths.get(path);
        try{
            byte[] padData = Files.readAllBytes(filePath);
            ByteArrayResource resource = new ByteArrayResource(padData){
                @Override
                public String getFilename() {
                    String[] spits = path.split("/");
                    System.out.println(spits);
                    String exe = spits[spits.length - 1];
                    String title = exe.replace(".pdf", "");
                    return title;
                }
            };

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String , Object> body = new LinkedMultiValueMap<>();
            body.add("resume", resource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            restTemplate.postForObject(endPoint+"/ReadResume", requestEntity, Void.class);
        }
        catch(Exception e){

        }
    }
}
