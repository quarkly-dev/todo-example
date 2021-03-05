import React, { useState } from "react";
import { useOverrides } from "@quarkly/components";
import atomize from "@quarkly/atomize";
import { Text, Icon, Button, Box } from "@quarkly/widgets";
import { FaStar, FaTrash, FaHeart } from "react-icons/fa";
const defaultProps = {
	"as": "li",
	"display": "flex",
	"justify-content": "space-between",
	"align-items": "center"
};
const overrides = {
	"text": {
		"kind": "Text",
		"props": {
			"font": "--lead",
			"children": "Hello world"
		}
	},
	"box": {
		"kind": "Box",
		"props": {
			"display": "flex",
			"align-items": "center"
		}
	},
	"button": {
		"kind": "Button",
		"props": {
			"type": "button",
			"padding": "10px 10px 10px 10px",
			"margin": "0px 12px 0px 0px",
			"border-radius": "22px",
			"background": "--color-lightD1",
			"color": "--grey",
			"focus-box-shadow": "none"
		}
	},
	"icon": {
		"kind": "Icon",
		"props": {
			"category": "fa",
			"icon": FaStar,
			"size": "20px"
		}
	},
	"button1": {
		"kind": "Button",
		"props": {
			"type": "button",
			"padding": "10px 10px 10px 10px",
			"margin": "0px 12px 0px 0px",
			"border-radius": "22px",
			"background": "--color-lightD1",
			"color": "--grey",
			"focus-box-shadow": "none"
		}
	},
	"icon1": {
		"kind": "Icon",
		"props": {
			"category": "fa",
			"icon": FaTrash,
			"size": "20px"
		}
	},
	"icon2": {
		"kind": "Icon",
		"props": {
			"category": "fa",
			"icon": FaHeart,
			"cursor": "pointer",
			"size": "20px"
		}
	}
};

const PostListItem = ({
	id,
	onToggleImportant,
	onToggleLiked,
	label,
	important,
	like,
	onDelete,
	...props
}) => {
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	/**
  * Как формлять правильно функции:
  * const onToggleImportantClick = useCallback(() => onToggleImportant(id), [id])
  */

	return <Box {...props}>
		<Text {...override("text")}>
			{label}
		</Text>
		<Box {...override("box")}>
			<Button onClick={onToggleImportant} {...override("button")}>
				<Icon color={`--${important ? "orange" : "grey"}`} {...override("icon")} />
			</Button>
			<Button {...override("button1")} onClick={onDelete}>
				<Icon {...override("icon1")} />
			</Button>
			<Icon onClick={onToggleLiked} color={`--${like ? "red" : "lightD2"}`} {...override("icon2")} />
		</Box>
		{children}
	</Box>;
};

Object.assign(PostListItem, { ...Box,
	defaultProps,
	overrides
}); // По сути эта конструкция уже ненужна, так как ниже используется atomzie

export default atomize(PostListItem)({
	name: "Default",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// past here description for your component
		en: "Default — my awesome component"
	},
	propInfo: {
		// past here props description for your component
		label: {
			control: "input"
		}
	}
}); // Вторым аргументом можно передать defaultProps