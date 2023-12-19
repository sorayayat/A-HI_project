function answer01() {
    const inputVal = document.getElementById("q01_num").value;
    if (!isNaN(inputVal)) {
        alert("숫자입니다.");
    } else {
        alert("숫자가 아닙니다.");
    }
}

function answer02() {
    const nameList = document.getElementById("nameList").innerHTML;
    const inputName = document.getElementsByTagName("input")[1].value;

    if (nameList.indexOf(inputName) != -1) {
        alert("이름이 있습니다.");
    } else {
        alert("이름이 없습니다.");
    }
}

function answer03() {
    const rdoName = document.getElementsByName("rdo");
    for (var i = 0; i < rdoName.length; i++) {
        if (rdoName[i].checked) {
            url = "http://www." + rdoName[i].value + ".com";
            window.open(url);
        }
    }
}

function answer04(chk) {
    const $chkBox = document.getElementsByName("subject");
    for (var i = 0; i < $chkBox.length; i++) {
        $chkBox[i].checked = chk;
    }
}

function answer05() {
    const $randomInput = document.getElementById("randomInput");
    let randomVal = Math.floor(Math.random() * 20 + 1);

    $randomInput.value = randomVal;
}

function answer06() {
    const $options = document.getElementById("locationSelect");
    let url = "";
    for (var i = 0; i < $options.length; i++) {
        if ($options[i].selected) {
            url = $options[i].value;
        }
    }
    location.href = "http://www." + url + ".com";
}

function answer07() {
    const numVal = document.getElementById("numVal").innerHTML;
    const numList = numVal.split(",");
    numList.sort(function (a, b) {
        return a - b;
    });
    alert(numList);
}

function answer08() {
    const startDate = document.getElementById("startDate").value;
    const today = new Date();
    const startDay = new Date(startDate);

    const res = Math.floor((today.getTime() - startDay.getTime()) / (60 * 60 * 24 * 1000));

    alert(res);
}

function answer09() {
    let doc = document.forms[0];
    let vals = [doc.name.value, doc.age.value, doc.gender.value];
    let table = document.getElementById("createTable");

    let tr = document.createElement("tr");
    for (let i = 0; i < vals.length; i++) {
        let td = document.createElement("td");
        td.textContent = vals[i];
        tr.appendChild(td);
    }

    table.appendChild(tr);
}

function answer10() {
    let dan = parseInt(document.getElementById("gugudan").value);
    let res = "";

    for (let i = 1; i < 10; i++) {
        res += dan + " * " + i + " = " + (dan * i) + "\n";
    }
    alert(res);
}
