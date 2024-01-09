package com.jsg.ahispringboot.inspection.utils;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import com.jsg.ahispringboot.inspection.dto.AnswerDTO;
import com.jsg.ahispringboot.inspection.dto.ModifyResumeDTO;
import com.jsg.ahispringboot.inspection.dto.ReaderDTO;
import com.jsg.ahispringboot.inspection.dto.SelfIntroductionDTO;

public interface FileUtils {

     public ByteArrayResource FileToByteArray(String Path);

     public ByteArrayResource UploadFileToByteArray(MultipartFile file, String title);

     public HttpEntity<MultiValueMap<String, Object>> FileCreatebody(ByteArrayResource resource, String bodyKey);

     public HttpEntity<MultiValueMap<String, Object>> ListCreatebody(ModifyResumeDTO resource,
               String bodyKey);

     public HttpEntity<MultiValueMap<String, Object>> UploadFileCreatebody(ByteArrayResource resource, String bodyKey);

     public ReaderDTO GetJsonData(String endPoint,
               HttpEntity<MultiValueMap<String, Object>> requestEntity);

     public AnswerDTO ModifyJsonData(String endPoint,
               HttpEntity<MultiValueMap<String, Object>> requestEntity);

     public String getTitle(String path);

     public byte[] getPdf(String endPoint, HttpEntity<MultiValueMap<String, Object>> requestEntity);

     public String SavePdf(byte[] file, String name, String title);

}
