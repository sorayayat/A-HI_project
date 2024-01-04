package com.jsg.ahispringboot.member.utils;

import com.jsg.ahispringboot.member.entity.LogoEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
@Slf4j
public class FileProcess {

    @Value("${app.file-storage.directory}")
    private String fileStoragePath;

    public LogoEntity fileSave(MultipartFile logo) {
        String originalFilename = logo.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + fileExtension;
        File storageDirectory = new File(fileStoragePath);
        if (!storageDirectory.exists() && !storageDirectory.mkdirs()) {
            throw new IllegalStateException("Could not create directory: " + fileStoragePath);
        }
        try {
            Files.copy(logo.getInputStream(), Paths.get(fileStoragePath, filename));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return LogoEntity
                .builder()
                .path(fileStoragePath)
                .originalName(originalFilename)
                .serverName(filename)
                .build();
    }

    public LogoEntity fileDelete(MultipartFile logo, LogoEntity oldLogo) {
        if (!oldLogo.getServerName().equals("default")) {
            log.info("path={},ser={},ori={}",oldLogo.getPath(),oldLogo.getServerName(),oldLogo.getOriginalName());
            File fileToDelete = new File(oldLogo.getPath()+"/", oldLogo.getServerName());
            if (fileToDelete.exists()) {
                boolean deleted = fileToDelete.delete();
                if (!deleted) {
                    throw new IllegalStateException("Failed to delete file: " + fileToDelete.getAbsolutePath());
                }
            } else {
                System.out.println("File not found: " + fileToDelete.getAbsolutePath());
            }
        }
        LogoEntity logoEntity = fileSave(logo);
        logoEntity.setLogoId(oldLogo.getLogoId());
        return logoEntity;
    }
}
