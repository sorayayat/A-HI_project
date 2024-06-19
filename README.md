# 전지적 개발자 시점
#### 사회초년생, 취업준비생을 위한 취업 지원 서비스
> 개요 : AI를 활용한 취업 지원 서비스 입니다.
> 이력서 초안 , 자소서 첨삭 , 공고 추천 , 면접 준비 기능으로 취업을 지원합니다.

<br>

<img width="487" alt="image" src="https://github.com/sorayayat/A-HI_project/assets/141603333/fc1dee18-d186-4e09-ad12-1bf677e78fec">


### 서비스 아키텍처

<img width="750" alt="image" src="https://github.com/sorayayat/A-HI_project/assets/141603333/66066f11-ed25-4cb1-aa3b-7b57df38ec7e">


<br>
<br>
<br>

- 이력서초안   
  챗봇과 사용자가 대화를 하여 수집한 정보를 이력서 PDF로 생성하여 제공합니다.

- 공고 추천   
  이력서를 분석하여 경력 및 기술스택 등을 GPT가 분석하여 가장 적합한 공고를 추천합니다.
  사용자가 찜한 공고와 VectorDB에 저장된 공고를 분석하여 유사한 공고를 추천합니다.

- 자소서 첨삭   
  지원할 공고를 검색한 후 지원 자격과 수정 방향을 반영하여 사용자가 제공한 자기소개서를 수정하여 제공합니다.

- 면접 준비   
  원하는 공고의 url을 제공하거나 이력서를 제공하여 분석후 가상 면접 질문을 생성하여 줍니다.
  사용자가 답변을 하게 되면 답변에 대해 피드백을 제공하여 면접 준비를 돕습니다. 

### 역할

Front
React - 인터뷰 페이지 (드래그 앤 드롭으로 이력서 첨부 서버와 통신)

Backend
python server - (이력서 파일 PDF를 텍스트 변환 후 면접 질문 생성)
DB base - sqlalchemy setting 및 aws container로 chormaDB 서버 구축
          데이터베이스 보안 및 접근 제어 설정
