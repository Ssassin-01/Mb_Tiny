package com.meeti.mbTiny.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class TestController {
    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello World!";
    }
}
