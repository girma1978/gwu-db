
const { prompt } = require('inquirer');  
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/queries');

const startApp = async () => {
    const mainMenu = await prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (mainMenu.action) {
        case 'View all departments':
            const departments = await getDepartments();
            console.table(departments);
            startApp();
            break;

        case 'View all roles':
            const roles = await getRoles();
            console.table(roles);
            startApp();
            break;

        case 'View all employees':
            const employees = await getEmployees();
            console.table(employees);
            startApp();
            break;

        case 'Add a department':
            const departmentName = await prompt({
                type: 'input',
                name: 'name',
                message: 'Enter department name:'
            });
            await addDepartment(departmentName.name);
            console.log('Department added successfully!');
            startApp();
            break;

        case 'Add a role':
            const roleDetails = await prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter role title:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter role salary:'
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter department ID for this role:'
                }
            ]);
            await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
            console.log('Role added successfully!');
            startApp();
            break;

        case 'Add an employee':
            const employeeDetails = await prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter employee first name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter employee last name:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter role ID for this employee:'
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter manager ID (leave empty if none):',
                    default: null
                }
            ]);
            await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId || null);
            console.log('Employee added successfully!');
            startApp();
            break;

        case 'Update an employee role':
            const employeeForUpdate = await prompt({
                type: 'input',
                name: 'employeeId',
                message: 'Enter employee ID to update:'
            });

            const newRole = await prompt({
                type: 'input',
                name: 'newRoleId',
                message: 'Enter new role ID for this employee:'
            });

            await updateEmployeeRole(employeeForUpdate.employeeId, newRole.newRoleId);
            console.log('Employee role updated successfully!');
            startApp();
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit();
            break;
    }
};

startApp();
