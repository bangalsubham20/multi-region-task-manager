package com.multiregion.taskmanager.controller;

import com.multiregion.taskmanager.dto.ApiResponse;
import com.multiregion.taskmanager.dto.SystemStatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/system")
@Tag(name = "System API", description = "Operations for system health, region info, and version metrics")
public class SystemController {

    @Value("${system.region:ap-south-1 (Mumbai)}")
    private String region;

    @Value("${system.version:v0.0.1-SNAPSHOT}")
    private String version;

    @Operation(summary = "Get system health, active region, and version info")
    @GetMapping("/status")
    public ApiResponse<SystemStatusResponse> getSystemStatus() {
        SystemStatusResponse response = SystemStatusResponse.builder()
                .region(region)
                .version(version)
                .status("UP")
                .timestamp(System.currentTimeMillis())
                .build();

        return new ApiResponse<>(
                true,
                "System status fetched successfully",
                response
        );
    }
}
