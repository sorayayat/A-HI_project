package com.jsg.ahispringboot.inspection.utils;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.HttpHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Object;

public class FileUtils {

    @Value("${fastapi.endpoint}/ReadPdf")
    private String readPdfendPoint;

    public void callReadPdf(String path) {
        File file = new File(path);
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        FileSystemResource fileSystemResource = new FileSystemResource(file);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // //body.add("fileSystemResource", fileSystemResource);
        // body.add("path", fileSystemResource);

    }
}
