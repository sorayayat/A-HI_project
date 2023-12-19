
function answer01() {
    let inputVal = Number(document.getElementById("q01").value);
    alert(inputVal + 10);
}

function answer02() {
    let numberVal = document.getElementById("numberArr").innerHTML;
    let inputVal = document.getElementById("inputVal").value;

    if (numberVal.indexOf(inputVal) != -1) {
        alert(inputVal);
    } else {
        alert("해당 숫자는 존재하지 않습니다.");
    }
}

function answer03() {
    const $urlVal = document.getElementsByName("rdo");
    for (var i = 0; i < $urlVal.length; i++) {
        if ($urlVal[i].checked) {
            location.href = "http://www." + $urlVal[i].value + ".com";
        }
    }
}

function answer04() {
    const $chks = document.getElementsByName("subject");
    $chks[0].checked = true;
}

function answer05() {
    let rd = Math.floor(Math.random() * 45 + 1);
    document.getElementById("randomVAl").value = rd;
}

function answer06() {
    const $opts = document.getElementById("selOption");
    for (var i = 0; i < $opts.length; i++) {
        if ($opts[i].selected) {
            open("http://www." + $opts[i].value + ".com");
        }
    }
}

function answer07() {
    let numList = document.getElementById("numList").innerHTML;
    let res = numList.split(",");
    alert(res.sort());
}

function answer08() {
    let inputDate = document.getElementById("inputDate");
    let start = new Date(inputDate.value);
    start.setDate(start.getDate() + 3);

    switch (start.getDay()) {
        case 0:
            alert("일요일");
            break;
        case 1:
            alert("월요일");
            break;
        case 2:
            alert("화요일");
            break;
        case 3:
            alert("수요일");
            break;
        case 4:
            alert("목요일");
            break;
        case 5:
            alert("금요일");
            break;
        case 6:
            alert("토요일");
            break;
    }
}

function answer09() {
    let dan = parseInt(document.getElementById("dan").value);

    let res = "";
    for (var i = 1; i < 10; i++) {
        res += dan + " * " + i + " = " + (dan * i) + "\n"
    }
    alert(res);
}

function answer10() {
    let nameVal = document.getElementById("inputName").value;
    let addVal = document.getElementById("addVal").innerHTML;
    alert(nameVal + addVal);
}



