package com.multiregion.taskmanager.exception;

import com.multiregion.taskmanager.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public org.springframework.http.ResponseEntity<ApiResponse<String>> handleResourceNotFound(ResourceNotFoundException ex) {

        return org.springframework.http.ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, ex.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public org.springframework.http.ResponseEntity<ApiResponse<String>> handleValidation(MethodArgumentNotValidException ex) {

        String error = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        return org.springframework.http.ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, error, null));
    }

    @ExceptionHandler(Exception.class)
    public org.springframework.http.ResponseEntity<ApiResponse<String>> handleException(Exception ex) {

        return org.springframework.http.ResponseEntity.internalServerError()
                .body(new ApiResponse<>(false, ex.getMessage(), null));
    }
}