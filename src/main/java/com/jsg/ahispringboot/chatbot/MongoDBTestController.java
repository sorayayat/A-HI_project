package com.jsg.ahispringboot.chatbot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "/save")
    public String saveUserData(@RequestParam String name, @RequestParam String contents) {
        log.info("[Controller][Recv] name : {}, contents : {}", name, contents);
        mongoDBTestService.saveUser(name, contents);

        return mongoDBTestService.selectUser(name);
    }
}
