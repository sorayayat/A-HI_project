from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

# 폰트 파일 등록
pdfmetrics.registerFont(TTFont('PretendardVariable', 'PretendardVariable.ttf'))

# PDF 파일 생성
file_name = "example.pdf"
document = canvas.Canvas(file_name, pagesize=letter)

# 폰트 지정
document.setFont("PretendardVariable", 12)

# 텍스트 추가
document.drawString(72, 72, "홍다희 바보!")

# PDF 저장
document.save()
