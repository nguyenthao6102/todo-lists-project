import React, { Component } from "react";

export default class TaskItem extends Component {
	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id);
	};
	onDelete = () => {
		this.props.onDelete(this.props.task.id);
	};
	render() {
		const { task, index } = this.props;
		return (
			<tr>
				<td>{index}</td>
				<td>{task.name}</td>
				<td className="text-center">
					<span
						className={
							task.status ? "label label-danger" : "label label-success"
						}
						onClick={this.onUpdateStatus}
					>
						{task.status ? "Kích hoạt" : "Ẩn"}
					</span>
				</td>
				<td className="text-center">
					<button type="button" className="btn btn-warning">
						<span className="fa fa-pencil mr-5"></span>Sửa
					</button>
					&nbsp;
					<button
						type="button"
						className="btn btn-danger"
						onClick={this.onDelete}
					>
						<span className="fa fa-trash mr-5"></span>Xóa
					</button>
				</td>
			</tr>
		);
	}
}
