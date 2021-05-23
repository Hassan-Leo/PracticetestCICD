var express = require('express');
var app = express();

var data=[
    {
        nam1: "Muhammad Rafay",
        RollNo: "17b-008-se",
        student:{
            present:true,
            graduate: false
        }
    },
    {
        nam1: "Hassan Ahmed",
        RollNo: "17b-049-se",
        student:{
            present:true,
            graduate: false
        }
    },
    {
        nam1: "Muhammad Ismail",
        RollNo: "17b-062-se",
        student:{
            present:true,
            graduate: false
        }
    },
    {
        nam1: "Muhammad Aamir",
        RollNo: "17b-034-se",
        student:{
            present:true,
            graduate: false
        }
    },
    {
        nam1: "Abdur Rafay",
        RollNo: "17b-053-se",
        student:{
            present:true,
            graduate: false
        }
    }
]

app.get('/', function (req, res) {
    res.json(data);
});

app.listen(3000);