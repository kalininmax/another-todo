import { FC } from "react";

import { IProject } from "@/app/page";
import { cn } from "@/lib/utils";
import { Button } from "./ui";
import { TasksList } from "./tasks-list";
import { Task } from "./new-task-form";

interface IProps {
	className?: string;
	projectId: IProject["id"];
	projects: IProject[];
	onDeleteClick: (projectId: IProject["id"]) => void;
	onAddTaskClick: (task: Task) => void;
	onDeleteTaskClick: (taskId: Task["id"]) => void;
}

export const SelectedProject: FC<IProps> = ({
	className,
	projectId,
	projects,
	onDeleteClick,
	onAddTaskClick,
	onDeleteTaskClick,
}) => {
	const project = projects.find((project) => project.id === projectId) || null;

	if (!project) {
		return null;
	}

	const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className={cn("w-full max-w-xl", className)}>
			<header className="pb-4 mb-4 border-b-2 border-stone-300">
				<div className="flex items-center justify-between">
					<p className="text-3xl font-bold text-stone-600 mb-2">
						{project.title}
					</p>
					<Button
						variant="destructive"
						onClick={() => onDeleteClick(project.id)}
					>
						Delete
					</Button>
				</div>
				<p className="mb-4 text-stone-400">{formattedDate}</p>
				<p className="text-stone-600 whitespace-pre-wrap">
					{project.description}
				</p>
			</header>
			<TasksList
				onAddTaskClick={onAddTaskClick}
				onDeleteTaskClick={onDeleteTaskClick}
				tasks={project.tasks}
			/>
		</div>
	);
};
