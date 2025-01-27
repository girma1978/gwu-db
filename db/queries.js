
const client = require('./config');

const getDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

const getRoles = async () => {
    const res = await client.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
    return res.rows;
};

const getEmployees = async () => {
    const res = await client.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return res.rows;
};

const addDepartment = async (name) => {
    const res = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

const addRole = async (title, salary, departmentId) => {
    const res = await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    return res.rows[0];
};


const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const res = await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return res.rows[0];
};


const updateEmployeeRole = async (employeeId, newRoleId) => {
    const res = await client.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [newRoleId, employeeId]);
    return res.rows[0];
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
