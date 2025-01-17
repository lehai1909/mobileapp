"use strict";


window.addEventListener("DOMContentLoaded",
    function () {


        if (typeof this.localStorage === "undefined") {
            this.window.alert("このバラウザはLocal Storge機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            dellLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    }, false
);


function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;


            if (key == "" || value == "") {
               // window.alert("Key, Memoはいずれも必須です。");
               Swal.fire({
                title:"Memo app"// tiêu đề
                ,html: "Key, Memoはいずれも必須です。"
                ,icon: "error"
                ,allowOutsideClick : false
               });
                return;
            } else {
                //let w_confirm = window.confirm("LocalStorageに\n 「" + key + " " + value + "」を保存します。\nよろしいですか？");
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\n を保存(save)しますか？";
                Swal.fire({
                    title:"Memo app"
                    ,html: w_msg
                    ,icon: "question"
                    ,showCancelButton : true
                }).then(function(result) {

                if (result.value === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    Swal.fire({
                        title: "Memo"
                        ,html: w_msg
                        ,icon:"success"
                        ,allowOutsideClick:false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
            }
        }, false
    );
};

function dellLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = "0"; //đôi từ ver3 w_sel==>w_cnt để dùng được kết quả chọn nhiều
            w_cnt = selectCheckBox("del");

            if (w_cnt >= "1") {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しますか？";
                Swal.fire({
                    title:"Memo app"
                    ,html: w_msg
                    ,icon: "question"
                    ,showCancelButton : true
                }).then(function(result) {

                if (result.value === true) {
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) {
                            localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                        }
                    }
                    viewStorage();
                    let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";                    
                    Swal.fire({
                        title: "Memo"
                        ,html: w_msg
                        ,icon:"success"
                        ,allowOutsideClick:false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
            }
        }, false
    );

    //v5
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if(e.target.classList.contains("trash") === true){
            let index = e.target.parentNode.parentNode.rowIndex
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = `LocalStorageから\n 「${key} ${value}」\nを削除しますか？`;
            ;
            Swal.fire({
                title : "Memo app",
                html : w_delete,
                type : "question",
                showCancelButton : true
            }).then(result => {
                if(result.value === true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = `LocalStorageから${key} ${value}を削除(delete)しました!`;
                    Swal.fire({
                        title : "Memo app",
                        html : w_msg,
                        type : "success",
                        allowOutsideClick : false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
        }
    })
}

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();

            let w_msg = "LocalStorageのデータをすべて削除します。\nよろしいですか？";
                Swal.fire({
                    title:"Memo app"
                    ,html: w_msg
                    ,icon: "question"
                    ,showCancelButton : true
                }).then(function(result) {

                if (result.value === true) {
                    localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除しました。";
                    Swal.fire({
                        title: "Memo"
                        ,html: w_msg
                        ,icon:"success"
                        ,allowOutsideClick : false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
};
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function (e) {
        e.preventDefault();
        const w_cnt = selectCheckBox("select");
        if (w_cnt === 0) {
            window.alert("1つ以上選択(select)してください。");
        }
    }, false);
};


function selectCheckBox(mode) { //chuyển đổi check 1 cái 1 sang check nhiều cái selectRadioBtn==> selectCheckBox
    //let w_sel ="0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                // return w_sel = "1";  xóa từ ver2
            }
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title:"Memo app"// tiêu đề
                ,html: "1つ選択(select)してください。"
                ,icon: "error"
                ,allowOutsideClick : false
               });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title:"Memo app"// tiêu đề
                ,html: "1つ以上選択(select)してください。"
                ,icon: "error"
                ,allowOutsideClick : false
               });
        }
    }

};
function viewStorage() {
    const list = document.getElementById("list");

    while (list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src ='img/trash_icon.png' class='trash'>";
    }
    //
    //
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");
};