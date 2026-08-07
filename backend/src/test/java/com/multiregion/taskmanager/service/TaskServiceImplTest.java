package com.multiregion.taskmanager.service;

import com.multiregion.taskmanager.dto.TaskRequest;
import com.multiregion.taskmanager.dto.TaskResponse;
import com.multiregion.taskmanager.entity.Task;
import com.multiregion.taskmanager.enums.Priority;
import com.multiregion.taskmanager.enums.TaskStatus;
import com.multiregion.taskmanager.exception.ResourceNotFoundException;
import com.multiregion.taskmanager.mapper.TaskMapper;
import com.multiregion.taskmanager.repository.TaskRepository;
import com.multiregion.taskmanager.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    void shouldCreateTask() {
        TaskRequest request = new TaskRequest();
        request.setTitle("Learn Jenkins");

        Task task = TaskMapper.toEntity(request);
        task.setId(1L);

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse response = taskService.createTask(request);

        assertNotNull(response);
        assertEquals("Learn Jenkins", response.getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void shouldReturnAllTasks() {
        Task task1 = Task.builder()
                .id(1L)
                .title("Task One")
                .build();

        Task task2 = Task.builder()
                .id(2L)
                .title("Task Two")
                .build();

        when(taskRepository.findAll()).thenReturn(List.of(task1, task2));

        List<TaskResponse> response = taskService.getAllTasks();

        assertEquals(2, response.size());
        verify(taskRepository).findAll();
    }

    @Test
    void shouldReturnTaskById() {
        Task task = Task.builder()
                .id(1L)
                .title("Spring Boot")
                .build();

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskResponse response = taskService.getTaskById(1L);

        assertEquals("Spring Boot", response.getTitle());
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> taskService.getTaskById(1L)
        );
    }

    @Test
    void shouldUpdateTask() {
        Task task = Task.builder()
                .id(1L)
                .title("Old")
                .build();

        TaskRequest request = new TaskRequest();
        request.setTitle("New");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponse response = taskService.updateTask(1L, request);

        assertEquals("New", response.getTitle());
    }

    @Test
    void shouldDeleteTask() {
        Task task = Task.builder()
                .id(1L)
                .build();

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        taskService.deleteTask(1L);

        verify(taskRepository).delete(task);
    }

    @Test
    void shouldGetTasksWithTitleFilter() {
        Task task = Task.builder().id(1L).title("Jenkins Task").build();
        Page<Task> page = new PageImpl<>(List.of(task));

        when(taskRepository.findByTitleContainingIgnoreCase(eq("Jenkins"), any(Pageable.class)))
                .thenReturn(page);

        Page<TaskResponse> result = taskService.getTasks("Jenkins", null, null, 0, 10, "id", "asc");

        assertEquals(1, result.getTotalElements());
        assertEquals("Jenkins Task", result.getContent().get(0).getTitle());
        verify(taskRepository).findByTitleContainingIgnoreCase(eq("Jenkins"), any(Pageable.class));
    }

    @Test
    void shouldGetTasksWithStatusFilter() {
        Task task = Task.builder().id(1L).title("Status Task").status(TaskStatus.IN_PROGRESS).build();
        Page<Task> page = new PageImpl<>(List.of(task));

        when(taskRepository.findByStatus(eq(TaskStatus.IN_PROGRESS), any(Pageable.class)))
                .thenReturn(page);

        Page<TaskResponse> result = taskService.getTasks(null, TaskStatus.IN_PROGRESS, null, 0, 10, "id", "asc");

        assertEquals(1, result.getTotalElements());
        verify(taskRepository).findByStatus(eq(TaskStatus.IN_PROGRESS), any(Pageable.class));
    }

    @Test
    void shouldGetTasksWithPriorityFilter() {
        Task task = Task.builder().id(1L).title("Priority Task").priority(Priority.HIGH).build();
        Page<Task> page = new PageImpl<>(List.of(task));

        when(taskRepository.findByPriority(eq(Priority.HIGH), any(Pageable.class)))
                .thenReturn(page);

        Page<TaskResponse> result = taskService.getTasks(null, null, Priority.HIGH, 0, 10, "id", "asc");

        assertEquals(1, result.getTotalElements());
        verify(taskRepository).findByPriority(eq(Priority.HIGH), any(Pageable.class));
    }

    @Test
    void shouldGetTasksWithoutFilters() {
        Task task = Task.builder().id(1L).title("Default Task").build();
        Page<Task> page = new PageImpl<>(List.of(task));

        when(taskRepository.findAll(any(Pageable.class))).thenReturn(page);

        Page<TaskResponse> result = taskService.getTasks(null, null, null, 0, 10, "id", "desc");

        assertEquals(1, result.getTotalElements());
        verify(taskRepository).findAll(any(Pageable.class));
    }
}