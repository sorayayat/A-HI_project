package com.jsg.ahispringboot.chatbot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/mongo")
public class MongoDBTestController {

    @Autowired
    MongoDBTestService mongoDBTestService;

    @GetMapping(value = "/find")
    public String findUserData(@RequestParam String name) {
        return mongoDBTestService.selectUser(name);
    }

    @PostMapping(value = "/save")
    public String saveUserData(@RequestBody MongoDBTestModel data) {
        String name = data.getName();
        String contents = data.getContents();

        log.info("[Controller][Recv] name : {}, contents : {}", name, contents);
        mongoDBTestService.saveUser(name, contents);

        return mongoDBTestService.selectUser(name);
    }


}
