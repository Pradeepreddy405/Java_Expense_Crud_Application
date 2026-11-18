# Expense Tracker Application

A full-stack web-based Expense Tracker application built using **HTML, CSS, JavaScript, Java, Spring Boot, Maven, MySQL, and Nginx**. The application allows users to manage their daily expenses through a simple web interface and performs complete CRUD (Create, Read, Update, Delete) operations.

The project is deployed on an **AWS EC2 instance running Amazon Linux 2023**.

---

## 1. Project Overview

The Expense Tracker application helps users record, manage, and monitor their expenses.

Users can perform the following operations through the web interface:

- Add new expense records.
- View all recorded expenses.
- Update existing expense details.
- Delete expense records.
- View the total expense summary.
- Store expense information permanently in a MySQL database.

The frontend communicates with the Java Spring Boot backend through REST APIs. The backend processes requests and interacts with the MySQL database.

## 2. Key Features

| Feature | Description |
|---|---|
| Add Expense | Create new expense records |
| View Expenses | Display all available expenses |
| Update Expense | Modify existing expense details |
| Delete Expense | Remove unwanted expense records |
| Expense Summary | Display the total expenses |
| REST API | Backend communication through HTTP APIs |
| Database Integration | Store expense records in MySQL |
| Web Interface | Access the application through a browser |
| Service Management | Run the backend as a systemd service |
| Nginx Deployment | Serve frontend files using Nginx |

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Web Server | Nginx |
| Backend Language | Java 21 |
| Backend Framework | Spring Boot 3.5.7 |
| Build Tool | Apache Maven |
| Database | MySQL |
| Database Integration | Spring Data JPA, Hibernate |
| JDBC Driver | MySQL Connector/J |
| Application Server | Embedded Tomcat |
| Operating System | Amazon Linux 2023 |
| Cloud Platform | AWS EC2 |
| Service Management | systemd |
| API Communication | REST API |

## 4. Application Architecture

The application follows a three-tier architecture.

```text
                  USER
                   |
                   |
             WEB BROWSER
                   |
                   |
          FRONTEND - NGINX
          HTML / CSS / JS
                   |
                   |
              REST APIs
                   |
                   |
        BACKEND - SPRING BOOT
                 JAVA
                   |
                   |
             SPRING DATA JPA
                   |
                   |
                MYSQL
                DATABASE
```

### Architecture Explanation

**1. Presentation Layer – Frontend**

- Developed using HTML, CSS, and JavaScript.
- Provides the user interface.
- Allows users to perform expense management operations.
- Served through Nginx.

**2. Application Layer – Backend**

- Developed using Java and Spring Boot.
- Handles incoming HTTP requests.
- Implements CRUD operations.
- Exposes REST API endpoints.
- Communicates with MySQL using Spring Data JPA.

**3. Database Layer – MySQL**

- Stores expense information.
- Maintains expense records.
- Provides persistent data storage.
- Interacts with the backend through JDBC and Hibernate.

## 5. Project Directory Structure

```text
Expense-Tracker/
│
├── README.md
│
├── backend/
│   │
│   ├── pom.xml
│   │
│   ├── src/
│   │   └── main/
│   │       │
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── devops/
│   │       │           └── expense/
│   │       │               │
│   │       │               ├── ExpenseApplication.java
│   │       │               │
│   │       │               ├── controller/
│   │       │               │   └── ExpenseController.java
│   │       │               │
│   │       │               ├── model/
│   │       │               │   └── Expense.java
│   │       │               │
│   │       │               ├── repository/
│   │       │               │   └── ExpenseRepository.java
│   │       │               │
│   │       │               └── service/
│   │       │                   └── ExpenseService.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── logs/
│   │   ├── application.log
│   │   └── application-error.log
│   │
│   └── target/
│       └── expense-tracker-1.0.0.jar
│
└── frontend/
    │
    ├── index.html
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

## 6. AWS EC2 Infrastructure

The application is hosted on an AWS EC2 instance.

### Infrastructure Requirements

- AWS EC2 instance.
- Amazon Linux 2023.
- Java 21.
- Apache Maven.
- MySQL Server.
- Nginx.
- Security Group configuration.

### Required Network Ports

| Port | Service | Purpose |
|---|---|---|
| 22 | SSH | Remote server administration |
| 80 | HTTP | Access frontend through browser |
| 3306 | MySQL | Database connectivity |
| 8080 | Spring Boot | Backend application API |

**Security Note:** Port 3306 should not be exposed publicly. Keep MySQL accessible only through trusted local or private network connections. Port 8080 can also remain private when Nginx is used as a reverse proxy or the backend is accessed internally.

## 7. Database Configuration

### Step 1: Install and Start MySQL

```bash
sudo dnf install mysql-server -y
```

Start MySQL:

```bash
sudo systemctl start mysqld
```

Enable MySQL at boot:

```bash
sudo systemctl enable mysqld
```

Check service status:

```bash
sudo systemctl status mysqld
```

### Step 2: Create the Database

Connect to MySQL using an authorized administrative account:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE Expense_Tracker;
```

### Step 3: Create Database Application User

Create a dedicated database user for the application:

```sql
CREATE USER 'database_admin_369'@'localhost'
IDENTIFIED BY 'REPLACE_WITH_YOUR_DATABASE_PASSWORD';
```

Grant database privileges:

```sql
GRANT ALL PRIVILEGES ON Expense_Tracker.*
TO 'database_admin_369'@'localhost';
```

Verify the grants:

```sql
SHOW GRANTS FOR 'database_admin_369'@'localhost';
```

Exit MySQL:

```sql
EXIT;
```

**Important:** Replace the password placeholder with your actual database password. Never commit database passwords to GitHub or store them directly in publicly accessible configuration files.

## 8. Backend Configuration

### Application Configuration

Backend configuration file:

```text
backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.application.name=expense-tracker

server.port=8080

spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/Expense_Tracker?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true}

spring.datasource.username=${DB_USERNAME:database_admin_369}

spring.datasource.password=${DB_PASSWORD}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=validate

spring.jpa.show-sql=true

spring.jpa.properties.hibernate.format_sql=true

spring.datasource.hikari.maximum-pool-size=5

spring.datasource.hikari.minimum-idle=1
```

### Configuration Explanation

| Property | Purpose |
|---|---|
| server.port | Runs the backend on port 8080 |
| DB_URL | MySQL database connection URL |
| DB_USERNAME | Database application username |
| DB_PASSWORD | Database password supplied through an environment variable |
| ddl-auto=validate | Validates the database schema against entity mappings |
| show-sql | Displays SQL queries in application logs |
| maximum-pool-size | Maximum database connection pool size |

### Secure Environment Variables

The database credentials are maintained separately from the application code.

Environment file:

```text
/etc/expense-tracker/db.env
```

Example structure:

```bash
DB_USERNAME=database_admin_369
DB_PASSWORD=REPLACE_WITH_YOUR_DATABASE_PASSWORD
DB_URL=jdbc:mysql://localhost:3306/Expense_Tracker?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

Set secure permissions:

```bash
sudo chown root:root /etc/expense-tracker
sudo chmod 700 /etc/expense-tracker

sudo chown root:root /etc/expense-tracker/db.env
sudo chmod 600 /etc/expense-tracker/db.env
```

## 9. Build the Backend Application

Navigate to the backend directory:

```bash
cd ~/Expense-Tracker/backend
```

Build the Spring Boot application:

```bash
mvn clean package -DskipTests
```

After a successful build, the JAR file will be generated:

```text
target/expense-tracker-1.0.0.jar
```

Run the application manually for testing:

```bash
java -jar target/expense-tracker-1.0.0.jar
```

Test the API:

```bash
curl http://localhost:8080/api/expenses
```

## 10. Backend Systemd Service Configuration

To run the Spring Boot application continuously in the background and automatically start it after a server reboot, configure a systemd service.

Create the service file:

```bash
sudo vi /etc/systemd/system/expense-tracker.service
```

Add the following configuration:

```ini
[Unit]
Description=Expense Tracker Spring Boot Application
After=network.target mysqld.service
Wants=mysqld.service

[Service]
Type=simple

User=ec2-user

WorkingDirectory=/home/ec2-user/Expense-Tracker/backend

EnvironmentFile=/etc/expense-tracker/db.env

ExecStart=/usr/bin/java -jar /home/ec2-user/Expense-Tracker/backend/target/expense-tracker-1.0.0.jar

Restart=always
RestartSec=10

StandardOutput=append:/home/ec2-user/Expense-Tracker/backend/logs/application.log

StandardError=append:/home/ec2-user/Expense-Tracker/backend/logs/application-error.log

[Install]
WantedBy=multi-user.target
```

### Enable and Start the Service

Reload systemd:

```bash
sudo systemctl daemon-reload
```

Start the application:

```bash
sudo systemctl start expense-tracker
```

Enable automatic startup:

```bash
sudo systemctl enable expense-tracker
```

Check service status:

```bash
sudo systemctl status expense-tracker
```

Restart the application:

```bash
sudo systemctl restart expense-tracker
```

Stop the application:

```bash
sudo systemctl stop expense-tracker
```

### Application Logs

View application logs:

```bash
tail -f ~/Expense-Tracker/backend/logs/application.log
```

View error logs:

```bash
tail -f ~/Expense-Tracker/backend/logs/application-error.log
```

## 11. Frontend Configuration

The frontend is developed using:

- HTML for application structure.
- CSS for styling.
- JavaScript for frontend functionality and API communication.

Frontend source directory:

```text
/home/ec2-user/Expense-Tracker/frontend/
```

### Deploy Frontend Using Nginx

Install Nginx:

```bash
sudo dnf install nginx -y
```

Start Nginx:

```bash
sudo systemctl start nginx
```

Enable Nginx at boot:

```bash
sudo systemctl enable nginx
```

Check Nginx status:

```bash
sudo systemctl status nginx
```

### Copy Frontend Files to Nginx Document Root

The Nginx document root used by this deployment is:

```text
/usr/share/nginx/html/
```

Copy the frontend files:

```bash
sudo cp -r ~/Expense-Tracker/frontend/* /usr/share/nginx/html/
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Access the application:

```text
http://YOUR_EC2_PUBLIC_IP/
```

Replace `YOUR_EC2_PUBLIC_IP` with the actual public IPv4 address of your EC2 instance.

## 12. Application Testing

### Check Backend Service

```bash
sudo systemctl status expense-tracker
```

### Check Nginx Service

```bash
sudo systemctl status nginx
```

### Check MySQL Service

```bash
sudo systemctl status mysqld
```

### Check Listening Ports

```bash
sudo ss -lntp
```

### Test Backend API

```bash
curl -i http://localhost:8080/api/expenses
```

### Test Frontend

Open a browser and access:

```text
http://YOUR_EC2_PUBLIC_IP/
```

Verify the following operations:

1. Add a new expense.
2. Confirm that the expense appears in the table.
3. Refresh the browser and confirm the record remains available.
4. Update an existing expense.
5. Delete an expense.
6. Verify that the total expense summary updates correctly.

## 13. Troubleshooting

### Backend Application Not Starting

Check service status:

```bash
sudo systemctl status expense-tracker
```

Check application error logs:

```bash
tail -100 ~/Expense-Tracker/backend/logs/application-error.log
```

Check systemd logs:

```bash
sudo journalctl -u expense-tracker -n 100 --no-pager
```

### MySQL Connection Issues

Check MySQL service:

```bash
sudo systemctl status mysqld
```

Verify that the database exists:

```sql
SHOW DATABASES;
```

Verify application user privileges:

```sql
SHOW GRANTS FOR 'database_admin_369'@'localhost';
```

Check the database name and connection details in the environment file.

### Nginx Not Serving Frontend

Check Nginx status:

```bash
sudo systemctl status nginx
```

Check Nginx configuration:

```bash
sudo nginx -t
```

Check the configured document root:

```bash
sudo nginx -T 2>/dev/null | grep -E 'root |alias '
```

Verify frontend files:

```bash
ls -l /usr/share/nginx/html/
```

### Port 8080 Not Listening

```bash
sudo ss -lntp | grep 8080
```

Check the Spring Boot service and its logs if the port is not listening.

## 14. Important Deployment Commands

| Operation | Command |
|---|---|
| Start backend | `sudo systemctl start expense-tracker` |
| Stop backend | `sudo systemctl stop expense-tracker` |
| Restart backend | `sudo systemctl restart expense-tracker` |
| Backend status | `sudo systemctl status expense-tracker` |
| Start Nginx | `sudo systemctl start nginx` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Nginx status | `sudo systemctl status nginx` |
| Start MySQL | `sudo systemctl start mysqld` |
| MySQL status | `sudo systemctl status mysqld` |
| View backend logs | `tail -f ~/Expense-Tracker/backend/logs/application.log` |
| View backend errors | `tail -f ~/Expense-Tracker/backend/logs/application-error.log` |

## 15. Learning Outcomes

This project provides practical experience in:

- Building a full-stack Java web application.
- Understanding frontend and backend communication.
- Developing REST APIs using Spring Boot.
- Implementing CRUD operations.
- Connecting Java applications to MySQL.
- Managing database users and privileges.
- Building Java applications using Maven.
- Deploying static frontend files using Nginx.
- Configuring and managing Linux systemd services.
- Running applications in the background.
- Configuring application logs.
- Deploying applications on AWS EC2.
- Troubleshooting Linux services and application connectivity.

## 16. Future Enhancements

The application can be extended with:

- User registration and authentication.
- Login and logout functionality.
- Monthly and yearly expense reports.
- Expense category filtering.
- Search and sorting.
- Data visualization using charts.
- Export expenses to CSV or PDF.
- Docker containerization.
- CI/CD automation using Jenkins or GitHub Actions.
- HTTPS configuration using SSL certificates.
- Nginx reverse proxy configuration.

---

## Conclusion

The Expense Tracker is a practical full-stack application that demonstrates how frontend technologies, Java Spring Boot, and MySQL work together to build a real-world CRUD application.

Deploying the application on AWS EC2 provides hands-on experience with Linux administration, cloud infrastructure, web server configuration, database management, application deployment, and service monitoring.

**Project Type:** Full-Stack Java Web Application

**Deployment Platform:** AWS EC2

**Operating System:** Amazon Linux 2023