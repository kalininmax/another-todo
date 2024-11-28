import { FC } from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui";
import { NewTaskForm, Task } from "./new-task-form";

interface IProps {
	className?: string;
	tasks: Task[];
	onAddTaskClick: (task: Task) => void;
	onDeleteTaskClick: (taskId: Task["id"]) => void;
}

export const TasksList: FC<IProps> = ({
	className,
	tasks,
	onAddTaskClick,
	onDeleteTaskClick,
}) => {
	return (
		<section className={cn("w-full max-w-xl", className)}>
			<h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
			<NewTaskForm onAddTaskClick={onAddTaskClick} />
			{tasks.length === 0 && (
				<p className="text-stone-800 my-4">
					This project does not have any tasks yet.
				</p>
			)}
			{tasks.length > 0 && (
				<ul className="flex flex-col gap-4 p-4 mt-8 rounded-md bg-stone-100">
					{tasks.map((task) => (
						<li key={task.id} className="flex justify-between">
							<span>{task.text}</span>
							<Button onClick={() => onDeleteTaskClick(task.id)}>Clear</Button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};
