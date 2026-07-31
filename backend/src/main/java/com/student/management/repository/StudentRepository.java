package com.student.management.repository;

import com.student.management.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String fullName, String email);
    Optional<Student> findFirstByOrderByStudentIdDesc();
}
