import "./App.css";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import React, { Component } from "react";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			filter: {
				name: "",
				status: -1,
			},
			keyword: "",
			sort: {
				by: "name",
				value: 1,
			},
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

	onToggleForm = () => {
		this.setState({
			isDisplayForm: !this.state.isDisplayForm,
		});
	};
	onCloseForm = () => {
		this.setState({
			isDisplayForm: false,
		});
	};
	onShowForm = () => {
		this.setState({
			isDisplayForm: true,
		});
	};
	onSubmit = (newItem) => {
		const { tasks } = this.state;
		if (newItem.id === "") {
			//Add new task
			const task = {
				id: uuidv4(),
				name: newItem.name,
				status: newItem.status === "true" ? true : false,
			};

			tasks.push(task);
		} else {
			//Edit task
			const index = this.findIndex(newItem.id);
			tasks[index] = newItem;
		}

		this.setState({
			tasks: tasks,
			taskEditing: null,
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	onUpdateStatus = (id) => {
		const { tasks } = this.state;
		// const index = this.findIndex(id);
		// use lodash
		const index = _.findIndex(tasks, (task) => {
			return task.id === id;
		});
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks,
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	};
	findIndex = (id) => {
		const { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		});
		return result;
	};
	onDelete = (id) => {
		const { tasks } = this.state;
		const index = this.findIndex(id);
		if (index !== -1) {
			tasks.splice(index, 1);
			this.setState({
				tasks: tasks,
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
		this.onCloseForm();
	};
	onUpdate = (id) => {
		const { tasks } = this.state;
		const index = this.findIndex(id);
		const taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing,
		});
		this.onShowForm();
	};
	onFilter = (filterName, filterStatus) => {
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: +filterStatus,
			},
		});
	};
	onSearch = (keyword) => {
		this.setState({
			keyword: keyword,
		});
	};
	onSort = (sort) => {
		this.setState({
			sort: {
				by: sort.by,
				value: sort.value,
			},
		});
	};
	render() {
		let {
			tasks,
			isDisplayForm,
			taskEditing,
			filter,
			keyword,
			sort,
		} = this.state;
		if (filter) {
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				});
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) {
					return task;
				} else {
					return task.status === (filter.status === 1 ? true : false);
				}
			});
		}
		if (keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
			});
		}
		if (sort.by === "name") {
			tasks.sort((a, b) => {
				if (a.name > b.name) return sort.value;
				else if (a.name < b.name) return -sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sort.value;
				else if (a.name < b.name) return sort.value;
				else return 0;
			});
		}
		const elmTaskForm = isDisplayForm ? (
			<TaskForm
				onCloseForm={this.onCloseForm}
				onSubmit={this.onSubmit}
				task={taskEditing}
			/>
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

							<Control onSearch={this.onSearch} onSort={this.onSort} />
							<div className="row mt-15">
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<TaskList
										tasks={tasks}
										onUpdateStatus={this.onUpdateStatus}
										onDelete={this.onDelete}
										onUpdate={this.onUpdate}
										onFilter={this.onFilter}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
