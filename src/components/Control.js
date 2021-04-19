import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

export default class Control extends Component {
	onSearch = () => {
		this.props.onSearch();
	};
	onSort = () => {
		this.props.onSort();
	};
	render() {
		return (
			<div className="row mt-15">
				<Search onSearch={this.props.onSearch} />
				<Sort onSort={this.props.onSort} />
			</div>
		);
	}
}
