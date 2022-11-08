require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const schemas = require('./schemas');

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/studentDB", {useNewUrlParser: true});

const semesterSubjects = mongoose.model('semesterSubject');

const userElective = mongoose.model('student');


//Create Poll for semester for Lectutrers
app.get("/pollCreate/:page", (req, res)=>{
    const semester = Number(req.params.page);

    const semesterNew = new semesterSubjects({
        semester: semester,
    }); 

    semesterSubjects.findOne({semester: semester}, function(err,foundList){
        if(err){
            console.log(err);
        }else{
            if(foundList){
                console.log(foundList.semester);
                console.log(foundList.subjects);
            }else{
                semesterNew.save();
                res.redirect("/pollCreate/"+semester);
            }
        }
    })
});



//For Adding Options in Poll for semester
app.post("/pollCreate/add/:page", (req, res)=>{
    let subject = req.body.subjectName;
    let semester = Number(req.params.page);
    console.log("What");
    semesterSubjects.findOne({semester: semester}, function(err,foundList){
        foundList.subjects.push(subject);
        foundList.save();
        res.redirect("/pollCreate/" + semester);
    })
})


// //For Deleting Options in Poll for semester
app.post("/pollCreate/delete/:page",(req, res)=>{
    const subjectName = req.body.checkbox;
    let semester = Number(req.params.page);
    console.log("what");
    semesterSubjects.findOne({semester: semester}, function(err,foundList){
        const index = foundList.subjects.indexOf(subjectName);
        foundList.subjects.splice(index, 1);
        foundList.save();
        res.redirect("/pollCreate/" + semester);
    })
    
 })

 app.get("/poll", (req, res)=>{
    //select semester to redirect to the poll
    res.send("<h1>Select Semester: 1 2 3 4 5 6 7 8</h1>");
 })

//To check Poll option for Students
app.get("/poll/:page", (req, res)=>{
    let semester = Number(req.params.page);

    semesterSubjects.findOne({semester: semester}, function(err,foundList){
        if(err){
            console.log(err);
        }else{
            if(foundList){
                res.send(foundList.subjects);
            }else{
                res.redirect("/poll");
            }
        }
    })

})

//After student selected the option post request will be sent to this route with that value
app.post("/poll/:page", (req, res)=>{
    let semester = Number(req.params.page);

    let selectedCourse = req.body.course;
    let cgpa = Number(req.body.cgpa);
    let userMail = req.body.mail;

    // console.log(semester);
    userElective.findOne({ email : userMail, semester: semester}, function(err, student){
        if(err){
            console.log(err);
        }else{
            if(student){
                student.course = selectedCourse;
                student.save();
                res.redirect("/poll/" + semester);
            }else{
                const studentNew = new userElective({
                    semester: semester,
                    email: userMail,
                    cgpa: cgpa,
                    course: selectedCourse
                });
                studentNew.save();
                res.redirect("/poll/" + semester);
            }
        }
    });
})


//To check the results
app.get("/result/:page",async (req,res)=>{
    let semester = Number(req.params.page);

    const semesterValue = await semesterSubjects.findOne({semester: semester})

    const students = await userElective.find()

    let ans = {}

    semesterValue.subjects.forEach(subject => {

        ans[subject] = students.filter(student => {
            return student.course == subject
        })

    });

    //results are sent in the from of dictionery
    res.send(ans)

})

app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})