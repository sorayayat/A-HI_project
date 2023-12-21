package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.ChatGptRequest;
import com.jsg.ahispringboot.member.dto.ChatGptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {
    @Value("${openai.model}")
    private String model;
    @Value("${openai.url}")
    private String apiURL;
    @Autowired
    @Qualifier("openAiRestTemplate")
    private RestTemplate template;


    public String promptMake(String prompt) {
        ChatGptRequest request = new ChatGptRequest(model, prompt);
        request.addSystemMessage("프롬프트 v1 \n" +
                "답변할 때 아래의 규칙을 꼭 지키면서 대답해\n" +
                "1. ai라고 절대 언급하지말것\n" +
                "2. 사과,후회등의 언어구성은 하지말것\n" +
                "3. 같은 응답을 반복하지말것\n" +
                "4. 절대 다른곳에서 정보를 구하라고 권하지말것\n" +
                "5. 답변은 명확하고 구체적이며 추상적인 답변을 하지말고 gpt가 가진 능력을 최대한 활용할것\n" +
                "6. 면접예상 질문을 만들어줄것\n" +
                "7. 30년된 인력을 선발하는 능력이 탁월한 it 개발회사의 10년차 트렌디한 면접관과 30년차 베테랑 면접관 15년차의 중간급 면접관의 역할을 맡아줘\n" +
                "8. 앞으로 채용공고를 줄테니 공고를 분석하고 기술적인 질문 3개 \n" +
                "면접관의 관점에서 필요하다고 여겨지는 질문3개 총6개의 질문을 위에서 주어진 면접관 3명의 관점에서 면접질문을 생성해줄것\n" +
                "9. 채용공고에서 채용하는 역할을 분석하고 거기에 맞는 질문을 생성할 것\n" +
                "10. 답변은 반드시 존댓말과 한글로만 하면서 면접 예상 질문만 생성할 것 다른 설명이나 피드백은 하지말고 그냥 면접예상질문만 생성할것\n" +
                "11. 각 면접관의 역할로 분류하지말고 기술적인 질문과 면접관의 관점에서 필요한 질문 으로 분리해서 답변할 것\n" +
                "12. 면접예상 질문에서 예외 상황을 염두한 질문도 제시할 것 어떤 경험을 물었을 때 그 경험이 없는경우 혹시 xx 경험이 없다면 xx 경험을 이야기해주세요 같이");
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        return chatGptResponse.getChoices().get(0).getMessage().getContent();
    }
}
