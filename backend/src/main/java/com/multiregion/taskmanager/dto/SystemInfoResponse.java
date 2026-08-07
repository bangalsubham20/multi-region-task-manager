package com.multiregion.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemInfoResponse {
    private String applicationName;
    private String version;
    private String activeRegion;
    private String environment;
    private String javaVersion;
    private LocalDateTime serverTime;
    private long uptime;
    private String health;
}
