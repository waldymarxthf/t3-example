import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { type FormEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

function updateTextAreaSize(textarea?: HTMLTextAreaElement) {
	if (textarea == null) return;
	textarea.style.height = "0";
	textarea.style.height = `${textarea.scrollHeight}px`;
}

export function NewTweetForm() {
	const session = useSession();
	if (session.status !== "authenticated") return null;

	return <Form />;
}

function Form() {
	const session = useSession();
	const [inputValue, setInputValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>();
	const inputRef = useCallback((textarea: HTMLTextAreaElement) => {
		updateTextAreaSize(textarea);
		textareaRef.current = textarea;
	}, []);

	useLayoutEffect(() => {
		updateTextAreaSize(textareaRef.current);
	}, [inputValue]);

	const createTweek = api.tweet.create.useMutation({
		onSuccess: (newTweet) => {
			console.log(newTweet);
			setInputValue("");
		},
	});

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		createTweek.mutate({ content: inputValue });
	}

	if (session.status !== "authenticated") return null;

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
			<div className="flex gap-4 ">
				<ProfileImage src={session.data.user.image} />
				<textarea
					ref={inputRef}
					style={{ height: 0 }}
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
					placeholder="What's happening?"
				/>
			</div>
			<Button className="self-end">Tweet</Button>
		</form>
	);
}
