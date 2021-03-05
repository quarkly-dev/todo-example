import React, { useState } from "react";
import { useOverrides } from "@quarkly/components";
import { Input } from "@quarkly/widgets";
const defaultProps = {
	"type": "text",
	"placeholder": "Search by tasks"
};
const overrides = {};

const SearchPanel = ({
	onUpdateSearch,
	...props
}) => {
	const [term, setTerm] = useState("");

	const onUpdateSearchState = e => (setTerm(e.target.value), onUpdateSearch(e.target.value));

	const {
		rest
	} = useOverrides(props, overrides, defaultProps);
	return <Input {...rest} onChange={onUpdateSearchState} value={term} />;
};

Object.assign(SearchPanel, { ...Input,
	defaultProps,
	overrides
});
export default SearchPanel;