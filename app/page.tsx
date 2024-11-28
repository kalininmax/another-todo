"use client";

import { Sidebar } from "@/components/sidebar";
import { NewProjectForm } from "@/components/new-project-form";
import { NoProjectSelected } from "@/components/no-project-selected";
import { SelectedProject } from "@/components/selected-project";
import { Action, ProjectsContext } from "@/store/projects";
import { useContext } from "react";

export default function Home() {
	const { currentAction, currentProjectId } = useContext(ProjectsContext);

	return (
		<div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full">
			<Sidebar />
			<main className="flex flex-col items-center gap-8 px-8 py-16">
				{currentAction === Action.NULL && <NoProjectSelected />}
				{currentAction === Action.NEW_PROJECT && <NewProjectForm />}
				{currentAction === Action.SELECT_PROJECT && currentProjectId && (
					<SelectedProject />
				)}
			</main>
		</div>
	);
}
