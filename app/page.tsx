"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "@/components/sidebar";
import { NewProjectForm } from "@/components/new-project-form";
import { NoProjectSelected } from "@/components/no-project-selected";
import { SelectedProject } from "@/components/selected-project";
import { Task } from "@/components/new-task-form";

type Action = string | null;
export interface IProject {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	tasks: Task[];
}

export default function Home() {
	const [projects, setProjects] = useState<IProject[]>([]);
	const [currentProjectId, setCurrentProjectId] = useState<
		IProject["id"] | null
	>(null);
	const [currentAction, setCurrentAction] = useState<Action>(null);

	const addProject = (newProject: IProject) => {
		setProjects([...projects, newProject]);
	};

	const removeProject = (projectId: IProject["id"]) => {
		setProjects(projects.filter((project) => project.id !== projectId));
	};

	const cancelProjectHandler = () => {
		setCurrentAction(null);
	};

	const newProjectClickHandler = () => {
		setCurrentAction("new-project");
	};

	const selectProjectHandler = (projectId: IProject["id"]) => {
		setCurrentProjectId(projectId);
		setCurrentAction("select-project");
	};

	const saveNewProjectHandler = (project: IProject) => {
		addProject(project);
		cancelProjectHandler();
	};

	const deleteProjectHandler = (projectId: IProject["id"]) => {
		removeProject(projectId);
		cancelProjectHandler();
	};

	const addTaskHandler = (task: Task) => {
		if (!currentProjectId) {
			return;
		}

		setProjects(
			projects.map((project) => {
				if (project.id === currentProjectId) {
					return {
						...project,
						tasks: [task, ...project.tasks],
					};
				}

				return project;
			})
		);
	};

	const deleteTaskHandler = (taskId: Task["id"]) => {
		if (!currentProjectId) {
			return;
		}

		setProjects(
			projects.map((project) => {
				if (project.id === currentProjectId) {
					return {
						...project,
						tasks: project.tasks.filter((task) => task.id !== taskId),
					};
				}

				return project;
			})
		);
	};

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				cancelProjectHandler();
			}
		});
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full">
			<Sidebar
				projects={projects}
				onNewProjectClick={newProjectClickHandler}
				onProjectClick={selectProjectHandler}
			/>
			<main className="flex flex-col items-center gap-8 px-8 py-16">
				{!currentAction && (
					<NoProjectSelected onNewProjectClick={newProjectClickHandler} />
				)}
				{currentAction === "new-project" && (
					<NewProjectForm
						onSaveClick={saveNewProjectHandler}
						onCancelClick={cancelProjectHandler}
					/>
				)}
				{currentAction === "select-project" && currentProjectId && (
					<SelectedProject
						projectId={currentProjectId}
						projects={projects}
						onDeleteClick={deleteProjectHandler}
						onAddTaskClick={addTaskHandler}
						onDeleteTaskClick={deleteTaskHandler}
					/>
				)}
			</main>
		</div>
	);
}
