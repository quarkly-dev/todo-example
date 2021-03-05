import React, { useState } from "react";
import { useOverrides } from "@quarkly/components";
import { Input, Button, Box } from "@quarkly/widgets";
const defaultProps = {
	"display": "flex",
	"justify-content": "center",
	"align-items": "center"
};
const overrides = {
	"input": {
		"kind": "Input",
		"props": {
			"placeholder": "Type your task...",
			"width": "100%",
			"margin": "0px 12px 0px 0px",
			"border-radius": "24px"
		}
	},
	"button": {
		"kind": "Button",
		"props": {
			"children": "Add",
			"border-radius": "36px"
		}
	}
};

const PostAddForm = ({
	onAdd,
	...props
}) => {
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	let [textTask, setTask] = useState("");

	const onValueChange = e => setTask(e.target.value);

	const onSubmit = e => (e.preventDefault(), onAdd(textTask), setTask(""));
	/* Не вызывается onAdd, оно тут и не нужно, так как используется в onSubmit*/


	return <Box as="form" {...rest} onSubmit={onSubmit}>
		<Input {...override("input")} type="text" onChange={onValueChange} value={textTask} />
		<Button {...override("button")} onClick={() => onAdd} />
		{children}
	</Box>;
};

Object.assign(PostAddForm, { ...Box,
	defaultProps,
	overrides
});
export default PostAddForm;