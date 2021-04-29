import React from "react";
import { useOverrides } from "@quarkly/components";
import { Button, Box } from "@quarkly/widgets";
const defaultProps = {};
const overrides = {
	"button": {
		"kind": "Button",
		"props": {
			"children": "Button",
			"border-radius": "24px",
			"padding": "8px 18px 8px 18px",
			"margin-left": "12px"
		}
	}
};

const PostStatusFilter = ({
	onFilterSelect,
	filter,
	...props
}) => {
	const buttons = [{
		name: 'all',
		label: "All"
	}, {
		name: 'like',
		label: "Liked"
	}]; // Статичные данные необходимо выносить за тело функции компонента

	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	const buttongroup = buttons.map(({
		name,
		label
	}) => {
		const active = filter === name;
		return <Button key={name} background-color={`--${active ? "primary" : "lightD2"}`} {...override("button")} onClick={() => onFilterSelect(name)}>
			{label}
		</Button>;
	});
	return <Box {...rest}>
		{buttongroup}
		{children}
	</Box>;
};

Object.assign(PostStatusFilter, { ...Box,
	defaultProps,
	overrides
});
export default PostStatusFilter;