import { ChangeEvent, FC, MouseEvent, useContext, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, Input } from "./ui";
import { nanoid } from "nanoid";
import { ProjectsContext } from "@/store/projects";

export interface Task {
	id: string;
	text: string;
}
interface IProps {
	className?: string;
}

export const NewTaskForm: FC<IProps> = ({ className }) => {
	const [newTask, setNewTask] = useState<Task | null>(null);
	const { addTaskHandler } = useContext(ProjectsContext);

	const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setNewTask({ id: nanoid(8), text: evt.target.value });
	};

	const addButtonClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();

		if (newTask?.text.trim() === "" || !newTask) {
			return;
		}

		addTaskHandler(newTask);
		setNewTask(null);
	};

	return (
		<form className={cn("flex items-center gap-2", className)}>
			<Input
				type="text"
				onChange={inputChangeHandler}
				value={newTask?.text || ""}
			/>
			<Button onClick={addButtonClickHandler} disabled={!newTask?.text}>
				Add Task
			</Button>
		</form>
	);
};
