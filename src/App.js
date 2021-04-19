import "./App.css";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from "uuid";

import React, { Component } from "react";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			isDisplayForm: false,
		};
	}
	componentDidMount() {
		if (localStorage && localStorage.getItem("tasks")) {
			const tasks = JSON.parse(localStorage.getItem("tasks"));
			this.setState({
				tasks: tasks,
			});
		}
	}
	onGenerateData = () => {
		const tasks = [
			{
				id: uuidv4(),
				name: "Học lập trình",
				status: true,
			},
			{
				id: uuidv4(),
				name: "Đi bơi",
				status: false,
			},
			{
				id: uuidv4(),
				name: "Tập gym",
				status: true,
			},
		];
		this.setState({
			tasks: tasks,
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	onToggleForm = () => {
		this.setState({
			isDisplayForm: !this.state.isDisplayForm,
		});
	};
	render() {
		const { tasks, isDisplayForm } = this.state;
		const elmTaskForm = isDisplayForm ? (
			<TaskForm onToggleForm={this.onToggleForm} />
		) : (
			""
		);
		return (
			<div className="App">
				<div className="container">
					<div className="text-center">
						<h1>Quản Lý Công Việc</h1>
						<hr />
					</div>
					<div className="row">
						<div
							className={
								isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
							}
						>
							{elmTaskForm}
						</div>
						<div
							className={
								isDisplayForm
									? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
									: "col-xs-12 col-sm-12 col-md-12 col-lg-12"
							}
						>
							<button
								type="button"
								className="btn btn-primary"
								onClick={this.onToggleForm}
							>
								<span className="fa fa-plus mr-5"></span>Thêm Công Việc
							</button>
							<button
								type="button"
								className="btn btn-danger ml-5"
								onClick={this.onGenerateData}
							>
								Generate Data
							</button>
							<Control />
							<div className="row mt-15">
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<TaskList tasks={tasks} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
