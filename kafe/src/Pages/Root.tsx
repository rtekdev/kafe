import { useEffect } from 'react';
import {
	Outlet,
	useLoaderData,
	useLocation,
	useNavigate,
	useSubmit,
} from 'react-router-dom';
import { getTokenDuration } from '../util/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-redux';

const RootLayout = () => {
	const token = useLoaderData();
	const submit = useSubmit();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!token) return;

		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'POST' });
			dispatch(userActions.clearUser());
			return;
		}

		const tokenDuration = getTokenDuration();

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'POST' });
			dispatch(userActions.clearUser());
		}, tokenDuration);
	}, [token, submit]);

	useEffect(() => {
		if (location.pathname === '/') navigate('/shop');
	}, [location.pathname]);

	return <Outlet />;
};

export default RootLayout;
