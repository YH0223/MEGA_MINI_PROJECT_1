package com.jyh000223.mega_project.Repository;

import com.jyh000223.mega_project.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
