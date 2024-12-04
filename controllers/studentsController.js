import mongoose from "mongoose";
import Students from "../models/students.js";    

const createstudents = async (req,res) => {
    try {
        const { name, IDCard, email, phone, classId: bodyClassId } = req.body; 
        const { id: paramClassId } = req.params; 
        const classId = paramClassId || bodyClassId; 
    
        if (!classId) {
            throw new Error("Class ID is required.");
        }
    
        const newStudent = await Students.create({
            IDCard,
            name,
            email,
            phone,
            classId,
        });
    
        console.log("Student Created:", newStudent);
        res.status(201).json({ message: "Student created successfully", student: newStudent });
    } catch (err) {
        console.error("Error creating student:", err);
        res.status(500).json({ error: "Error creating student", details: err.message });
    }
    
};

const allStudents = async (req,res) => {
    try {
        const students = await Students.find();
        res.status(200).json({ success: true, data: students });
        console.log("All students:", students);
    } catch (err) {
        console.error("Error reading students:", err);
        res.status(200).json({ success: false, message:err.message  });

    }
};

const StudentsById = async (req,res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message: "Student not found" });
        }
        const students = await Students.findById(id);
        if (!students) {
            return res.status(404).json({ success: false, message: `student with ID ${id} not found` });
        } 
        res.status(200).json({ success: true, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message:err.message  });
        console.error("Error reading student:", err);
    }
};

const updateStudents = async (req,res) => {
    try {
        const {id}=req.params;
        const {name,email,phone,classId}=req.body;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ success:false,message: "Student not found" });
        }
        const updatedStudents = await Students.findByIdAndUpdate(
           id,{ name,email,phone,classId}, { new: true });
        if (!updatedStudents) {
            return res.status(404).json ({success:false,message:`students With ID ${id}`})
        } 
        res.status(200).json({success:true,data:updatedStudents});
    } catch (err) {
        res.status(500).json({ success: false, message:err.message  });
    }
};

const deleteStudents = async (req,res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Student not found" });
        }
        const deleteStudents = await Students.findByIdAndDelete(id);
        if (!deleteStudents) {
            return res.status(404).json({ success: false, message: `students with ID ${id} not found` });
        }
        res.status(200).json({ success: true, message: `students with ID ${id} has been deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export default { createstudents, allStudents , StudentsById ,updateStudents , deleteStudents };



