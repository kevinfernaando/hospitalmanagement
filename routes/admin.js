const express = require('express');
const router = express.Router();
const controller = require('../controller/admin');


// ========== READ / GET ==========
router.get('/', controller.getAllAppointments); // get all appointments
router.get('/doctor', controller.getAllDoctors); // get all doctors data
router.get('/doctor/:doctor_name', controller.getAppointmentsByDoctorName); // search doctor name
router.get('/patient', controller.getAllPatients); // get all patients data
router.get('/patient/:patient_name', controller.getAppointmentsByPatientName); // search patient by name

// ========== CREATE / POST ==========
router.post('/', controller.addNewAppointment); // make new appointment
router.post('/doctor', controller.addNewDoctor); // make new doctor data
router.post('/patient', controller.addNewPatient); // make new patient data

// ========== UPDATE / PUT ==========
router.put('/:appointment_id', controller.updateAppointmentDate); // edit appointment date

// ========== DELETE ==========
router.delete('/:appointment_id', controller.deleteAppointment); // delete an appointment
router.delete('/doctor/:doctor_id', controller.deleteDoctor); // delete doctor data
router.delete('/patient/:patient_id', controller.deletePatient);



module.exports = router;