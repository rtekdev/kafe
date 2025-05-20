import { Col, Stack } from 'react-bootstrap';
import './DashboardNavigation.scss';
import { Form, Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { CiCoffeeBean } from 'react-icons/ci';
import { TbHelp } from 'react-icons/tb';
import { FiLogOut } from 'react-icons/fi';
import { PiUsers } from 'react-icons/pi';
import { AiOutlineGlobal } from 'react-icons/ai';
import DashboardNavigationTile from './DashboardNavigationTile';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-redux';
import { useAppSelector } from '../../store';

const navItems = [
	{
		name: 'Menu',
		paths: [
			{ path: 'home', label: 'Dashboard', icon: <MdDashboard /> },
			{ path: 'orders', label: 'Orders', icon: <AiOutlineGlobal /> },
		],
	},
	{
		name: 'Admin',
		paths: [
			{ path: 'products', label: 'Products', icon: <CiCoffeeBean /> },
			{ path: 'users', label: 'Users', icon: <PiUsers /> },
		],
	},
	{
		name: 'General',
		paths: [
			{ path: 'settings', label: 'Settings', icon: <IoSettingsOutline /> },
			{ path: 'help', label: 'Help', icon: <TbHelp /> },
			{ path: 'logout', label: 'Logout', icon: <FiLogOut /> },
		],
	},
];

const DashboardNavigation: React.FC = () => {
	const [paths, setPaths] = useState(navItems);

	const location = useLocation();
	const [hovered, setHovered] = useState<string | null>(null);
	const [indicatorTop, setIndicatorTop] = useState(0);
	const refs = useRef<Record<string, HTMLElement | null>>({});

	const dispatch = useDispatch();
	const user = useAppSelector((state) => state.user.user);

	useEffect(() => {
		if (user && user?.role !== 0 && user?.role !== 3) {
			setPaths([navItems[0], navItems[2]]);
		}
	}, [user]);

	const activePath = hovered ?? location.pathname.split('/')[2];
	let additionalTopValue = 122 - 8;

	for (const item of paths) {
		let matched = false;

		for (const sub of item.paths) {
			if (sub.path === activePath) {
				matched = true;
				break;
			}
		}

		if (matched) break;

		additionalTopValue += 190;
	}

	useEffect(() => {
		const el = refs.current[activePath];
		if (el) setIndicatorTop(el.offsetTop);
	});

	return (
		<nav className="dashboard__nav bgc--light_grey sidebar">
			<Stack direction="vertical" gap={5}>
				<Col>
					<Link to="/shop" className="brand_logo">
						<img src="/images/logo.png" alt="Kafe's Logo" />
						<span className="brand_name">Kafé</span>
					</Link>
				</Col>

				<div
					className="nav-indicator"
					style={{ top: indicatorTop + additionalTopValue }}
				/>
				{paths.map((item) => (
					<Col className="links" key={item.name}>
						<h5>{item.name.toUpperCase()}</h5>
						<ul className="mt-4" onMouseLeave={() => setHovered(null)}>
							{item.paths.map((pathItem) => (
								<li
									key={pathItem.path}
									ref={(el: HTMLLIElement | null) => {
										refs.current[pathItem.path] = el;
									}}
									onMouseEnter={() => setHovered(pathItem.path)}
								>
									{pathItem.path !== 'logout' ? (
										<NavLink
											to={pathItem.path}
											className={({ isActive }) =>
												isActive || hovered === pathItem.path ? 'selected' : ''
											}
										>
											{pathItem.icon}
											<span>{pathItem.label}</span>
										</NavLink>
									) : (
										<Form method="post" action="/logout">
											<button
												type="submit"
												className={hovered === pathItem.path ? 'selected' : ''}
												onClick={() => dispatch(userActions.clearUser())}
											>
												{pathItem.icon}
												<span>Logout</span>
											</button>
										</Form>
									)}
								</li>
							))}
						</ul>
					</Col>
				))}
			</Stack>
			<DashboardNavigationTile heading="~Kafé" text="Smacznej kawusi!" />
		</nav>
	);
};

export default DashboardNavigation;
