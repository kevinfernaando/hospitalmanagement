const express = require('express');
const router = express.Router();
const controller = require('../controller/patient');

// ========== READ / GET ==========
router.get('/:patient_id/', controller.getPatientAppointment);
router.get('/:patient_id/doctor', controller.getAllDoctors);
router.get('/:patient_id/doctor/:param', controller.searchDoctor);


// ========== CREATE / POST ==========
router.post('/:patient_id/', controller.makeAppointment);


// ========== UPDATE / PUT ==========
router.put('/:patient_id/:appointment_id', controller.editAppointment);

// ========== DELETE ==========
router.delete('/:patient_id/:appointment_id', controller.cancelAppointment);




module.exports = router;