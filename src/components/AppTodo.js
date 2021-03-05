import React, { useState } from "react";
import { useOverrides, Override } from "@quarkly/components";
import { Box } from "@quarkly/widgets";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import PostStatusFilter from "./PostStatusFilter";
import PostList from "./PostList";
import PostAddForm from "./PostAddForm";
const defaultProps = {
	"box-sizing": "border-box",
	"padding": "24px 36px 72px 36px",
	"background": "--color-white",
	"box-shadow": "--xxl",
	"border-width": "4px 0px 0px 0px",
	"border-radius": "4px",
	"border-style": "solid",
	"border-color": "--color-orange",
	"width": "100%"
};
const overrides = {
	"appHeader": {
		"kind": "AppHeader",
		"props": {}
	},
	"box": {
		"kind": "Box",
		"props": {
			"display": "flex",
			"justify-content": "space-between",
			"align-items": "center",
			"margin": "0px 0px 18px 0px"
		}
	},
	"searchPanel": {
		"kind": "SearchPanel",
		"props": {
			"border-radius": "24px",
			"width": "60% "
		}
	},
	"postStatusFilter": {
		"kind": "PostStatusFilter",
		"props": {},
		"overrides": {
			"button": {
				"props": {
					"children": "All"
				},
				"overrides": {}
			},
			"button1": {
				"props": {
					"background": "--color-lightD2",
					"color": "--darkL2",
					"children": "Favs"
				},
				"overrides": {}
			}
		}
	},
	"postList": {
		"kind": "PostList",
		"props": {},
		"overrides": {
			"postListItem": {
				"props": {
					"label": "asdasdas",
					"children": null
				},
				"overrides": {}
			}
		}
	},
	"postAddForm": {
		"kind": "PostAddForm",
		"props": {}
	}
};

const AppTodo = props => {
	/// DATA
	const [data, setData] = useState([{
		label: "Going to learn React",
		important: true,
		like: false,
		id: "1"
	}, {
		label: "Fix a BBug",
		important: false,
		like: false,
		id: "2"
	}, {
		label: "I need a break",
		important: true,
		like: false,
		id: "3"
	}, {
		label: "New task",
		important: false,
		like: true,
		id: "4"
	}]); /// FILTER STATE

	const [filtr, setFiltr] = useState("all");

	const onFilterSelect = filter => //useCallback
	setFiltr(filter);

	let filterPost = (items, filter) => // useCallback
	filter === "like" ? items.filter(item => item.like) : items; /// SEARCH


	const [term, setTerm] = useState("");

	let searchPost = (items, term) => // useCallback
	term.length === 0 ? items : items.filter(item => item.label.indexOf(term) > -1);

	console.log(term.length);

	const onUpdateSearch = term => setTerm(term); // useCallback


	console.log(term); // RENDER

	const visiblePosts = filterPost(searchPost(data, term), filtr);
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps); // DELETE

	let index;

	const onClickDelItem = id => {
		const index = data.findIndex(elem => elem.id === id);
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	}; // ADD
	// let maxId = 5;


	let newItem;

	const addItem = body => (newItem = {
		label: body,
		important: false,
		like: false,
		id: Date.now()
	}, setData([...data, newItem])
	/**
  * 	setData([...data, {
 			label: body,
 			important: false,
 			like: false,
 			id: Date.now()
 		}])
  */
	);
	/**
  * data[0]o.important = true;
  * setData(data)
  */
	// MARK AS IMPORTANT


	let oldItem;

	const onToggleImportant = id => (index = "", index = data.findIndex(elem => elem.id === id), oldItem = {}, oldItem = data[index], newItem = { ...oldItem,
		important: !oldItem.important
	}, setData([...data.slice(0, index), newItem, ...data.slice(index + 1)]));
	/**
  * const toggleFunc = useCallback((type = "liked", id) => {
  * 	const index = data.findIndex(elem => elem.id === id)
  * 	const newItem = {
  * 		...data[index],
  * 		like: !data[index][type]
  * 	};
  * 
  * setData([...data.slice(0, index), newItem, ...data.slice(index +1)])
  * }, [data])
  * 
  * const onToggleImportant = useCallback((id) => toggleFunc("liked", id))
  */
	// MARK AS LIKED


	const onToggleLiked = id => (index = "", // не имеет смысла 
	index = data.findIndex(elem => elem.id === id), oldItem = {}, // не имеет смылса 
	oldItem = data[index], newItem = { ...oldItem,
		like: !oldItem.like
	}, setData([...data.slice(0, index), newItem, ...data.slice(index + 1)])); // COUNTERS


	const likeAmount = data.filter(item => item.like).length;
	const allPosts = data.length;
	return <Box {...rest}>
		<AppHeader {...override("appHeader")} likeAmount={likeAmount} allPosts={allPosts} />
		<Box {...override("box")}>
			<SearchPanel {...override("searchPanel")} onUpdateSearch={onUpdateSearch} />
			<PostStatusFilter {...override("postStatusFilter")} filter={filtr} onFilterSelect={onFilterSelect} />
		</Box>
		<PostList
			{...override("postList")}
			posts={visiblePosts}
			onDelete={onClickDelItem}
			onToggleImportant={onToggleImportant}
			onToggleLiked={onToggleLiked}
		/>
		<PostAddForm onAdd={addItem} {...override("postAddForm")} />
		{children}
	</Box>;
};

Object.assign(AppTodo, { ...Box,
	defaultProps,
	overrides
});
export default AppTodo;