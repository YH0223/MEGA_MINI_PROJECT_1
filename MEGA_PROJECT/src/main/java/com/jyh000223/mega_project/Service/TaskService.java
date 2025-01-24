package com.jyh000223.mega_project.Service;
import com.jyh000223.mega_project.DTO.TaskDTO;
import com.jyh000223.mega_project.Entities.Task;
import com.jyh000223.mega_project.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // 모든 Task 조회
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 특정 Task 조회
    public Optional<TaskDTO> getTaskById(Integer id) {
        return taskRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Task 등록
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = convertToEntity(taskDTO);
        return convertToDTO(taskRepository.save(task));
    }

    // Task 수정
    public TaskDTO updateTask(Integer id, TaskDTO updatedTaskDTO) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setName(updatedTaskDTO.getName());
            existingTask.setStartDate(updatedTaskDTO.getStartDate());
            existingTask.setDeadline(updatedTaskDTO.getDeadline());
            existingTask.setStatus(Task.Status.valueOf(updatedTaskDTO.getStatus().toUpperCase()));
            return convertToDTO(taskRepository.save(existingTask));
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // Task 삭제
    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    // Entity를 DTO로 변환
    private TaskDTO convertToDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getName(),
                task.getStartDate(),
                task.getDeadline(),
                task.getStatus().name()
        );
    }

    // DTO를 Entity로 변환
    private Task convertToEntity(TaskDTO taskDTO) {
        return new Task(
                taskDTO.getId(),
                taskDTO.getName(),
                taskDTO.getStartDate(),
                taskDTO.getDeadline(),
                Task.Status.valueOf(taskDTO.getStatus().toUpperCase())
        );
    }

}
