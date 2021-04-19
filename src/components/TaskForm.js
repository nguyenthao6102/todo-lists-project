import React, { Component } from "react";

export default class TaskForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			name: "",
			status: false,
		};
	}
	componentDidMount() {
		if (this.props.task) {
			this.setState({
				id: this.props.task.id,
				name: this.props.task.name,
				status: this.props.task.status,
			});
		}
	}

	onCloseForm = () => {
		this.props.onCloseForm();
	};
	handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		// Cancel and Close Form
		this.onClear();
		this.onCloseForm();
	};
	onClear = () => {
		this.setState({
			name: "",
			status: false,
		});
	};
	render() {
		const { id } = this.state;
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">
						{id !== "" ? "Cập Nhật Công Việc" : "Thêm Công Việc"}

						<span
							className="fa fa-times-circle text-right"
							onClick={this.onCloseForm}
						/>
					</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Tên :</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</div>
						<label>Trạng Thái :</label>
						<select
							className="form-control"
							name="status"
							value={this.state.status}
							onChange={this.handleChange}
						>
							<option value={true}>Kích Hoạt</option>
							<option value={false}>Ẩn</option>
						</select>
						<br />
						<div className="text-center">
							<button type="submit" className="btn btn-warning">
								<span className="fa fa-plus mr-5" />
								Lưu Lại
							</button>
							&nbsp;
							<button
								type="button"
								className="btn btn-danger"
								onClick={this.onClear}
							>
								<span className="fa fa-close mr-5" />
								Hủy Bỏ
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
