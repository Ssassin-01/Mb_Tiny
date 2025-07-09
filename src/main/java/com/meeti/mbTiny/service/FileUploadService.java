package com.meeti.mbTiny.service;

import com.meeti.mbTiny.aws.S3Uploader;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {


    private final S3Uploader s3Uploader;

    /**
     * 파일 업로드 (폴더명 지정)
     */
    public String upload(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            return s3Uploader.upload(file, folder); // ✅ S3 업로드 방식으로 교체
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패", e);
        }
    }

    /**
     * 파일 삭제
     */
    public void delete(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank()) return;
        s3Uploader.delete(fileUrl); // ✅ S3 삭제 방식
    }

    /**
     * 파일 수정 (기존 → 새 파일로 교체)
     */
    public String update(MultipartFile newFile, String oldFileUrl, String folder) {
        try {
            return s3Uploader.update(newFile, oldFileUrl, folder); // ✅ S3 수정 방식
        } catch (IOException e) {
            throw new RuntimeException("파일 수정 실패", e);
        }
    }
}

