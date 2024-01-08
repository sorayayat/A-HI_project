package com.jsg.ahispringboot.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingExperience;
import com.jsg.ahispringboot.company.entity.Skill;
import com.jsg.ahispringboot.company.entity.WorkType;
import com.jsg.ahispringboot.company.repository.PostingExperienceRepository;
import com.jsg.ahispringboot.company.repository.PostingRepository;
import com.jsg.ahispringboot.company.repository.SkillRepository;
import com.jsg.ahispringboot.company.repository.WorkTypeRepository;
import com.jsg.ahispringboot.member.dto.ChatGptRequest;
import com.jsg.ahispringboot.member.dto.ChatGptResponse;
import com.jsg.ahispringboot.member.dto.GptResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;

@RequiredArgsConstructor
@Service
@Slf4j
public class
 ChatGptService {
    @Value("${openai.model}")
    private String model;
    @Value("${openai.url}")
    private String apiURL;
    @Value("${openai.temperature}")
    private Double temperature;
    @Value("${openai.max_tokens}")
    private int max_tokens;
    @Autowired
    @Qualifier("openAiRestTemplate")
    private RestTemplate template;
    private final PostingRepository postingRepository;
    private final PostingExperienceRepository postingExperienceRepository;
    private final SkillRepository skillRepository;
    private final WorkTypeRepository workTypeRepository;


    public String gptMake(String source,String prompt) {
        Map<String, String> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        ChatGptRequest request = new ChatGptRequest(model, source, temperature, max_tokens, responseFormat);
      //  ChatGptRequest request = new ChatGptRequest(model, source, temperature, max_tokens);
        request.addSystemMessage(prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        return chatGptResponse.getChoices().get(0).getMessage().getContent();
    }


    public String promptMake(String requirements){
        if(requirements.equals("posting")) {

            String postAnalyze = "내가 채용공고를 줄거야  \n" +
                    "아래의 규칙을 꼭 지키면서 대답해 대답 하기 전에 쉼 호흡도 한 번 하고 명상도 하고 아래의 규칙을 잘 지켰을 때 넉넉한 팁도 챙겨 줄게 잘 해보자\n" +
                    "1. ai라고 절대 언급 하지 말것\n" +
                    "2. 사과,후회 등의 언어 구성은 하지 말것\n" +
                    "3. 같은 응답을 반복 하지 말것\n" +
                    "4. 절대 다른곳에서 정보를 구하라고 권하지 말것\n" +
                    "5. 답변은 명확하고 구체적이며 추상적인 답변을 하지말고 gpt가 가진 능력을 최대한 활용 할 것\n" +
                    "6. 주어진 채용공고에 맞게 30년된 인력을 선발 하는 능력이 탁월한 it 개발 회사의 10년차 최신 기술을 섭렵한 개발자 면접관 20년차 인사 담당 면접관 30년차 풀스택 개발자 출신의 ceo 면접관 들이 질문한다고 가정하고   \n" +
                    "  각각의 면접관 들이 2개씩 질문 하고 2개의 질문의 종류는 기술 적인 질문 1개 면접관의 관점에서 필요 하다고 생각 되는 질문 1개니깐 총6개의 질문을 생성 해줘 \n" +
                    "7. 답변은 반드시 존댓말과 한글로만 하면서 면접 예상 질문만 생성할 것 다른 설명 이나 피드백은 하지 말고 그냥 면접예상질문만 생성할것 \n" +
                    "8. 면접질문을 생성 할 때 분류하지말고 생성만 할 것 \n" +
                    "9. 응답할 때 어떤 채용 공고 인지 알려줄 필요 없어 딱 면접 질문 만 생성할 것  \n" +
                    "10. 각 질문의 indexing은 json 형태로  question1:생성한 질문 question2:생성한 질문....이런식 으로 하고 맨앞에 result:success 이걸 꼭 넣어줘 데이터 가공 하려고 하는 거니깐 반드시 지켜줘   \n" +
                    "11. 면접 예상 질문에서 예외 상황을 염두한 질문도 제시할 것 어떤 경험을 물었을 때 그 경험이 없는경우 혹시 xx 경험이 없다면 xx 경험을 이야기 해 주세요 같이";

        return postAnalyze;
        }else {
            String feedback = "아래의 규칙을 꼭 지키면서 대답해 대답 하기 전에 쉼 호흡도 한 번 하고 명상도 하고 아래의 규칙을 잘 지켰을 때 넉넉한 팁도 챙겨 줄게 잘 해보자\n" +
                    "1. ai라고 절대 언급 하지 말것\n" +
                    "2. 사과,후회 등의 언어 구성은 하지 말것\n" +
                    "3. 같은 응답을 반복 하지 말것\n" +
                    "4. 절대 다른곳에서 정보를 구하라고 권하지 말것\n" +
                    "5. 답변은 명확 하고 구체적 이며 추상적인 답변을 하지 말고 gpt가 가진 능력을 최대한 활용 할 것\n" +
                    "6. 주어진 질문은 면접 질문과 그에 대한 응답 이야 인력을 선발 하는 능력이 탁월한 it 회사의 평가와 분석 능력이 탁월 하고 객관적이고 공정 하며 직관력과 판단력이 뛰어난 23년차 하고 인사 담당 면접관의 관점에서 면접 질문에 대한 " +
                    " 응답을 분석하고 피드백을 해주는데 응답에서 잘한점과 개선이 필요한 부분을 알려 줘서 어떤식으로 개선하면 좋은지 알려주고 면접 질문에 대한 완벽한 정답을 생성해줘 \n" +
                    "8. 답변은 반드시 존댓말과 한글로만 하면서 면접 예상 질문만 생성할 것 다른 설명 이나 피드백은 하지 말고 그냥 면접예상질문만 생성할것 \n" +
                    "9. indexing은 json 형태로  goodjob: <이곳에는 응답에서 잘한점을 구체적으로 언급해줘 잘한점이 없거나 면접질문과 관련없는 대답을 했을경우 질문과 관련없는 응답입니다 같은 지적해주는 문장을 생성해줘> improve:<이곳에는 응답에서 별로인 부분을 구체적으로 지적해주고 어떤식으로 개선하면 좋을지 말해줘>  " +
                    " perfect:<질문에 대한 정답 모범 답안을 생성해줘>  " +
                    " index:<indexing번호> 맨앞에는 result:<success> 이걸 꼭 넣어줘 데이터 가공 하려고 하는 거니깐 반드시 지켜줘 특히 면접과 관련이 없는 응답일 때 내가 지시한대로 지적하고 개선하라고 이야기해줘 Hallucination때문에 맘대로 정상적인 답변인거처럼 대답하지말고 이부분을 신경 써줄래";
            return feedback;
        }
    }



    public String validateCheck(String queryString) throws JsonProcessingException {   //쿼리스트링 유효성검사
        String confirm = "companyDetails/";
        String result;

        if (queryString.contains(confirm)) { // companyDetails/ 가 있는지 검사
            int startIndex = queryString.indexOf(confirm) + confirm.length();
            String pathVariable = queryString.substring(startIndex);

            if (pathVariable.isEmpty()) { // pathVariable이 빈값인 경우
                result = getResult();
                return result;
            } else if (pathVariable.matches("\\d+")) { // pathVariable이 숫자로만 구성되어 있는 경우
                GptResult gptResult = getPosting(pathVariable);
                if (gptResult.getResult().equals("success")) { // 유효성을 통과하고 db에 저장된 공고가 있는 경우
                    String fullPosting = gptResult.getQuestion1();
                    String requirements = "posting";
                    String prompt = promptMake(requirements);
                    String gptAnswer = gptMake(fullPosting, prompt);
                    log.info("answer={}", gptAnswer);
                    String jsonGpt = transJson(gptAnswer);
                    return gptAnswer;
                } else { // 유효성은 통과했지만 db에 저장된 공고가 없는 경우
                    result = getResult();
                    return result;
                }
            } else { // 숫자가 아닌 다른 문자가 포함된 경우
                result = getResult();
                return result;
            }
        } else { // companyDetails/ 가 없는 경우
            result = getResult();
            return result;
        }
    }


        private String transJson(String gptAnswer) throws JsonProcessingException {


        JSONObject json = new JSONObject();

        String[] lines = gptAnswer.split("\n");
        for (String line : lines) {
            int colonIndex = line.indexOf(":");
            if (colonIndex != -1) {
                String key = line.substring(0, colonIndex).trim();
                String value = line.substring(colonIndex + 1).trim();
                json.put(key, value);
            }
        }

        //   ObjectMapper mapper = new ObjectMapper();
        //  GptResult gptResult = mapper.readValue(json.toString(4), GptResult.class);
        return json.toString(4);
    }

    private GptResult getPosting(String postCode) {
        int postPk = parseInt(postCode);
        Optional<Posting> byId = postingRepository.findById(postPk);
        if (byId.isPresent()) {   // 포스팅 번호가 맞는경우
            Posting posting = byId.get();
            List<PostingExperience> experiences = postingExperienceRepository.findByPosting(posting);
            List<Skill> skills = skillRepository.findByPosting(posting);
            List<WorkType> works = workTypeRepository.findByPostingPostingCode(postPk);


            String combinedExperience = experiences.stream() //요구경력
                    .map(PostingExperience::getExperienceLevel)
                    .collect(Collectors.joining(", "));

            String skill = skills.stream()  // 기술스택
                    .map(Skill::getSkillName)
                    .collect(Collectors.joining(", "));


            String work = works.stream()  //근무조건
                    .map(WorkType::getWorkConditions)
                    .collect(Collectors.joining(", "));

            String fullPosting = "공고제목:" + posting.getPostingTitle() + "요구경력:" + combinedExperience + "기술스택:"
                    + skill + "근무조건:" + work + "학력" + posting.getEducation() + "포지션" + posting.getPosition() + "공고내용:" + posting.getContent();
            GptResult gptResult = GptResult
                    .builder()
                    .result("success")
                    .question1(fullPosting)
                    .build();
            return gptResult;
        } else {      // 포스팅번호는 있고 유효성검사도 통과했지만 db에 없는경우
            GptResult gptResult = GptResult
                    .builder()
                    .result("fail")
                    .build();
            return gptResult;
        }
    }

    public String getResult() throws JsonProcessingException {
        GptResult gptResult = GptResult
                .builder()
                .result("fail")
                .build();
        ObjectMapper mapper = new ObjectMapper();
        String result = mapper.writeValueAsString(gptResult);
        return result;
    }


    public String personAnswer(GptResult gptResult) throws JsonProcessingException {
        String source = "면접 질문:"+gptResult.getQuestion1()+"질문에 대한 응답:"+gptResult.getResult()+"indexing번호:"+gptResult.getQuestion2();
        String requirements = "feedback";
        String prompt = promptMake(requirements);
        String gptAnswer = gptMake(source,prompt);
        String jsonGpt = transJson(gptAnswer);
        log.info("answer={}", gptAnswer);
        return gptAnswer;
    }
}
