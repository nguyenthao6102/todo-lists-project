import React, { Component } from "react";
import TaskItem from "./TaskItem";

export default class TaskList extends Component {
	onUpdateStatus = () => {
		this.props.onUpdateStatus();
	};
	onDelete = () => {
		this.props.onDelete();
	};
	render() {
		const { tasks } = this.props;
		const elmTasks = tasks.map((task, index) => (
			<TaskItem
				key={task.id}
				task={task}
				index={index}
				onUpdateStatus={this.props.onUpdateStatus}
				onDelete={this.props.onDelete}
			/>
		));
		return (
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th className="text-center">STT</th>
						<th className="text-center">Tên</th>
						<th className="text-center">Trạng Thái</th>
						<th className="text-center">Hành Động</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input type="text" className="form-control" />
						</td>
						<td>
							<select className="form-control">
								<option value="-1">Tất Cả</option>
								<option value="0">Ẩn</option>
								<option value="1">Kích Hoạt</option>
							</select>
						</td>
						<td></td>
					</tr>
					{elmTasks}
				</tbody>
			</table>
		);
	}
}
