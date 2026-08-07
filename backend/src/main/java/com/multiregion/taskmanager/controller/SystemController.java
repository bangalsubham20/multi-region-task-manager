package com.multiregion.taskmanager.controller;

import com.multiregion.taskmanager.dto.ApiResponse;
import com.multiregion.taskmanager.dto.SystemInfoResponse;
import com.multiregion.taskmanager.dto.TaskMetricsResponse;
import com.multiregion.taskmanager.enums.Priority;
import com.multiregion.taskmanager.enums.TaskStatus;
import com.multiregion.taskmanager.repository.TaskRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.info.BuildProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/system")
@Tag(name = "System API", description = "System Information, Health, and Metrics Endpoints")
public class SystemController {

    @Autowired(required = false)
    private BuildProperties buildProperties;

    @Autowired
    private TaskRepository taskRepository;

    @Value("${spring.application.name:Multi Region Task Manager}")
    private String applicationName;

    @Value("${application.version:0.0.1-SNAPSHOT}")
    private String version;

    @Value("${application.region:ap-south-1}")
    private String activeRegion;

    @Value("${application.environment:development}")
    private String environment;

    @Operation(summary = "Get aggregate task metrics")
    @GetMapping("/metrics")
    public ApiResponse<TaskMetricsResponse> getTaskMetrics() {
        long total = taskRepository.count();
        long completed = taskRepository.countByStatus(TaskStatus.COMPLETED);
        long pending = taskRepository.countByStatus(TaskStatus.PENDING);
        long inProgress = taskRepository.countByStatus(TaskStatus.IN_PROGRESS);
        long high = taskRepository.countByPriorityIn(List.of(Priority.HIGH, Priority.URGENT));
        long low = taskRepository.countByPriorityIn(List.of(Priority.LOW, Priority.MEDIUM));

        TaskMetricsResponse metrics = TaskMetricsResponse.builder()
                .totalTasks(total)
                .completed(completed)
                .todo(pending)
                .inProgress(inProgress)
                .highPriority(high)
                .lowPriority(low)
                .build();

        return new ApiResponse<>(
                true,
                "Task metrics fetched successfully",
                metrics
        );
    }

    @Operation(summary = "Get detailed dynamic system information")
    @GetMapping("/info")
    public ApiResponse<SystemInfoResponse> getSystemInfo() {
        long jvmUptimeSeconds = ManagementFactory.getRuntimeMXBean().getUptime() / 1000;

        String buildVer = Optional.ofNullable(buildProperties).map(BuildProperties::getVersion).orElse(version);
        String artifact = Optional.ofNullable(buildProperties).map(BuildProperties::getArtifact).orElse("multi-region-task-manager");
        String group = Optional.ofNullable(buildProperties).map(BuildProperties::getGroup).orElse("com.multiregion");
        String buildTime = Optional.ofNullable(buildProperties).map(p -> p.getTime().toString()).orElse(null);

        SystemInfoResponse info = SystemInfoResponse.builder()
                .applicationName(applicationName)
                .version(buildVer)
                .artifact(artifact)
                .group(group)
                .buildTime(buildTime)
                .activeRegion(activeRegion)
                .environment(environment)
                .javaVersion(System.getProperty("java.version"))
                .serverTime(LocalDateTime.now())
                .uptime(jvmUptimeSeconds)
                .health("UP")
                .build();

        return new ApiResponse<>(
                true,
                "System information fetched successfully",
                info
        );
    }

    @Operation(summary = "Legacy system status endpoint")
    @GetMapping("/status")
    public ApiResponse<SystemInfoResponse> getSystemStatus() {
        return getSystemInfo();
    }
}
