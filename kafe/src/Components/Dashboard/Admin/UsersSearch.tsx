import { Stack, Form } from 'react-bootstrap';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import './Users.scss';
import { ChangeEvent } from 'react';

const UsersSearch: React.FC<{ onTextChanged: (text: string) => void }> = ({
	onTextChanged,
}) => {
	const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		onTextChanged(e.target.value);
	};

	return (
		<Stack direction="horizontal" className="users">
			<h1>User List</h1>
			<Stack direction="horizontal" gap={4}>
				<Form className="dashboard__search users-search">
					<button type="button">
						<HiMagnifyingGlass />
					</button>
					<input
						placeholder="Search by username..."
						onChange={handleOnChangeText}
					/>
				</Form>
				<select className="dashboard__search users-search" defaultValue="">
					<option value="" disabled hidden>
						Role
					</option>
					<option value={0}>Admin</option>
					<option value={1}>User</option>
					<option value={2}>Premium</option>
					<option value={3}>Moderator</option>
				</select>
			</Stack>
		</Stack>
	);
};

export default UsersSearch;
