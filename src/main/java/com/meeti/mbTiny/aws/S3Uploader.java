package com.meeti.mbTiny.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile file, String dir) throws IOException {
        String fileName = dir + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata));

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    public String update(MultipartFile newFile, String oldFileUrl, String dir) throws IOException {
        if (oldFileUrl != null && !oldFileUrl.isBlank()) {
            delete(oldFileUrl);
        }
        return upload(newFile, dir);
    }

    public void delete(String fileUrl) {
        fileUrl = fileUrl.trim().replaceAll("\\s+$", "");
        String key = extractKeyFromUrl(fileUrl);
        System.out.println("🗑️ 삭제할 S3 key: " + key);
        amazonS3.deleteObject(bucket, key);
    }

    private String extractKeyFromUrl(String fileUrl) {
        try {
            URI uri = new URI(fileUrl);
            return uri.getPath().substring(1);
        } catch (Exception e) {
            throw new IllegalArgumentException("유효하지 않은 S3 파일 URL입니다: " + fileUrl);
        }
    }
}
