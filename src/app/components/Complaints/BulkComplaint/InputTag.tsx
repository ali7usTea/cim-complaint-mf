import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';

interface InputTagProps {
	value?: string[];
	onChange?: (tags: string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	maxTags?: number;
}

const InputTag: React.FC<InputTagProps> = ({ value = [], onChange, placeholder = 'Add a tag', disabled = false, maxTags }) => {
	const [tags, setTags] = useState<string[]>(value);
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const removeTag = (index: number) => {
		const newTags = tags.filter((_, i) => i !== index);
		setTags(newTags);
		if (onChange) onChange(newTags);
	};


	const addTag = (val: string) => {
		const trimmed = val.trim();
		if (!trimmed || tags.includes(trimmed)) return;
		
		// Check if max limit is reached
		if (maxTags && tags.length >= maxTags) return;
		
		const newTags = [...tags, trimmed];
		setTags(newTags);
		setInput('');
		if (onChange) onChange(newTags);
	};

	const addMultipleTags = (values: string[]) => {
		const newUniqueTags = values
			.map(v => v.trim())
			.filter(v => v && !tags.includes(v));
		
		if (newUniqueTags.length === 0) return;
		
		// Check if max limit is reached and limit the tags accordingly
		let tagsToAdd = newUniqueTags;
		if (maxTags) {
			const availableSlots = maxTags - tags.length;
			if (availableSlots <= 0) return;
			tagsToAdd = newUniqueTags.slice(0, availableSlots);
		}
		
		const newTags = [...tags, ...tagsToAdd];
		setTags(newTags);
		setInput('');
		if (onChange) onChange(newTags);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && input) {
			addTag(input);
			e.preventDefault();
		} else if (e.key === 'Backspace' && !input && tags.length > 0) {
			removeTag(tags.length - 1);
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData('text');
		
		// Check if the pasted text contains commas
		if (pastedText.includes(',')) {
			const values = pastedText.split(',').map(v => v.trim()).filter(v => v);
			
			if (values.length > 1) {
				// Multiple values pasted, add them all as tags
				addMultipleTags(values);
			} else if (values.length === 1) {
				// Single value with comma, add as single tag
				addTag(values[0]);
			}
		} else {
			// Single value without comma, add as tag
			addTag(pastedText);
		}
	};

	return (
		<div className="!flex !flex-wrap !gap-2 !items-center !border !p-2 !rounded !bg-white">
			{tags.map((tag, i) => (
				<span
					key={tag}
					className="!flex !items-center !bg-blue-100 !text-blue-800 !font-semibold !rounded-full !px-3 !py-1 !mr-2 !mb-1 !shadow-sm !transition-all"
					style={{ fontSize: 14, lineHeight: 1.2 }}
				>
					{tag}
					{!disabled && (
						<button
							type="button"
							onClick={() => removeTag(i)}
							className="!ml-2 focus:!outline-none hover:!bg-blue-200 !rounded-full !p-1 !transition-colors"
							style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
							aria-label="Remove"
						>
							<span className="pi pi-times !text-blue-500 hover:!text-blue-700" style={{ fontSize: 14 }} />
						</button>
					)}
				</span>
			))}
			<InputText
				ref={inputRef}
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				className="!border-none !outline-none !shadow-none focus:!ring-0 focus:!border-blue-300 !px-3 !py-1 !text-sm"
				style={{ minWidth: 120, height: 32 }}
				placeholder={placeholder}
				disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
			/>
		</div>
	);
};

export default InputTag;
