package com.jsg.ahispringboot.inspection.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RestController
@RequestMapping("/inspection")
public class InspectionController {

    @GetMapping("/getResume")
    public String selectResume() {

        return "Hello World";
    }

}
