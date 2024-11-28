"use client";

import { IProject } from "@/components/new-project-form";
import { Task } from "@/components/new-task-form";
import { createContext, FC, useEffect, useState } from "react";

export enum Action {
	NEW_PROJECT,
	SELECT_PROJECT,
	NULL,
}

export interface IProjectsContext {
	projects: IProject[];
	currentAction: Action;
	currentProjectId: IProject["id"] | null;
	saveNewProjectHandler: (project: IProject) => void;
	deleteProjectHandler: (projectId: IProject["id"]) => void;
	addTaskHandler: (task: Task) => void;
	deleteTaskHandler: (taskId: Task["id"]) => void;
	cancelProjectHandler: () => void;
	newProjectClickHandler: () => void;
	selectProjectHandler: (projectId: IProject["id"]) => void;
}

const defaultValue: IProjectsContext = {
	projects: [],
	currentAction: Action.NULL,
	currentProjectId: null,
	saveNewProjectHandler: () => {},
	deleteProjectHandler: () => {},
	addTaskHandler: () => {},
	deleteTaskHandler: () => {},
	cancelProjectHandler: () => {},
	newProjectClickHandler: () => {},
	selectProjectHandler: () => {},
};

export const ProjectsContext = createContext(defaultValue);

export const ProjectsContextProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [projects, setProjects] = useState<IProject[]>(defaultValue.projects);
	const [currentAction, setCurrentAction] = useState<Action>(
		defaultValue.currentAction
	);
	const [currentProjectId, setCurrentProjectId] = useState<
		IProject["id"] | null
	>(defaultValue.currentProjectId);

	const addProject = (newProject: IProject) => {
		setProjects([...projects, newProject]);
	};

	const removeProject = (projectId: IProject["id"]) => {
		setProjects(projects.filter((project) => project.id !== projectId));
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

	const cancelProjectHandler = () => {
		setCurrentAction(Action.NULL);
	};

	const newProjectClickHandler = () => {
		setCurrentAction(Action.NEW_PROJECT);
	};

	const selectProjectHandler = (projectId: IProject["id"]) => {
		setCurrentProjectId(projectId);
		setCurrentAction(Action.SELECT_PROJECT);
	};

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				cancelProjectHandler();
			}
		});
	}, []);

	const ctxValue: IProjectsContext = {
		projects,
		currentAction,
		currentProjectId,
		saveNewProjectHandler,
		deleteProjectHandler,
		addTaskHandler,
		deleteTaskHandler,
		cancelProjectHandler,
		newProjectClickHandler,
		selectProjectHandler,
	};

	return (
		<ProjectsContext.Provider value={ctxValue}>
			{children}
		</ProjectsContext.Provider>
	);
};
