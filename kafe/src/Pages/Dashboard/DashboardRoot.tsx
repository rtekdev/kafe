import { Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom';
import DashboardNavigation from '../../Components/Navigation/DashboardNavigation';
import { Col, Container, Row } from 'react-bootstrap';
import DashboardHeader from '../../Components/Dashboard/DashboardHeader';
import { useEffect } from 'react';

const DashboardRoot: React.FC = () => {
	const navigate = useNavigate();
	const token = useRouteLoaderData('root');

	useEffect(() => {
		if (!token) navigate('/shop');
	}, [token]);

	return (
		<Container fluid className="vh-100 dashboard">
			<Row className="h-100">
				<Col style={{ flex: '0 0 25%' }} className="p-3 sidebar">
					<DashboardNavigation />
				</Col>

				<Col xs={9} className="d-flex flex-column">
					<div
						style={{ flex: '0 0 8%' }}
						className="bgc--light_grey mt-3 p-3 border-bottom dashboard__engine"
					>
						<DashboardHeader />
					</div>

					<div
						style={{ flex: '1' }}
						className="container flex-grow-1 p-3 content-area mt-4"
					>
						<Outlet />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default DashboardRoot;
