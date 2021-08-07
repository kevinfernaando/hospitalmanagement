const pool = require('../db');
const queries = require('../queries');


const getPatientAppointment = (req, res) => {
    const patient_id = req.params.patient_id;

    pool.query(queries.getPatientAppointment, [patient_id], (err, results) => {
        if(!results.rows.length) {
            res.send('u dont have any appointment...');
            return;
        }

        if(err) throw err;
        res.json(results.rows);
    })
}

const getAllDoctors = (req, res) => {
    pool.query(queries.getAllDoctors, (err, results) => {
        if(!results.rows.length) {
            res.send('there are no doctor available...');
            return;
        }
        
        if(err) throw err;
        res.json(results.rows);

    })
}

const searchDoctor = (req, res) => {
    const param = req.params.param;
    pool.query(queries.searchDoctor, [param], (err, results) => {
        if(!results.rows.length) {
            res.send('cant find any doctor...');
            return;
        }

        if(err) throw err;
        res.json(results.rows);
    })
}


const makeAppointment = (req, res) => {
    const patient_id = req.params.patient_id;
    const { doctor_id, date } = req.body;

    pool.query(queries.findDoctorById, [doctor_id], (err, doctor) => {
        if(!doctor.rows.length) {
            res.send('cant find doctor with given id');
            return;
        }

        pool.query(queries.makeAppointment, [doctor_id, patient_id, date], (err, results) => {
            if(err) throw err;
            console.log(patient_id);
            res.send('added new appointment!');
        })
    })
}

const cancelAppointment = (req, res) => {
    const {patient_id, appointment_id} = req.params;
    pool.query(queries.cancelAppointment, [patient_id, appointment_id], (err, results) => {
        if(!results.rows.length) {
            res.send('appointment doesn\'t exist');
            return;
        }

        res.send('appointment deleted!');
    })
    
}

const editAppointment = (req, res) => {
    const {patient_id, appointment_id} = req.params;
    const date = req.body.date;

    pool.query(queries.getAppointmentByIdPatient, [appointment_id, patient_id], (err, appointment) => {
        if(!appointment.rows.length) {
            res.send(`can't find appointment`);
            return;
        }

        pool.query(queries.updateAppointmentDatePatient, [appointment_id, patient_id, date], (err, results) => {
            if(err) {
                res.send('invalid date format (yyyy-mm-dd)')
            } else {
                res.status(200).send('appointment date updated!');
            }
        })


    })
}

module.exports = {
    getPatientAppointment,
    getAllDoctors,
    searchDoctor,
    makeAppointment,
    cancelAppointment,
    editAppointment
}