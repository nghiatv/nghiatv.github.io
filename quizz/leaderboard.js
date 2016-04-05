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


ldb.load = function () {
    ldbList = [{
        "name": "nghia",
        "point": 1,
    },
        {
            "name": "huy",
            "point": 13,
        }, {
            "name": "ta. nhe",
            "point": 1,
        },
        {
            "name": "tgan nghi",
            "point": 1,
        }

    ];
    var index = 0;
    ldbList.forEach(function(q){
        ldb.opt.ldb_content.append('<tr><td>'+ (index + 1) +'</td><td>' + q.name + '</td><td>'+ q.point +'</td></tr>');
        index++;
        console.log(q.name);
    })
};

ldb.load2 = function () {
    ldbList = [{
        "name": "nghia",
        "point": 1,
    },
        {
            "name": "huy",
            "point": 13,
        }, {
            "name": "ta. nhe",
            "point": 1,
        },
        {
            "name": "tgan nghi",
            "point": 1,
        }

    ];
    var index = 0;
    ldbList.forEach(function(q){
        ldb.opt.ldb_content.append('<tr><td>'+ (index + 1) +'</td><td>' + q.name + '</td><td>'+ q.point +'</td></tr>');
        index++;
        console.log(q.name);
    })
};
