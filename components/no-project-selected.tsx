import { FC, useContext } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import NoProjectsImage from "@/app/images/no-projects.png";
import { Button } from "@/components/ui";
import { ProjectsContext } from "@/store/projects";

interface IProps {
	className?: string;
}

export const NoProjectSelected: FC<IProps> = ({ className }) => {
	const { newProjectClickHandler } = useContext(ProjectsContext);

	return (
		<div className={cn("mt-24 text-center", className)}>
			<Image
				src={NoProjectsImage}
				alt="An empty task list"
				width={100}
				height={100}
				className="w-16 h-16 object-contain mx-auto"
			/>
			<h2 className="text-xl font-bold text-stone-500 my-4">
				No Project Selected
			</h2>
			<p className="text-stone-400 mb-4">
				Select a project or get started with a new one
			</p>
			<p className="mt-8">
				<Button onClick={newProjectClickHandler}>Create new project</Button>
			</p>
		</div>
	);
};
