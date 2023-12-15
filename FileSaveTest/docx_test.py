from docx import Document
import os
import subprocess
import platform

# 새 Word 문서 생성
doc = Document()
doc.add_paragraph("Hello, world!")

# 문서 저장
file_name = "example.docx"
doc.save(file_name)

# 저장된 문서 열기
if platform.system() == 'Darwin':       # macOS 환경
    subprocess.call(['open', file_name])
elif platform.system() == 'Windows':    # Windows 환경
    os.startfile(file_name)
else:                                   # linux variants 환경
    subprocess.call(['xdg-open', file_name])
