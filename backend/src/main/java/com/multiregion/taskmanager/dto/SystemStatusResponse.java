package com.multiregion.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemStatusResponse {
    private String region;
    private String version;
    private String status;
    private long timestamp;
}
