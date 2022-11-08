const mongoose = require("mongoose");

const userElectiveSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    }
})

const userElective = new mongoose.model("student", userElectiveSchema);

const semesterSubjectsSchema = new mongoose.Schema({
    semester: Number,
    subjects : [String]
})

const semesterSubjects = new mongoose.model("semesterSubject", semesterSubjectsSchema);
