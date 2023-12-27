package com.jsg.ahispringboot.inspection.utils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.client.RestTemplate;

public class FileUtilsImpl implements FileUtils {

    @Value("${fastapi.endpoint}")
    private String endPoint;
    private final RestTemplate restTemplate;

    @Autowired
    public FileUtilsImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ByteArrayResource FileToByteArray(String path) {
        Path filePath = Paths.get(path);
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
}
