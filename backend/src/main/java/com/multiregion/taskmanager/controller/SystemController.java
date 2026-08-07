package com.multiregion.taskmanager.controller;

import com.multiregion.taskmanager.dto.ApiResponse;
import com.multiregion.taskmanager.dto.SystemInfoResponse;
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
import java.util.Optional;

@RestController
@RequestMapping("/system")
@Tag(name = "System API", description = "System Information and Health Endpoints")
public class SystemController {

    @Autowired(required = false)
    private BuildProperties buildProperties;

    @Value("${spring.application.name:Multi Region Task Manager}")
    private String applicationName;

    @Value("${system.version:0.0.1-SNAPSHOT}")
    private String version;

    @Value("${system.active-region:${DEPLOYMENT_REGION:ap-south-1}}")
    private String activeRegion;

    @Value("${spring.profiles.active:dev}")
    private String environment;

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
