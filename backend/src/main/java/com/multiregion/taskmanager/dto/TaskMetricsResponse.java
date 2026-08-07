package com.multiregion.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskMetricsResponse {
    private long totalTasks;
    private long completed;
    private long todo;
    private long inProgress;
    private long highPriority;
    private long lowPriority;
}
