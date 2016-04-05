/**
 * Created by nghia on 4/5/16.
 */
var ldb = ldb || {};
var ldbList = ldbList || [];// mang danh sach


$(function () {
    ldb.opt = {
        ldb_name: $('.ldb-name'),
        ldb_content: $('.ldb-content')
    }
});

ldbList = [{
    "name": "Phạm nhân Nghĩa",
    "img": "img/user1.jpg",
    "point": 1,
},
    {
        "name": "Khắc Huy Đz",
        "img": "img/user2.jpg",
        "point": 13,
    }, {
        "name": "Robert Huth",
        "img": "img/user3.jpg",
        "point": 1,
    },
    {
        "name": "Tạ tốn",
        "img": "img/user4.jpg",
        "point": 1,
    }

];
ldbList2 = [{
    "name": "Khắc  Nghĩa nhé",
    "img": "img/hoanthanh.png",
    "point": 12,

},
    {
        "name": "TÚ nồ",
        "img": "img/1024.png",
        "point": 3,
    }, {
        "name": "Tuấn Anh nhé",
        "img": "img/profile.png",
        "point": 2,
    },
    {
        "name": "Quang Huy Đz nhé",
        "img": "img/history-exam.png",
        "point": 1,
    }

];

ldb.load = function (ldbList,name) {
    var index = 0;
    var rank;
    ldb.opt.ldb_name.html(name);
    ldb.opt.ldb_content.html('');

    ldbList.forEach(function(q){
        if(index == 0){
            rank = '<img src="img/medal_gold_2.png">';
        }else if(index == 1){
            rank = '<img src="img/medal_silver_2.png">';
        }else if(index == 2){
            rank = '<img src="img/medal_bronze_2.png">';
        }else{
            rank = index + 1;
        }
        ldb.opt.ldb_content.append('<tr class="hoverable"><td>'+ rank +'</td><td ><img class="img-responsive img-circle" src="'+ q.img +'" alt="'+ q.name+'" >' + q.name + '</td><td>'+ q.point +'</td></tr>');
        index++;
        console.log(index);
    })
};

