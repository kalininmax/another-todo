import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { IProject } from "@/app/page";

interface IProps {
	className?: string;
	projects: IProject[];
	onNewProjectClick: () => void;
	onProjectClick: (projectId: IProject["id"]) => void;
}

export const Sidebar: FC<IProps> = ({
	className,
	projects,
	onNewProjectClick,
	onProjectClick,
}) => {
	return (
		<aside
			className={cn(
				"p-8 bg-stone-900 text-stone-50 md:w-72 md:py-16 rounded-r-xl",
				className
			)}
		>
			<h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
				Your Projects
			</h2>
			<Button onClick={onNewProjectClick}>+ Add Project</Button>
			{projects.length > 0 && (
				<ul className="mt-8">
					{projects.map((project) => (
						<li key={project.id}>
							<button
								className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
								onClick={() => onProjectClick(project.id)}
							>
								{project.title}
							</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
};
