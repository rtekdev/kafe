import { Col, Stack } from 'react-bootstrap';
import './DashboardHeader.scss';
import { LuMail } from 'react-icons/lu';
import { IoNotificationsOutline } from 'react-icons/io5';
import Search from './Search';
import { useAppSelector } from '../../store';

const DashboardHeader: React.FC = () => {
	const user = useAppSelector((state) => state.user.user);

	return (
		<header className="dashboard__header">
			<Search />
			<Stack gap={3} direction="horizontal">
				<Col className="dashboard__header-icon">
					<LuMail />
				</Col>
				<Col className="dashboard__header-icon">
					<IoNotificationsOutline />
				</Col>
				<Col className="dashboard__header-icon avatar">
					<img src="/images/avatar/avatar_1.png" alt="user's avatar" />
				</Col>
				<Stack direction="vertical" className="dashboard__header-info">
					<p>{user?.username}</p>
					<span>{user?.email}</span>
				</Stack>
			</Stack>
		</header>
	);
};

export default DashboardHeader;
