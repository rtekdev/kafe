import { Table } from 'react-bootstrap';
import { User } from '../../../store/user-redux';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { CiRead } from 'react-icons/ci';
import { useEffect, useState } from 'react';

const roleConverter: (role: number) => string = (role) => {
	switch (role) {
		case 0: {
			return 'Admin';
		}
		case 1: {
			return 'User';
		}
		case 2: {
			return 'Premium';
		}
		case 3: {
			return 'Moderator';
		}
	}

	return 'No Role :(';
};

const sliceUserList = (users: User[], chunkSize: number): User[][] =>
	Array.from({ length: Math.ceil(users.length / chunkSize) }, (_, i) =>
		users.slice(i * chunkSize, i * chunkSize + chunkSize)
	);

const getUserList = (users: User[], index: number, chunkSize: number): User[] =>
	sliceUserList(users, chunkSize)[index - 1] ?? [];

const UsersList: React.FC<{
	users: User[];
	currentIndex: number;
	onSetIndexses: (numOfIndexses: number) => void;
}> = ({ users, currentIndex, onSetIndexses }) => {
	const [userList, setUserList] = useState(getUserList(users, currentIndex, 5));

	useEffect(() => {
		const numOfIndexses: number = sliceUserList(users, 5).length;
		onSetIndexses(numOfIndexses);
	}, []);

	useEffect(() => {
		setUserList((prev) => getUserList(users, currentIndex, 5));
	}, [currentIndex]);

	return (
		<Table responsive className="users__list">
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Role</th>
					<th>Orders</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{userList.map((user) => (
					<tr key={user._id} className="users__list-row">
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{roleConverter(user.role)}</td>
						<td>Working...</td>
						<td>
							<button className="users__list-button">
								<CiRead />
							</button>
							<button className="users__list-button">
								<MdOutlineModeEditOutline />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default UsersList;
