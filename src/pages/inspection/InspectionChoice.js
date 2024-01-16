import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import style from "./static/css/inspectionDetail.module.css";
import style from "./Card.module.css";
import btnStyle from "./static/css/ResumeModifyModal.module.css";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { callImageToPdfAPI } from "../../apis/inspectionAPICalls";
import jsPDF from "jspdf";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { redirect, useNavigate } from "react-router";
import { resetState } from "../../modules/inspectionModule";
import Swal from "sweetalert2";

function InspectionChoice() {
  const modify = useSelector((state) => state.inspectionReducer.modify);
  const resume = useSelector((state) => state.inspectionReducer.resume);
  const newResume = useSelector((state) => state.inspectionReducer.newResume);
  const [modifyResume, setModifyResume] = useState({});
  const [btn, setBtn] = useState(false);
  const divRef = useRef();
  const navgaite = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState([]);
  const [count, setCount] = useState();
  const [desiredHeight, setDesiredHeight] = useState([]);
  const [isLoding, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const Toast = Swal.mixin({
    toast: true,
    position: "ri",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", () => Swal.stopTimer());
      toast.addEventListener("mouseleave", () => Swal.resumeTimer());
    },
  });

  console.log(form);
  useEffect(() => {
    if (modify?.data)
      setForm({
        eligibility: modify.data.eligibility,
        skilles: modify.data.skille,
      });
    if (!resume?.data && !modify?.data) {
      Toast.fire({
        icon: "error",
        title: "이력서 가 존재하지않습니다.\n 메인페이지로 이동합니다. ",
      }).then(() => {
        navgaite("/");
      });
    }
  }, []);

  console.log(modify);
  useEffect(() => {
    if (modify?.data.index !== 99) {
      setModifyResume(undefined);
      setModifyResume(resume?.data.SelfIntroduction);
      setModifyResume(
        resume?.data.SelfIntroduction.map((state, index) => {
          if (index === modify?.data.index) {
            return {
              ...modifyResume,
              content: modify?.data.SelfIntroduction[index].content,
              title: modify?.data.SelfIntroduction[index].title,
            };
          } else {
            return {
              ...modifyResume,
              content: state.content,
              title: state.title,
            };
          }
        })
      );
    } else {
      setModifyResume(modify?.data.SelfIntroduction);
    }
  }, [resume?.data.SelfIntroduction]);

  useEffect(() => {
    if (newResume?.data && newResume?.status === 200 && btn == true) {
      const byteCharacters = atob(newResume.data.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      saveAs(blob, newResume.data.title + ".pdf");
      setBtn(false);
    }
  }, [newResume]);

  const saveBtnHandler = async () => {
    setIsLoading(true);
    if (!divRef.current) return;
    try {
      const div = divRef.current;
      const a4Height = 1122;
      const allCanvases = [];
      const totalHeight = div.scrollHeight;
      const numOfSections = Math.ceil(totalHeight / a4Height);
      const orginOverflow = div.style.overflow;
      div.style.overflow = "visible";
      for (let i = 0; i < numOfSections; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const captureHeight =
          i === numOfSections - 1 ? totalHeight - i * a4Height : a4Height;
        const yOffset =
          i === numOfSections - 1 && i !== 0 ? i * a4Height - 50 : i * a4Height;
        const canvas = await html2canvas(div, {
          scale: 4,
          useCORS: true,
          y: yOffset,
          height: captureHeight,
        });
        allCanvases.push(canvas);
      }
      div.style.overflow = orginOverflow;
      setCount(allCanvases.length);
      allCanvases.forEach((canvas, i) => {
        canvas.toBlob((blob) => {
          setImg((previmg) => [...previmg, blob]);
        });
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  useEffect(() => {
    if (img.length === count) {
      for (let i = 0; i < count; i++) {
        blobToImageSize(img[i]).then((size) => {
          setDesiredHeight((height) => [...height, size.height]);
        });
      }
    }
  }, [img]);

  useEffect(() => {
    if (desiredHeight.length === count) {
      console.log(desiredHeight);
      BlobsToPdf();
    }
  }, [desiredHeight]);

  useEffect(() => {
    if (pdf) {
      const formData = new FormData();
      formData.append("title", resume.data.title);
      formData.append("memberId", userInfo.id);
      formData.append("pdf", pdf.output("blob"), resume.data.title + ".pdf");
      dispatch(callImageToPdfAPI(formData)).then((result) => {
        if (result.status === 200) {
          pdf.save(
            resume.data.title ? resume.data.title : userInfo.name + ".pdf"
          );
          setIsLoading(false);
          dispatch(resetState());
          navgaite("/", redirect);
        }
      });
    }
  }, [pdf]);

  const blobToImageSize = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        const img = new Image();
        img.onload = function () {
          resolve({ width: this.width, height: this.height });
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const BlobsToPdf = async () => {
    const pdf = new jsPDF("p", "mm");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    let pdfHeightLeft = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < img.length; i++) {
      const { dataUrl, width, height } = await BlobToPdf(
        img[i],
        pdfWidth,
        desiredHeight[i]
      );

      if (height > pdfHeightLeft && i > 0) {
        pdf.addPage();
        pdfHeightLeft = pdf.internal.pageSize.getHeight();
      }

      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdfHeightLeft -= height;
    }

    setPdf(pdf);
  };

  const BlobToPdf = (blob, pdfWidth, pdfHeight) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;
          resolve({ dataUrl, width, height });
        };
        img.onerror = reject;
        img.src = dataUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

    return (
        <>
            {
            isLoding && 
                <div className={style.loadingIndicator}>
                  <div className={style.spinner}></div>
                </div>
            }
            {
                modify?.data &&
                <div>
                    <div className={style.resumeBack}>
                            <h1 className={style.resumeTitle}>수정 팁</h1>
                        <div className={style.personalInformation}>
                            <h4 className={style.gptAnswer}>{modify.data.gptAnswer}</h4>
                        </div>
                        <div className={style.befoAfter}>
                            <div className={style.befo}>
                                <h1 className={style.title}>제목 : befo</h1>
                                <div className={[style.container]} >
                                    <div className={style.resumeArea}>
                                        <div className={style.contentArea}>
                                            <div className={style.Contect}>
                                                <h5 className={style.text}>CONTECT</h5>
                                                <p className={style.text}>{resume.data.PersonalInformation.email}</p>
                                                <p className={style.text}>{resume.data.PersonalInformation.phone}</p>
                                                <p className={style.text}>{resume.data.PersonalInformation.github}</p>
                                            </div>
                                            <p className={style.Line}></p>
                                            <div className={style.Education}>
                                                <h5 className={style.text}>EDUCATION</h5>
                                                <p className={style.text}>{resume.data.PersonalInformation.education}</p>
                                            </div>
                                            <p className={style.Line}></p>
                                            <div className={style.Awards}>
                                                <h5 className={style.text}>AWARDS & CERTIFICATIONS</h5>
                                                {
                                                    resume.data?.AwardsCertifications.map((awa) => (
                                                        <p className={style.text}>{awa}</p>
                                                    ))
                                                }
                                            </div>
                                            <p className={style.Line}></p>
                                        </div>
                                        <div className={style.content}>
                                            {/* 카드 내 흰색 부분 영역 */}
                                            <h3 className={style.text}>이름 : {resume.data.PersonalInformation.name}</h3>
                                            <h3 className={style.text}>{resume.data.PersonalInformation.position}</h3>
                                            <p className={style.Line}></p>
                                            <h3 className={style.text}>SKILLS</h3>
                                            <div className={style.skillDev}>
                                                {resume.data.Skills.map((skille) => (
                                                    <p className={style.text}>{skille}</p>
                                                ))}
                                            </div>
                                            <p className={style.Line}></p>
                                            <div className={style.ExperienceDev}>
                                                <h3 className={style.text}>EXPERIENCE</h3>
                                                {
                                                    resume.data.Experience.map((exp) => (
                                                        <>
                                                            <h5 className={style.text}>{exp.company}</h5>
                                                            <h6 className={style.text}>{exp.duration}</h6>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            <p className={style.Line}></p>
                                            <div className={style.ProjectsDev}>
                                                <h3 className={style.text}>Projects</h3>
                                                {
                                                    resume.data.Projects.map((project) => (
                                                        <>
                                                            <h5 className={style.text}>{project.ProjectsTitle}</h5>
                                                            <h6 className={style.text}>{project.ProjectsContent}</h6>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            <>
                                                <p className={style.Line}></p>
                                            </>
                                        </div>
                                    </div>
                                    <div className={style.selfContent}>
                                        <p className={style.Line}></p>
                                        <h3>자기소개서</h3>
                                        <button className={style.modiftBtn1}
                                            onClick={/*() => onClickHandler(resume?.data.SelfIntroduction, 99)*/ null}>전체 수정</button>
                                        <p className={style.Line}></p>
                                        <dev className={style.selfDev}>
                                            {
                                                resume.data.SelfIntroduction.map((self, index) => (
                                                    <div key={index} className={style.self}>
                                                        <button className={style.modiftBtn2}
                                                            onClick={/*() => onClickHandler(self, index)*/null}>수정</button>
                                                        <h4 className={style.selfTitle}>{self.title}</h4>
                                                        <p className={style.selfText}>{self.content}</p>
                                                    </div>
                                                ))
                                            }
                                        </dev>
                                    </div>
                                </div>
                            </div>
                            {modifyResume.length > 0 &&
                            <>
                                <div className={style.after}>
                                    <h1 className={style.title}>제목 : After</h1>
                                        <div className={[style.container]} ref={divRef}>
                                            <div className={style.contentArea}>
                                                <div className={style.Contect}>
                                                    <h5 className={style.text}>CONTECT</h5>
                                                    <p className={style.text}>{resume.data.PersonalInformation.email}</p>
                                                    <p className={style.text}>{resume.data.PersonalInformation.phone}</p>
                                                    <p className={style.text}>{resume.data.PersonalInformation.github}</p>
                                                </div>
                                                <p className={style.Line}></p>
                                                <div className={style.Education}>
                                                    <h5 className={style.text}>EDUCATION</h5>
                                                    <p className={style.text}>{resume.data.PersonalInformation.education}</p>
                                                </div>
                                                <p className={style.Line}></p>
                                                <div className={style.Awards}>
                                                    <h5 className={style.text}>AWARDS & CERTIFICATIONS</h5>
                                                    {
                                                        resume.data.AwardsCertifications.map((awa) => (
                                                            <p className={style.text}>{awa}</p>
                                                        ))
                                                    }
                                                </div>
                                                <p className={style.Line}></p>
                                            </div>
                                            <div className={style.content}>
                                                {/* 카드 내 흰색 부분 영역 */}
                                                <h3 className={style.text}>이름 : {resume.data.PersonalInformation.name}</h3>
                                                <h3 className={style.text}>{resume.data.PersonalInformation.position}</h3>
                                                <p className={style.Line}></p>
                                                <h3 className={style.text}>SKILLS</h3>
                                                <div className={style.skillDev}>
                                                    {resume.data.Skills.map((skille) => (
                                                        <p className={style.text}>{skille}</p>
                                                    ))}
                                                </div>
                                                <p className={style.Line}></p>
                                                <div className={style.ExperienceDev}>
                                                    <h3 className={style.text}>EXPERIENCE</h3>
                                                    {
                                                        resume.data.Experience.map((exp) => (
                                                            <>
                                                                <h5 className={style.text}>{exp.company}</h5>
                                                                <h6 className={style.text}>{exp.duration}</h6>
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                                <p className={style.Line}></p>
                                                <div className={style.ProjectsDev}>
                                                    <h3 className={style.text}>Projects</h3>
                                                    {
                                                        resume.data.Projects.map((project) => (
                                                            <>
                                                                <h5 className={style.text}>{project.ProjectsTitle}</h5>
                                                                <h6 className={style.text}>{project.ProjectsContent}</h6>
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <p className={style.Line}></p>
                                            <div className={style.selfContent}>
                                                <h3>자기소개서</h3>
                                                <p className={style.Line}></p>
                                                <dev className={style.selfDev}>
                                                    {
                                                        modifyResume.map((self, index) => (
                                                            <div key={index} className={style.self}>
                                                                <h4 className={style.selfTitle}>{self.title}</h4>
                                                                <p className={style.selfText}>{self.content}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </dev>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            }
                        </div>
                        <div className={btnStyle.btnBox}>
                            <button className={btnStyle.saveBtn} onClick={saveBtnHandler}>저장</button>
                            <button className={btnStyle.cencelBtn} onClick={null}>취소</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default InspectionChoice;
