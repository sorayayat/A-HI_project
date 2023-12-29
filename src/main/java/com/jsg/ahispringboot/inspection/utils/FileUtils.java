package com.jsg.ahispringboot.inspection.utils;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import com.jsg.ahispringboot.inspection.dto.ReaderDTO;

public interface FileUtils {

     public ByteArrayResource FileToByteArray(String Path);

     public HttpEntity<MultiValueMap<String, Object>> Createbody(ByteArrayResource resource, String bodyKey);

     public ReaderDTO GetJsonData(String endPoing,
               HttpEntity<MultiValueMap<String, Object>> requestEntity);
}
