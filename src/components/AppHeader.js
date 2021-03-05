import React from "react";
import { useOverrides } from "@quarkly/components";
import { Text, Box } from "@quarkly/widgets";
const defaultProps = {
	"display": "flex",
	"justify-content": "space-between",
	"align-items": "center",
	"margin": "0px 0px 24px 0px"
};
const overrides = {
	"text": {
		"kind": "Text",
		"props": {
			"font": "--headline2",
			"children": "React TODO List"
		}
	},
	"text1": {
		"kind": "Text",
		"props": {
			"font": "--lead"
		}
	}
};

const AppHeader = ({
	likeAmount,
	allPosts,
	...props
}) => {
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	return <Box {...rest}>
		<Text {...override("text")} />
		<Text {...override("text1")}>
			 
			{allPosts}
			 tasks, 
			{likeAmount}
			 liked 
		</Text>
		{children}
	</Box>;
};

Object.assign(AppHeader, { ...Box,
	defaultProps,
	overrides
});
export default AppHeader;