package com.student.management.service;

import com.student.management.dto.StudentRequest;
import com.student.management.model.Student;
import com.student.management.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return studentRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search);
        }
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public synchronized Student createStudent(StudentRequest request) {
        String studentId = generateStudentId();
        Student student = Student.builder()
                .studentId(studentId)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .course(request.getCourse())
                .age(request.getAge())
                .gender(request.getGender())
                .address(request.getAddress())
                .registrationDate(LocalDate.now())
                .build();
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));

        student.setFullName(request.getFullName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setCourse(request.getCourse());
        student.setAge(request.getAge());
        student.setGender(request.getGender());
        student.setAddress(request.getAddress());

        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new IllegalArgumentException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    public long getCount() {
        return studentRepository.count();
    }

    public List<Student> getRecentlyAddedStudents() {
        return studentRepository.findAll(PageRequest.of(0, 5, Sort.by("id").descending())).getContent();
    }

    private String generateStudentId() {
        Optional<Student> latestStudent = studentRepository.findFirstByOrderByStudentIdDesc();
        if (latestStudent.isPresent()) {
            String lastIdStr = latestStudent.get().getStudentId();
            try {
                int lastIdNum = Integer.parseInt(lastIdStr.replace("STU-", ""));
                return String.format("STU-%05d", lastIdNum + 1);
            } catch (Exception e) {
                // fallback to default
            }
        }
        return "STU-10001";
    }
}
