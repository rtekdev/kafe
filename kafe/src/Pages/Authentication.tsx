import { Container } from 'react-bootstrap';
import { useActionData, useNavigate, useSearchParams } from 'react-router-dom';
import AuthForm from '../Components/Authentication/AuthForm';
import Navigation from '../Components/Navigation/Navigation';
import Footer from '../Components/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { User, userActions } from '../store/user-redux';

export const fetchUser = async (username: string) => {
	const response = await fetch(
		'http://localhost:5000/api/users/get_by_username',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username }),
		}
	);

	if (!response.ok)
		throw new Response('Could not fetch User by sent ID.', {
			status: 500,
		});

	const resData = await response.json();
	return resData;
};

const AuthenticationPage: React.FC = () => {
	const data = useActionData();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (data?.user) {
			const loadUser = async () => {
				if (!data.user._id && data.user.username) {
					const user: User = await fetchUser(data.user.username);
					if (user) dispatch(userActions.setUser(user));
				} else {
					dispatch(userActions.setUser(data.user));
				}
			};

			loadUser();
			navigate(data.redirectTo);
		}
	}, [data, dispatch, navigate]);

	const [searchParams] = useSearchParams();
	const isLogin = searchParams.get('mode') === 'login';

	return (
		<>
			<Navigation />
			<Container>
				<main>
					{data && data.errors && (
						<ul>
							{Object.values(data.errors).map((err, index) => (
								<li key={index}>{String(err)}</li>
							))}
						</ul>
					)}
					<AuthForm isLogin={isLogin} />
				</main>
			</Container>
			<Footer />
		</>
	);
};

export default AuthenticationPage;

export const action = async ({ request }: { request: Request }) => {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') || 'login';

	if (mode !== 'login' && mode !== 'signup')
		throw new Response('Unsupported mode.', { status: 422 });

	const data = await request.formData();
	const authData = {
		username: data.get('username'),
		email: mode === 'signup' ? data.get('email') : undefined,
		password: data.get('password'),
	};

	const response = await fetch('http://localhost:5000/auth/' + mode, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(authData),
	});

	if (response.status === 422 || response.status === 401) return response;
	if (!response.ok)
		throw new Response('Could not authenticate user.', { status: 500 });

	const resData = await response.json();
	const token = resData.token;
	localStorage.setItem('user_username', resData.user.username);

	localStorage.setItem('token', token);
	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);
	localStorage.setItem('expiration', expiration.toISOString());

	return {
		user: resData.user,
		redirectTo: '/dashboard/home',
	};
};
