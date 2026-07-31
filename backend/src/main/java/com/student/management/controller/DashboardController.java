package com.student.management.controller;

import com.student.management.dto.DashboardStats;
import com.student.management.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final StudentService studentService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        DashboardStats stats = DashboardStats.builder()
                .totalStudents(studentService.getCount())
                .recentlyAddedStudents(studentService.getRecentlyAddedStudents())
                .build();
        return ResponseEntity.ok(stats);
    }
}
