import { FC, MouseEvent, useRef } from "react";
import { nanoid } from "nanoid";

import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { IProject } from "@/app/page";
import { IModal, Modal } from "@/components/modal";

interface IProps {
	className?: string;
	onSaveClick: (project: IProject) => void;
	onCancelClick: () => void;
}

export const NewProjectForm: FC<IProps> = ({
	className,
	onSaveClick,
	onCancelClick,
}) => {
	const title = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLInputElement>(null);
	const dueDate = useRef<HTMLInputElement>(null);

	const modal = useRef<IModal | null>(null);

	const onSaveButtonClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();

		if (
			title.current?.value.trim() === "" ||
			description.current?.value.trim() === "" ||
			dueDate.current?.value.trim() === ""
		) {
			modal.current?.open();
			return;
		}

		onSaveClick({
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

			<form className={cn("w-full max-w-xl", className)}>
				<ul className="flex items-center justify-end gap-4 my-4">
					<li>
						<Button variant="secondary" onClick={onCancelClick}>
							Cancel
						</Button>
					</li>
					<li>
						<Button onClick={onSaveButtonClickHandler}>Save</Button>
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
