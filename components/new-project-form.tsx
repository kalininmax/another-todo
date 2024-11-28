import { FC, FormEvent, useContext, useRef } from "react";
import { nanoid } from "nanoid";

import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { IModal, Modal } from "@/components/modal";
import { ProjectsContext } from "@/store/projects";
import { Task } from "@/components/new-task-form";

export interface IProject {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	tasks: Task[];
}

interface IProps {
	className?: string;
}

export const NewProjectForm: FC<IProps> = ({ className }) => {
	const { saveNewProjectHandler, cancelProjectHandler } =
		useContext(ProjectsContext);

	const title = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLInputElement>(null);
	const dueDate = useRef<HTMLInputElement>(null);

	const modal = useRef<IModal | null>(null);

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		if (
			title.current?.value.trim() === "" ||
			description.current?.value.trim() === "" ||
			dueDate.current?.value.trim() === ""
		) {
			modal.current?.open();
			return;
		}

		saveNewProjectHandler({
			id: nanoid(8),
			title: title.current!.value,
			description: description.current!.value,
			dueDate: dueDate.current!.value,
			tasks: [],
		});
	};

	return (
		<>
			<Modal ref={modal} buttonCaption="Okay">
				<h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
				<p className="text-stone-600 mb-4">
					Oops ... looks like you forgot to enter a value.
				</p>
				<p className="text-stone-600 mb-4">
					Please make sure you provide a valid value for every input field.
				</p>
			</Modal>

			<form
				className={cn("w-full max-w-xl", className)}
				onSubmit={formSubmitHandler}
			>
				<ul className="flex items-center justify-end gap-4 my-4">
					<li>
						<Button
							type="button"
							variant="secondary"
							onClick={cancelProjectHandler}
						>
							Cancel
						</Button>
					</li>
					<li>
						<Button type="submit">Save</Button>
					</li>
				</ul>
				<div className="flex flex-col gap-4">
					<Input ref={title} type="text" placeholder="Title" />
					<Input ref={description} type="text" placeholder="Description" />
					<Input
						className="w-fit"
						ref={dueDate}
						type="date"
						placeholder="Due Date"
					/>
				</div>
			</form>
		</>
	);
};
