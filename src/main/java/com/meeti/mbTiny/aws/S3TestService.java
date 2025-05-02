package com.meeti.mbTiny.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3TestService {

    private final S3Uploader s3Uploader;

    public String uploadToS3(MultipartFile file) {
        try {
            return s3Uploader.upload(file, "test"); // test 디렉토리에 저장
        } catch (IOException e) {
            throw new RuntimeException("S3 업로드 실패", e);
        }
    }

    public void deleteFromS3(String fileUrl) {
        s3Uploader.delete(fileUrl);
    }
}