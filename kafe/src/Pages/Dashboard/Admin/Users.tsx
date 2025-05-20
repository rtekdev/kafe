import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import UsersSearch from '../../../Components/Dashboard/Admin/UsersSearch';
import { useAppSelector } from '../../../store';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UsersList from '../../../Components/Dashboard/Admin/UsersList';
import UserListBar from '../../../Components/Dashboard/Admin/UserListBar';

const UsersPage: React.FC = () => {
	const activeUser = useAppSelector((state) => state.user.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (activeUser?.role === 1 || activeUser?.role === 2)
			navigate('/dashboard/home');
	}, [activeUser]);

	// Search
	const [searchedText, setSearchedText] = useState<string>('');

	const handleOnChangeSearchedText = (newText: string) => {
		setSearchedText((prev) => newText);
	};

	// Users
	const users = useLoaderData() as Awaited<ReturnType<typeof loadUsers>>;

	// ListIndex
	const [listIndex, setListIndex] = useState<number>(1);
	const [numOfIndexses, setNumOfIndexses] = useState<number>(0);

	const handleOnChangeListIndex = (newIndex: number) => {
		setListIndex((prev) => newIndex);
	};

	const handleOnSetNumOfIndexses = (indexses: number) => {
		setNumOfIndexses((prev) => indexses);
	};

	return (
		<Stack direction="vertical" gap={5}>
			<UsersSearch onTextChanged={handleOnChangeSearchedText} />
			<UsersList
				users={users}
				currentIndex={listIndex}
				onSetIndexses={handleOnSetNumOfIndexses}
			/>
			<UserListBar
				numOfIndexses={numOfIndexses}
				onChangeListIndex={handleOnChangeListIndex}
				numOfUsers={users.length}
			/>
		</Stack>
	);
};

export default UsersPage;

export const loadUsers = async () => {
	const response = await fetch('http://localhost:5000/api/users/get_all');

	if (!response.ok)
		throw new Response('Could not fetch any users.', { status: 500 });

	const resData = await response.json();
	return resData;
};

export const loader = () => loadUsers();
