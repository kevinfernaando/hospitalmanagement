const pool = require('../db');
const queries = require('../queries');


// ========== READ / GET ==========
const getAllAppointments = (req, res) => {
    pool.query(queries.getAllAppointments, (err, results) => {
        if(!results.rows.length) {
            res.status(404).send('there are no data...');
            console.log('there are no data...');
            return;
        }

        res.status(200).json(results.rows);
    })
}

const getAllDoctors = (req, res) => {
    pool.query(queries.getAllDoctors, (err, data) => {
        if(!data.rows.length) {
            res.status(404).send('there are no doctors data...');
            console.log('there are no doctors data...');
            return;
        }

        if(err) throw err;
        res.status(200).json(data.rows);
    })
}

const getAppointmentsByDoctorName = (req, res) => {
    const doctor_name = req.params.doctor_name;
    pool.query(queries.getAppointmentsByDoctorName, [doctor_name], (err, results) => {
        if(!results.rows.length) {
            res.status(404).send(`cant find doctor with name ${doctor_name}`);
            console.log(`cant find doctor with name ${doctor_name}`);
            return;
        }

        res.status(200).json(results.rows);
    })
}

const getAllPatients = (req, res) => {
    pool.query(queries.getAllPatients, (err, data) => {
        if(!data.rows.length) {
            res.status(404).send('there are no patients data...');
            console.log('there are no patients data...');
            return;
        }

        if(err) throw err;
        res.status(200).json(data.rows);
    })
}

const getAppointmentsByPatientName = (req, res) => {
    const patient_name = req.params.patient_name;
    pool.query(queries.getAppointmentsByPatientName, [patient_name], (err, results) => {
        if(!results.rows.length) {
            res.status(404).send(`cant find doctor with name ${patient_name}`);
            console.log(`cant find doctor with name ${patient_name}`);
            return;
        }

        res.json(results.rows);
    })
}


// ========== CREATE / POST ==========

const addNewAppointment = (req, res) => {
    const {doctor_id, patient_id, date} = req.body;

    // validate if doctor and patient exist
    pool.query(queries.getAllDoctorPatient, (err, results) => {

        const data = results.rows;
        const doctor_ids = data.map(d => d.doctor_id).filter(d => d !== null);
        const patient_ids = data.map(d => d.patient_id).filter(d => d !== null);

        console.log(doctor_ids);
        console.log(patient_ids);

        const valid = doctor_ids.includes(doctor_id) && patient_ids.includes(patient_id);

        if(!valid) {
            res.status(404).send('cant find doctor or patient with given id');
            return;

        }

        pool.query(queries.addNewAppointment, [doctor_id, patient_id, date], (err, data) => {
            if(err) {
                res.send('invalid date format (yyyy-mm-dd)');
                return;
            }
            res.status(201).send('new appointment added!');
            console.log('new appointment added!');
        })
    })

    
}

const addNewDoctor = (req, res) => {
    // check if the name already exist
    const {name, specialist} = req.body;

    if(!name || !specialist) {
        res.send('invalid data');
        return;
    }

    pool.query(queries.getDoctorName, [name], (err, doctor) => {
        if(doctor.rows.length) {
            res.send(`name already taken!`);
            console.log(`${name} already taken!`);
            return;
        }

        pool.query(queries.addNewDoctor, [name, specialist], (err, results) => {
            if(err) throw err;
            res.send(`${name} data added!`);
        })
    })
}

const addNewPatient = (req, res) => {
    const {name, age, gender} = req.body;

    // validate if name already exist
    pool.query(queries.getPatientName, [name], (err, patient) => {
        if(patient.rows.length) {
            res.send(`${name} already taken`);
            console.log(`${name} already taken`);
            return;
        }

        pool.query(queries.addNewPatient, [name, age, gender], (err, data) => {
            if(err) throw err;
            res.send(`${name} data added!`);
            console.log(`${name} data added!`);
        })
        
    })


}

// ========== UPDATE / PUT ==========

const updateAppointmentDate = (req, res) => {
    const appointment_id = req.params.appointment_id;
    const {date} = req.body;

    pool.query(queries.getAppointmentById, [appointment_id], (err, appointment) => {
        if(!appointment.rows.length) {
            res.send('cant find appointment...');
            return;
        }

        pool.query(queries.updateAppointmentDate, [date, appointment_id], (err, results) => {
            if(err) {
                res.send('invalid date format (yyyy-mm-dd)');
            }
            res.send('appointment updated!');
        })
    })
}


// ========== DELETE ==========

const deleteAppointment = (req, res) => {
    const appointment_id = req.params.appointment_id;
    pool.query(queries.getAppointmentById, [appointment_id], (err, appointment) => {
        if(!appointment.rows.length) {
            res.send('cant find the appointment...');
            return;
        }

        pool.query(queries.deleteAppointment, [appointment_id], (err, results) => {
            if(err) throw err;
            res.status(200).send('appointment deleted!');
        })
    })
}

const deleteDoctor = (req, res) => {
    const doctor_id = req.params.doctor_id;
    pool.query(queries.deleteDoctor, [doctor_id], (err, results) => {

        if(!results.rows.length) {
            res.status(404).send('can\'t find doctor');
            return;
        }

        res.status(200).send(`${results.rows[0].name} deleted!`);
    })
}

const deletePatient = (req, res) => {
    const patient_id = req.params.patient_id;
    pool.query(queries.deletePatient, [patient_id], (err, results) => {

        if(!results.rows.length) {
            res.status(404).send('can\'t find patient');
            return;
        }

        res.status(200).send(`${results.rows[0].name} deleted!`);
        
        

    })
}



module.exports = {
    getAllAppointments,
    addNewDoctor,
    getAllDoctors,
    getAllPatients,
    addNewPatient,
    addNewAppointment,
    getAppointmentsByDoctorName,
    getAppointmentsByPatientName,
    deleteAppointment,
    updateAppointmentDate,
    deleteDoctor,
    deletePatient
}