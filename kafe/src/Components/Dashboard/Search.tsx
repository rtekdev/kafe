import { Form } from 'react-bootstrap';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Search: React.FC = () => {
	return (
		<Form className="dashboard__search">
			<button type="button">
				<HiMagnifyingGlass />
			</button>
			<input placeholder="Search something..." />
		</Form>
	);
};

export default Search;
