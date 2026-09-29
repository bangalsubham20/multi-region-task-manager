<!-- ========================================================================= -->
<!-- HEADER & ANIMATED BANNER                                                 -->
<!-- ========================================================================= -->
<div align="center">

<a href="https://github.com/bangalsubham20/multi-region-task-manager">
  <img src="docs/assets/banner.svg" alt="Multi-Region Task Manager Animated Banner" width="100%">
</a>

<br/>
<br/>

[![Build Status](https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/bangalsubham20/multi-region-task-manager)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18%2B-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge&logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <b>Enterprise-Grade • Multi-Zone Distributed Orchestration • Instant Regional Failover • Low Latency Geo-Routing</b>
</p>

<p align="center">
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="#-system-architecture">🏛️ Architecture</a> •
  <a href="#-api-reference">📡 API Docs</a> •
  <a href="#-live-telemetry--regions">🌍 Regional Telemetry</a> •
  <a href="#-cicd-pipeline">🔄 CI/CD</a> •
  <a href="#-contributing">🤝 Contributing</a>
</p>

<img src="docs/assets/divider.svg" alt="Animated Divider" width="100%">

</div>

---

<!-- ========================================================================= -->
<!-- LIVE REGIONAL CLUSTERS                                                   -->
<!-- ========================================================================= -->
## 🌍 Live Regional Telemetry & Status

<div align="center">
  <img src="docs/assets/regions.svg" alt="Regional Cluster Health and Latency" width="100%">
</div>

---

<!-- ========================================================================= -->
<!-- PROJECT SHOWCASE                                                         -->
<!-- ========================================================================= -->
## 🖥️ Platform Showcase

<div align="center">
  <img src="docs/assets/preview.png" alt="Multi-Region Task Manager Visual Dashboard" width="100%" style="border-radius: 14px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
  <p align="center"><i>Interactive telemetry dashboard displaying real-time task queues, replication health, and geographic workload distribution.</i></p>
</div>

---

<!-- ========================================================================= -->
<!-- KEY HIGHLIGHTS                                                           -->
<!-- ========================================================================= -->
## ✨ Key Capabilities

<table>
  <tr>
    <td width="50%">
      <h3>🌐 Multi-Region Geo-Routing</h3>
      <p>Dynamic request dispatching routes task schedules to the optimal geographic availability zone (e.g. <code>ap-south-1</code>, <code>us-east-1</code>, <code>eu-central-1</code>) to ensure sub-50ms execution latency.</p>
    </td>
    <td width="50%">
      <h3>🔄 Active-Active Replication</h3>
      <p>Continuous asynchronous state synchronization across regional persistence tiers ensures cross-region consistency without blocking worker threads.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🛡️ Autonomous Regional Failover</h3>
      <p>Integrated Spring Boot Actuator health checks continuously assess node readiness. Traffic automatically reroutes to standby replicas when a regional outage is detected.</p>
    </td>
    <td width="50%">
      <h3>⚡ High-Performance Reactive UI</h3>
      <p>React + Vite front-end delivering sub-second updates, responsive filter engines, dark-mode glassmorphic aesthetics, and live metrics visualization.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📊 Distributed Metrics &amp; Tracing</h3>
      <p>Out-of-the-box telemetry endpoints (<code>/api/v1/system/metrics</code>, <code>/api/v1/system/info</code>) track JVM uptime, task volume by priority, and cluster health.</p>
    </td>
    <td width="50%">
      <h3>🚀 Fully Automated CI/CD</h3>
      <p>Turnkey declarative <code>Jenkinsfile</code> orchestrates Maven compilation, unit/integration test suites, multi-stage Docker builds, and zero-downtime deployment.</p>
    </td>
  </tr>
</table>

---

<!-- ========================================================================= -->
<!-- ARCHITECTURE                                                             -->
<!-- ========================================================================= -->
## 🏛️ System Architecture

```mermaid
flowchart TB
    subgraph Clients[" 🌐 Client Access Layer "]
        Browser["🖥️ React 18 + Vite SPA Dashboard<br/>(TailwindCSS • Glassmorphic Dark UI)"]
        ExternalAPI["📱 Third-Party Microservices / Webhooks"]
    end

    subgraph Edge[" ⚡ Edge and Ingress Layer "]
        DNS["🌍 Geo-DNS / Cloud Router"]
        Gateway["🛡️ Reverse Proxy / Load Balancer<br/>(Port :5173 / :80)"]
    end

    subgraph PrimaryRegion[" 🇮🇳 Primary Region: ap-south-1 (Mumbai) "]
        direction TB
        App1["☕ Spring Boot 3 Service<br/>(:8080/api/v1)"]
        Actuator1["🩺 Actuator and Health Probe"]
        DB1[("🗄️ MySQL 8.4 Primary<br/>(Port :3306)")]
        App1 --- DB1
        App1 -.-> Actuator1
    end

    subgraph ReplicaRegion[" 🇺🇸 Replica Region: us-east-1 (N. Virginia) "]
        direction TB
        App2["☕ Spring Boot 3 Standby<br/>(:8080/api/v1)"]
        Actuator2["🩺 Actuator and Health Probe"]
        DB2[("🗄️ MySQL 8.4 Replica")]
        App2 --- DB2
        App2 -.-> Actuator2
    end

    subgraph Pipeline[" 🛠️ Continuous Integration and Delivery "]
        Jenkins["🔨 Jenkins Pipeline"]
        DockerEngine["🐳 Docker Compose Engine"]
        Jenkins ==> DockerEngine
    end

    Browser --> DNS
    ExternalAPI --> DNS
    DNS --> Gateway
    Gateway -->|"Primary Route (Latency sub-20ms)"| App1
    Gateway -.->|"Failover Traffic Route"| App2
    DB1 <-->|"Cross-Region Async Sync"| DB2
    DockerEngine -.->|"Deploys and Monitors"| PrimaryRegion
    DockerEngine -.->|"Deploys and Monitors"| ReplicaRegion

    classDef client fill:#082f49,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    classDef edge fill:#1e1b4b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef primary fill:#064e3b,stroke:#34d399,stroke-width:1.5px,color:#f8fafc;
    classDef replica fill:#1e293b,stroke:#94a3b8,stroke-width:1.5px,color:#f8fafc;
    classDef cicd fill:#3b0764,stroke:#c084fc,stroke-width:1.5px,color:#f8fafc;

    class Browser,ExternalAPI client;
    class DNS,Gateway edge;
    class App1,DB1,Actuator1 primary;
    class App2,DB2,Actuator2 replica;
    class Jenkins,DockerEngine cicd;
```

---

<!-- ========================================================================= -->
<!-- TECH STACK                                                               -->
<!-- ========================================================================= -->
## 🛠️ Tech Stack & Ecosystem

| Component | Technology | Version | Description |
|:---|:---|:---|:---|
| **Backend Core** | Java + Spring Boot | `21` / `3.2.3` | High-throughput reactive REST API &amp; business engine |
| **ORM / Persistence** | Spring Data JPA (Hibernate) | `6.x` | Clean repository abstraction with dynamic querying |
| **Database** | MySQL | `8.4 LTS` | Relational storage for tasks, states, and regional metadata |
| **Frontend Framework** | React + TypeScript | `18+` / `5.x` | Modular single-page dashboard with strict typing |
| **Build Tools** | Vite + Maven Wrapper | `5.x` / `3.9.x` | Blazing-fast HMR frontend + reproducible backend builds |
| **API Documentation** | Springdoc OpenAPI (Swagger UI) | `2.5.0` | Interactive live API testbed at `/api/v1/swagger-ui.html` |
| **Containerization** | Docker &amp; Docker Compose | `v2+` | Fully reproducible multi-container orchestration |
| **CI/CD Automation** | Jenkins Pipeline | `Declarative` | Automated environment checks, tests, builds &amp; deployments |

---

<!-- ========================================================================= -->
<!-- DIRECTORY STRUCTURE                                                      -->
<!-- ========================================================================= -->
## 📁 Repository Structure

```tree
multi-region-task-manager/
├── 📂 backend/                     # Spring Boot 3 Enterprise Microservice
│   ├── 📂 src/main/java/com/multiregion/taskmanager/
│   │   ├── 📂 config/              # OpenAPI, CORS & Security configurations
│   │   ├── 📂 controller/          # REST Endpoints (TaskController, SystemController)
│   │   ├── 📂 dto/                 # Request/Response Data Transfer Objects
│   │   ├── 📂 entity/              # JPA Database Models (Task, Priority, Status)
│   │   ├── 📂 repository/          # Spring Data JPA repositories with query methods
│   │   └── 📂 service/             # Task workflow & regional routing logic
│   ├── 📂 src/main/resources/      # Multi-environment configs (dev, prod, docker)
│   ├── 📄 Dockerfile               # Multi-stage Java 21 build container
│   └── 📄 pom.xml                  # Maven dependencies & build definitions
│
├── 📂 frontend/                    # Modern React 18 + TypeScript + Vite Dashboard
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI widgets, Modal, StatsCards, Navbar
│   │   ├── 📂 hooks/               # Custom hooks (useTasks, useSystemStatus)
│   │   ├── 📂 pages/               # DashboardPage, TaskListPage, TaskDetailPage
│   │   └── 📂 services/            # Axios API clients with error handling
│   ├── 📄 Dockerfile               # Production Nginx container
│   └── 📄 vite.config.ts           # Bundler configuration
│
├── 📂 docs/                        # Technical Documentation & Assets
│   └── 📂 assets/                  # High-res graphics & animated SVG telemetry
│
├── 📄 docker-compose.yml           # Unified multi-service local cluster definition
├── 📄 Jenkinsfile                  # Complete 6-stage CI/CD automated pipeline
└── 📄 README.md                    # Project documentation
```

---

<!-- ========================================================================= -->
<!-- GETTING STARTED                                                          -->
<!-- ========================================================================= -->
## 🚀 Quick Start

### ⚙️ Prerequisites
Make sure you have the following installed on your machine:
- [Docker & Docker Compose](https://www.docker.com/) (Recommended)
- [Java Development Kit (JDK 21)](https://adoptium.net/) (For manual backend execution)
- [Node.js (v18+) & npm](https://nodejs.org/) (For manual frontend execution)
- [Git](https://git-scm.com/)

---

### 🐳 Option A: 1-Click Launch with Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bangalsubham20/multi-region-task-manager.git
   cd multi-region-task-manager
   ```

2. **Spin up the entire cluster (MySQL 8.4 + Backend + Frontend):**
   ```bash
   docker compose up --build -d
   ```

3. **Check container status:**
   ```bash
   docker compose ps
   ```

4. **Access the application:**
   - 💻 **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
   - ⚡ **Backend API Root:** [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
   - 📖 **Interactive Swagger UI:** [http://localhost:8080/api/v1/swagger-ui/index.html](http://localhost:8080/api/v1/swagger-ui/index.html)
   - 🩺 **Actuator Health Monitor:** [http://localhost:8080/api/v1/actuator/health](http://localhost:8080/api/v1/actuator/health)

---

### 💻 Option B: Manual Local Development

<details>
<summary><b>Click to expand step-by-step local instructions</b></summary>

<br/>

#### 1. Start MySQL Database
Ensure MySQL is running on `localhost:3306` with database `task_manager`:
```sql
CREATE DATABASE IF NOT EXISTS task_manager;
```

#### 2. Run the Spring Boot Backend
```bash
cd backend
# Windows:
.\mvnw.cmd spring-boot:run

# Linux / macOS:
./mvnw spring-boot:run
```
The backend initializes on port `8080` under context path `/api/v1`.

#### 3. Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start at `http://localhost:5173`.

</details>

---

<!-- ========================================================================= -->
<!-- API REFERENCE                                                            -->
<!-- ========================================================================= -->
## 📡 REST API Reference

The backend provides a comprehensive, documented REST API under the `/api/v1` context path:

### 📋 Task Management Endpoints

| Method | Endpoint | Description | Sample Query / Body |
|:---:|:---|:---|:---|
| `GET` | `/api/v1/tasks/search` | Paginated search, sorting &amp; filtering | `?page=0&size=10&status=IN_PROGRESS` |
| `GET` | `/api/v1/tasks/{id}` | Retrieve specific task by ID | `Path: id = 1` |
| `POST` | `/api/v1/tasks` | Create a new task in active region | `{"title":"Deploy Cluster","priority":"HIGH"}` |
| `PUT` | `/api/v1/tasks/{id}` | Update existing task details | `{"status":"COMPLETED"}` |
| `DELETE` | `/api/v1/tasks/{id}` | Remove task from regional catalog | `Path: id = 1` |

### 🩺 System & Observability Endpoints

| Method | Endpoint | Description | Response Type |
|:---:|:---|:---|:---|
| `GET` | `/api/v1/system/info` | Dynamic JVM, active region &amp; uptime stats | `SystemInfoResponse` |
| `GET` | `/api/v1/system/metrics` | Aggregate task counts by priority &amp; status | `TaskMetricsResponse` |
| `GET` | `/api/v1/actuator/health` | Container and database liveness probes | `UP / DOWN` |

<details>
<summary><b>🔍 Sample Request &amp; Response (JSON)</b></summary>

<br/>

**POST `/api/v1/tasks` Request Body:**
```json
{
  "title": "Synchronize Frankfurt Node",
  "description": "Trigger automated cross-region database replication health check.",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-10-05"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 142,
    "title": "Synchronize Frankfurt Node",
    "description": "Trigger automated cross-region database replication health check.",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2026-10-05",
    "createdAt": "2026-09-30T00:45:10",
    "updatedAt": "2026-09-30T00:45:10"
  }
}
```

</details>

---

<!-- ========================================================================= -->
<!-- CI/CD PIPELINE                                                           -->
<!-- ========================================================================= -->
## 🔄 Automated CI/CD Pipeline

The project includes an enterprise-grade automated pipeline defined in [`Jenkinsfile`](Jenkinsfile):

```mermaid
flowchart LR
    S1["🔍 Check<br/>Environment"] --> S2["🧪 Backend<br/>Unit Tests"]
    S2 --> S3["🐳 Build Docker<br/>Images"]
    S3 --> S4["🚀 Zero-Downtime<br/>Deploy"]
    S4 --> S5["📦 Verify<br/>Containers"]
    S5 --> S6["🩺 Actuator<br/>Health Check"]

    classDef stage fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    class S1,S2,S3,S4,S5,S6 stage;
```

1. **Check Environment**: Verifies installed tools (`java`, `git`, `node`, `docker`, `docker compose`).
2. **Run Backend Tests**: Runs `./mvnw test` to validate business logic and repository queries.
3. **Build Docker Images**: Executes multi-stage container compilation with image layer caching.
4. **Deploy Application**: Initiates `docker compose up -d` in detached background mode.
5. **Check Containers**: Inspects running services via `docker compose ps`.
6. **Health Check Probe**: Loops with automatic retries against `http://localhost:8080/api/v1/actuator/health` to confirm healthy startup.

---

<!-- ========================================================================= -->
<!-- CONFIGURATION                                                            -->
<!-- ========================================================================= -->
## ⚙️ Environment Variables

| Variable | Default Value | Description |
|:---|:---|:---|
| `SERVER_PORT` | `8080` | Spring Boot backend HTTP listener port |
| `AWS_REGION` | `ap-south-1` | Active geographic deployment zone identifier |
| `APP_ENV` | `development` | Runtime environment profile (`development`, `docker`, `production`) |
| `DB_URL` | `jdbc:mysql://localhost:3306/task_manager` | JDBC database connection string |
| `DB_USERNAME` | `root` | Database authentication username |
| `DB_PASSWORD` | `root` | Database authentication password |

---

<!-- ========================================================================= -->
<!-- CONTRIBUTING & LICENSE                                                   -->
<!-- ========================================================================= -->
## 🤝 Contributing

Contributions make the open-source community an inspiring place to learn and innovate. Any contributions you make are **greatly appreciated**!

1. **Fork the Project**
2. **Create your Feature Branch**:
   ```bash
   git checkout -b feature/dynamic-failover
   ```
3. **Commit your Changes**:
   ```bash
   git commit -m 'feat: add automated failover circuit breaker'
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/dynamic-failover
   ```
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete legal details.

<div align="center">

<img src="docs/assets/divider.svg" alt="Animated Divider" width="100%">

<br/>

**Built with ❤️ for High-Availability Distributed Systems by [bangalsubham20](https://github.com/bangalsubham20)**

<p align="center">
  <a href="#multi-region-task-manager">⬆️ Back to Top</a>
</p>

</div>
