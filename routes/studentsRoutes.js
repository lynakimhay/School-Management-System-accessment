import express from 'express';
import studentsController from '../controllers/studentsController.js';
const {createstudents , allStudents , StudentsById , updateStudents , deleteStudents} = studentsController;
const students = express.Router();
students.post('/create', createstudents);
students.get('/all', allStudents );
students.get('/:id',StudentsById);
students.put('/update/:id', updateStudents);
students.delete('/delete/:id', deleteStudents);

export default students;