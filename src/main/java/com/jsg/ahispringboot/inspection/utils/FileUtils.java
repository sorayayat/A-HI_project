package com.jsg.ahispringboot.inspection.utils;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import com.jsg.ahispringboot.inspection.dto.AnswerDTO;
import com.jsg.ahispringboot.inspection.dto.ModifyResumeDTO;
import com.jsg.ahispringboot.inspection.dto.ReaderDTO;
import com.jsg.ahispringboot.inspection.dto.SelfIntroductionDTO;

public interface FileUtils {

     public ByteArrayResource FileToByteArray(String Path);

     public HttpEntity<MultiValueMap<String, Object>> FileCreatebody(ByteArrayResource resource, String bodyKey);

     public HttpEntity<MultiValueMap<String, Object>> ListCreatebody(ModifyResumeDTO resource,
               String bodyKey);

     public ReaderDTO GetJsonData(String endPoing,
               HttpEntity<MultiValueMap<String, Object>> requestEntity);

     public AnswerDTO ModifyJsonData(String endPoing,
               HttpEntity<MultiValueMap<String, Object>> requestEntity);
}
