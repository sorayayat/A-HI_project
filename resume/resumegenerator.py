from docx import Document
from .utils import call_openai_gpt

def generate_resume_content(data):
    # 이력서 데이터를 메시지 형식으로 변환
    messages = [
        {"role": "system", "content": "당신은 이력서 작성을 도와주는 AI 비서입니다."},
        {"role": "user", "content": f"이름: {data.name}, 휴대폰 번호: {data.phone_number}, 이메일: {data.email}, 직무: {data.job_title}, 기술 스택: {', '.join(data.skills)}, 경력 사항: {', '.join(data.experiences)}, 프로젝트 내용: {', '.join(data.projects)}, 학력: {', '.join(data.educations)}, 수상 내역 및 자격증: {', '.join(data.awards_and_certifications)}"}
    ]

    try:
        response = call_openai_gpt(messages)
        chat_response = response['choices'][0]['message']['content']
        return chat_response
    except Exception as e:
        print(f"Error: {e}")
        return None

def fill_template(template_path, output_path, context):
    # 템플릿 문서 호출
    doc =  Document(template_path)
    
    # 모든 단락을 순회하며 플레이스홀더를 실제 데이터로 교체
    for paragraph in doc.paragraphs:
        for key, value in context.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)
    
    # 모든 테이블을 순회하며 플레이스 홀더를 실제 데이터로 교체
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for key, value in context.items():
                    if key in cell.text:
                        cell.text = cell.text.replace(key, value)
    
    # 최종 문서를 저장
    doc.save(output_path)

    
def save_resume_as_docx(data, output_path):
    # 새 문서 객체 생성
    doc = Document()

    # 문서에 내용 추가
    doc.add_heading('이력서', 0)
    doc.add_paragraph(f"이름: {data.name}")
    doc.add_paragraph(f"휴대폰 번호: {data.phone_number}")
    doc.add_paragraph(f"이메일: {data.email}")
    doc.add_paragraph(f"직무: {data.job_title}")

    if data.skills:
        skills_text = ", ".join(data.skills)
        doc.add_paragraph("기술 스택: " + skills_text)

    # 경력 사항 추가
    if data.experiences:
        experiences_text = ", ".join(data.experiences)
        doc.add_paragraph("경력 사항: " + experiences_text)

    # 프로젝트 추가
    if data.projects:
        projects_text = ", ".join(data.projects)
        doc.add_paragraph("프로젝트: " + projects_text)

    # 교육 추가
    if data.education:
        education_text = ", ".join(data.education)
        doc.add_paragraph("교육: " + education_text)

    # 수상 내역 및 자격증 추가
    if data.awards_and_certifications:
        awards_text = ", ".join(data.awards_and_certifications)
        doc.add_paragraph("수상 내역 및 자격증: " + awards_text)

    # 문서 저장
    doc.save(output_path)