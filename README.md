
# Employee Management System

## Description

The **Employee Management System** is a command-line application designed to help business owners organize and plan their business by allowing them to view and manage the departments, roles, and employees in their company. This tool provides an intuitive interface for managing company data stored in a PostgreSQL database, enabling better decision-making and business planning.

---

## Features

- **View and Manage Data**:
  - View all departments, roles, and employees.
  - Add new departments, roles, and employees.
  - Update an employee's role.

- **Interactive Command-Line Interface**:
  - User-friendly prompts powered by the `Inquirer` package for seamless interaction.
  - Clear and formatted tables to display data.

- **Database Integration**:
  - Data is stored and managed in a PostgreSQL database using the `pg` package for queries.

---

## User Story

As a **business owner**,  
I want to **view and manage the departments, roles, and employees in my company**  
So that I can **organize and plan my business effectively**.

---

## Application Workflow

### Given:
- A command-line application that accepts user input.

### When the application starts:
- You are presented with the following options:
  - View all departments
  - View all roles
  - View all employees
  - Add a department
  - Add a role
  - Add an employee
  - Update an employee role

### When you choose:
1. **View All Departments**  
   - A table displays department names and IDs.
2. **View All Roles**  
   - A table displays job titles, role IDs, departments, and salaries.
3. **View All Employees**  
   - A table displays employee IDs, names, job titles, departments, salaries, and their managers.
4. **Add a Department**  
   - Prompted to enter a department name, which is then added to the database.
5. **Add a Role**  
   - Prompted to enter a role name, salary, and department, which is added to the database.
6. **Add an Employee**  
   - Prompted to enter the employee's first name, last name, role, and manager, which is added to the database.
7. **Update an Employee Role**  
   - Prompted to select an employee and their new role, which updates the database.

---

## Database Schema

### Tables

#### `department`
| Column   | Data Type        | Constraints               |
|----------|------------------|---------------------------|
| `id`     | SERIAL PRIMARY KEY |                         |
| `name`   | VARCHAR(30)      | UNIQUE NOT NULL           |

#### `role`
| Column          | Data Type          | Constraints                          |
|-----------------|--------------------|--------------------------------------|
| `id`            | SERIAL PRIMARY KEY |                                      |
| `title`         | VARCHAR(30)        | UNIQUE NOT NULL                      |
| `salary`        | DECIMAL            | NOT NULL                             |
| `department_id` | INTEGER            | REFERENCES `department`(id) NOT NULL |

#### `employee`
| Column        | Data Type          | Constraints                    |
|---------------|--------------------|--------------------------------|
| `id`          | SERIAL PRIMARY KEY |                                |
| `first_name`  | VARCHAR(30)        | NOT NULL                       |
| `last_name`   | VARCHAR(30)        | NOT NULL                       |
| `role_id`     | INTEGER            | REFERENCES `role`(id) NOT NULL |
| `manager_id`  | INTEGER            | REFERENCES `employee`(id)      |

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Inquirer**: For interactive command-line prompts.
- **PostgreSQL**: Database management.
- **pg**: Node.js package for database connectivity.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd employee-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Ensure PostgreSQL is installed and running.
   - Create and populate the database using `seeds.sql`.

4. Start the application:
   ```bash
   node index.js
   ```

---

## Usage

- Navigate through the menu to view, add, and update data.
- Follow prompts to perform specific actions.
- Data changes are automatically saved to the database.

---

## Future Enhancements

- Add search functionality for employees and roles.
- Implement sorting and filtering for displayed data.
- Create a web-based front-end interface.

---

## License

This project is licensed under the MIT License.
#### link to the scareenshot video
Link: https://drive.google.com/file/d/11zoLHEMkYXyhFjj7OFEYu8O7Nlh371rC/view?usp=sharing


