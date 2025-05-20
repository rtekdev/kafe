import {
	Button,
	Col,
	FormCheck,
	FormControl,
	FormGroup,
	FormLabel,
} from 'react-bootstrap';
import {
	Form,
	Link,
} from 'react-router-dom';
import './AuthForm.scss'

import * as formik from 'formik';
import * as yup from 'yup';

export type AuthProps = {
	isLogin: boolean;
};

const AuthForm: React.FC<AuthProps> = ({ isLogin }) => {
	const { Formik } = formik;

	const schema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().required(),
		password: yup.string().required(),
		terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
	});

	return (
		<Formik
			validationSchema={schema}
			onSubmit={console.log}
			initialValues={{
				username: '',
				email: '',
				password: '',
				terms: false,
			}}
		>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate method="POST" className='auth__form'>
					<h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

					<FormGroup
						as={Col}
						md="4"
						controlId="validationFormik101"
						className="position-relative"
					>
						<FormLabel>Username</FormLabel>
						<FormControl
							type="text"
							name="username"
							placeholder="Enter Username"
							value={values.username}
							onChange={handleChange}
							isValid={touched.username && !errors.username}
							required
						/>
					</FormGroup>

					{!isLogin && (
						<FormGroup
							as={Col}
							md="4"
							controlId="validationFormik102"
							className="position-relative"
						>
							<FormLabel>Email address</FormLabel>
							<FormControl
								type="email"
								name="email"
								placeholder="Enter email"
								value={values.email}
								onChange={handleChange}
								isValid={touched.email && !errors.email}
								required
							/>
						</FormGroup>
					)}

					<FormGroup
						as={Col}
						md="4"
						controlId="validationFormik103"
						className="position-relative"
					>
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							name="password"
							placeholder="Password"
							value={values.password}
							onChange={handleChange}
							isValid={touched.password && !errors.password}
							required
						/>
					</FormGroup>
					<FormGroup className="position-relative mb-3">
						<FormCheck
							required
							name="terms"
							label="Agree to terms and conditions"
							onChange={handleChange}
							isInvalid={!!errors.terms}
							feedback={errors.terms}
							feedbackType="invalid"
							id="validationFormik106"
							feedbackTooltip
						/>
					</FormGroup>

					<Button variant="primary" type="submit">
						Submit
					</Button>

					<Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
						{isLogin ? 'Create new user' : 'Login'}
					</Link>
				</Form>
			)}
		</Formik>
	);
};

export default AuthForm;
