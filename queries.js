

// === APPOINTMENTS ===
const getAllAppointments = 
`SELECT a.appointment_id, d.name as doctor_name, d.specialist as doctor_specialist, p.name as patient_name, g.gender_name as patient_gender, p.age as patient_age, a.date as appointment_date 
FROM appointments a 
INNER JOIN doctors d ON a.doctor_id = d.doctor_id 
INNER JOIN patients p ON a.patient_id = p.patient_id 
LEFT JOIN gender g ON p.gender = g.gender_code`;

const addNewAppointment = 'INSERT INTO appointments (doctor_id, patient_id, date) VALUES ($1, $2, $3)';
const getAppointmentById = "SELECT * FROM appointments WHERE appointment_id = $1";
const updateAppointmentDate = "UPDATE appointments SET date = $1 WHERE appointment_id = $2"
const deleteAppointment = "DELETE FROM appointments WHERE appointment_id = $1";
const getAllDoctorPatient = 
`SELECT doctor_id, patient_id 
FROM doctors d
FULL OUTER JOIN patients p
ON d.doctor_id = p.patient_id;`

// === DOCTORS ===
const getAllDoctors = 'SELECT * FROM doctors';
const getDoctorName = 'SELECT * FROM doctors WHERE name = $1';
const addNewDoctor = "INSERT INTO doctors (name, specialist) VALUES ($1, $2)";
const getAppointmentsByDoctorName = getAllAppointments + " WHERE d.name ILIKE  '%' || $1 || '%'";
const findDoctorById = "SELECT * FROM doctors WHERE doctor_id = $1";
const deleteDoctor = "DELETE FROM doctors WHERE doctor_id = $1 RETURNING *";


// === PATIENTS === 
const getAllPatients = 'SELECT * FROM patients';
const getPatientName = 'SELECT * FROM patients WHERE name = $1';
const addNewPatient = "INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3)";
const getAppointmentsByPatientName = getAllAppointments + " WHERE p.name ILIKE  '%' || $1 || '%'";
const deletePatient = `DELETE FROM patients WHERE patient_id = $1 RETURNING *`;


// === PATIENTS USER ===
const getPatientAppointment = 
`SELECT a.appointment_id, d.name as doctor_name, d.specialist as doctor_specialist, a.date as appointment_date 
FROM appointments a 
INNER JOIN doctors d ON a.doctor_id = d.doctor_id 
INNER JOIN patients p ON a.patient_id = p.patient_id 
WHERE p.patient_id = $1`;

const searchDoctor = "SELECT * FROM doctors WHERE name ILIKE '%' || $1 || '%' OR specialist ILIKE '%' || $1 || '%'";
const makeAppointment = "INSERT INTO appointments (doctor_id, patient_id, date) VALUES ($1, $2, $3)";
const cancelAppointment = "DELETE FROM appointments WHERE patient_id = $1 AND appointment_id = $2 RETURNING *";
getAppointmentByIdPatient = `SELECT * FROM appointments WHERE appointment_id = $1 AND patient_id = $2`;
updateAppointmentDatePatient = `UPDATE appointments SET date = $3 WHERE appointment_id = $1 AND patient_id = $2`;

module.exports = {
    getAllAppointments,
    getDoctorName,
    addNewDoctor,
    getAllDoctors,
    getAllPatients,
    getPatientName,
    addNewPatient,
    addNewAppointment,
    getAppointmentsByDoctorName,
    getAppointmentsByPatientName,
    getAppointmentById,
    updateAppointmentDate,
    getPatientAppointment,
    searchDoctor,
    findDoctorById,
    makeAppointment,
    cancelAppointment,
    deleteAppointment,
    deleteDoctor,
    getAllDoctorPatient,
    deletePatient,
    getAppointmentByIdPatient,
    updateAppointmentDatePatient
}