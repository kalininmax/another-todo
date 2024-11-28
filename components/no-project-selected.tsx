import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import NoProjectsImage from "@/app/images/no-projects.png";
import { Button } from "@/components/ui";

interface IProps {
	className?: string;
	onNewProjectClick?: () => void;
}

export const NoProjectSelected: FC<IProps> = ({
	className,
	onNewProjectClick,
}) => {
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
				<Button onClick={onNewProjectClick}>Create new project</Button>
			</p>
		</div>
	);
};
