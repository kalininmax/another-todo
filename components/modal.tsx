import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "./ui";

interface IProps {
	className?: string;
	children: ReactNode;
	buttonCaption: string;
}

export interface IModal {
	open: () => void;
}

export const Modal = forwardRef(
	({ className, children, buttonCaption }: IProps, ref) => {
		const dialog = useRef<HTMLDialogElement>(null);

		useImperativeHandle(ref, () => ({
			open() {
				dialog?.current?.showModal();
			},
		}));

		return createPortal(
			<dialog
				ref={dialog}
				className={cn(
					"backdrop:bg-stone-900/90 p-4 rounded-md shadow-md",
					className
				)}
			>
				{children}
				<form method="dialog" className="mt-4 text-right">
					<Button>{buttonCaption}</Button>
				</form>
			</dialog>,
			document.getElementById("modal")!
		);
	}
);

Modal.displayName = "Modal";
