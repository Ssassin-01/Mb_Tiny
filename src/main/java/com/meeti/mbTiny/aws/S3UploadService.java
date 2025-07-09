package com.meeti.mbTiny.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3UploadService {
    private final S3Uploader s3Uploader;

    public String upload(MultipartFile file, String folder) {
        try {
            return s3Uploader.upload(file, folder);
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패", e);
        }
    }

    public void delete(String fileUrl) {
        if (fileUrl != null && !fileUrl.isBlank()) {
            s3Uploader.delete(fileUrl);
        }
    }
}
