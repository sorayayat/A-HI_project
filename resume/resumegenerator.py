from docx import Document
import os
import subprocess

# LibreOffice 실행 파일 경로 설정
libreoffice_path = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe'

# 이력서 템플릿 파일 경로
template_path = 'ResumeTemplate.docx'

# 생성된 이력서를 저장할 Docx 파일 경로
output_path_docx = 'ResumeNew.docx'

# 생성된 이력서를 저장할 PDF 파일 경로
output_path_pdf = 'ResumeNew.pdf'

# 텍스트 치환 함수
def replace_text_in_paragraph(paragraph, context):
    for run in paragraph.runs:
        for key, value in context.items():
            if key in run.text:
                run.text = run.text.replace(key, '' if value is None else value)

# 이력서 템플릿을 채우고 저장하는 함수
def fill_template(template_path, output_path, context):
    try:
        doc = Document(template_path)

        for paragraph in doc.paragraphs:
            replace_text_in_paragraph(paragraph, context)

        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        replace_text_in_paragraph(paragraph, context)

        doc.save(output_path)
        print("Document created successfully. File path:", output_path)
    except Exception as e:
        print(f"Error: {e}")

# Docx 파일을 PDF로 변환하는 함수
def convert_to_pdf(docx_path, pdf_path, libreoffice_path):
    try:
        subprocess.run([libreoffice_path, '--headless', '--convert-to', 'pdf', docx_path, '--outdir', os.path.dirname(pdf_path)])
        print(f"PDF conversion successful. File path: {pdf_path}")
    except Exception as e:
        print(f"Error during PDF conversion: {e}")

# 이력서 데이터를 받아서 텍스트 치환에 사용할 context를 생성하는 함수
def generate_resume(resume_data):
    context = {
        '{Name}': resume_data.get("name"),
        '{Phone}': resume_data.get("phone_number"),
        '{Email}': ', '.join(resume_data.get("email", [])),  # 리스트를 문자열로 결합
        '{Git}': resume_data.get("git"),
        '{JobTitle}': resume_data.get("job_title"),
        '{Skills}': ', '.join(resume_data.get("skills", [])),
        '{Experiences}': ', '.join(resume_data.get("experiences", [])),
        '{ExperiencesDetail}': ', '.join(resume_data.get("experiences_detail", [])),  # 필드 이름 수정
        '{Projects}': ', '.join(resume_data.get("projects", [])),
        '{ProjectsDetail}': ', '.join(resume_data.get("projects_detail", [])),  # 필드 이름 수정
        '{Education}': ', '.join(resume_data.get("educations", [])),
        '{EducationDetail}': ', '.join(resume_data.get("educations_detail", [])),  # 필드 이름 수정
        '{AwardsAndCertifications}': ', '.join(resume_data.get("awards_and_certifications", [])),
    }
    return context

# 이 함수는 chat_response를 받아서 이력서 내용을 생성하고 파일로 저장하는 역할을 합니다.
# 필요한 작업을 수행하도록 구현하십시오.
# 예시로 파일에 저장하고 파일 경로를 반환하도록 작성합니다.
def generate_resume_content(chat_response):
    generated_resume_path = 'path_to_generated_resume.docx'  # 예시 경로, 실제 경로로 변경해야 합니다.

    # chat_response를 이력서 내용으로 사용하고 파일로 저장
    with open(generated_resume_path, 'w', encoding='utf-8') as file:
        file.write(chat_response)

    return generated_resume_path
