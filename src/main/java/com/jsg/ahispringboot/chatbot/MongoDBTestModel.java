package com.jsg.ahispringboot.chatbot;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "testc")
public class MongoDBTestModel {

    @Id
    private String id;
    private String name;
    private String contents;

}
