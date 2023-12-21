package com.jsg.ahispringboot.inspection.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsg.ahispringboot.inspection.service.InspectionService;

@RestController
@RequestMapping("/inspection")
public class InspectionController {

    private final InspectionService inspectionsService;

    public InspectionController(InspectionService inspectionService) {
        this.inspectionsService = inspectionService;
    }

    @GetMapping("/getResume")
    public String selectResume() {
        Long code = 1L;
        System.out.println("H2");
        return "Hello World";
    }

}
