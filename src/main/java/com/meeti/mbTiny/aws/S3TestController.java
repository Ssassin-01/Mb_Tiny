package com.meeti.mbTiny.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/s3-test")
@RequiredArgsConstructor
public class S3TestController {

    private final S3TestService s3TestService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = s3TestService.uploadToS3(file);
        return ResponseEntity.ok(fileUrl);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestParam("url") String fileUrl) {
        s3TestService.deleteFromS3(fileUrl);
        return ResponseEntity.ok("삭제 완료");
    }
}