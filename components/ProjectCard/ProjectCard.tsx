import React from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  projectName: string;
  projectManager: string;
  className: string;
  email: string;
  status: string;
  period: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectManager,
  className,
  email,
  status,
  period,
}) => {
  return (
    <tr>
      <td>{projectName}</td>
      <td>{projectManager}</td>
      <td>{className}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td>{period}</td>
    </tr>
  );
};

export default ProjectCard;