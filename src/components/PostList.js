import React from "react";
import { useOverrides } from "@quarkly/components";
import { Box } from "@quarkly/widgets";
import PostListItem from "./PostListItem";
const defaultProps = {
	"margin": "0px 0px 36px 0px"
};
const overrides = {
	"postListItem": {
		"kind": "PostListItem",
		"props": {},
		"overrides": {
			"button": {
				"props": {
					"type": "button"
				}
			}
		}
	},
	"postListItem1": {
		"kind": "PostListItem",
		"props": {}
	},
	"postListItem2": {
		"kind": "PostListItem",
		"props": {}
	},
	"postListItem/icon": {
		"props": {}
	},
	"postListItem/icon2": {
		"props": {}
	}
};

const PostList = ({
	onToggleImportant,
	onToggleLiked,
	posts,
	onDelete,
	...props
}) => {
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	const elements = posts.map(item => {
		const {
			id,
			important,
			like,
			...itemProps
		} = item;
		return <PostListItem
			key={id}
			important={important}
			id={id} // Передаем во внутрь id что бы определить функции внутри

			like={like}
			onDelete={() => onDelete(id)}
			onToggleImportant={() => onToggleImportant(id)}
			onToggleLiked={() => onToggleLiked(id)}
			{...override("postListItem")}
			{...itemProps}
		/>;
	});
	return <Box {...rest}>
		{elements}
		{children}
	</Box>;
};

Object.assign(PostList, { ...Box,
	defaultProps,
	overrides
});
export default PostList;