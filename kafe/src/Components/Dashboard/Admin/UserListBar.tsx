import { ChangeEvent, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const getPaginationRange = (
	current: number,
	total: number,
	limit: number = 5
): number[] => {
	const half = Math.floor(limit / 2);

	let start = Math.max(1, current - half);
	let end = Math.min(total, current + half);

	if (end - start + 1 < limit) {
		if (start === 1) {
			end = Math.min(total, start + limit - 1);
		} else if (end === total) {
			start = Math.max(1, total - limit + 1);
		}
	}

	const range = [];
	for (let i = start; i <= end; i++) {
		range.push(i);
	}
	return range;
};

const UserListBar: React.FC<{
	numOfIndexses: number;
	onChangeListIndex: (index: number) => void;
	numOfUsers: number;
}> = ({ numOfIndexses, onChangeListIndex, numOfUsers }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(1);

	useEffect(() => {
		onChangeListIndex(currentIndex);
	}, [currentIndex]);

	const handleOnChangeListIndex = (index: number) => {
		setCurrentIndex((prev) => +index);
	};

	const handleOnDecreaseIndex = () => {
		if (currentIndex > 1) {
			setCurrentIndex((prev) => (prev -= 1));
		}
	};

	const handleOnIncreaseIndex = () => {
		if (currentIndex < numOfIndexses) {
			setCurrentIndex((prev) => (prev += 1));
		}
	};

	return (
		<Stack direction="horizontal" className="users__bar">
			<Stack direction="horizontal" gap={3}>
				<button disabled={currentIndex === 1} onClick={handleOnDecreaseIndex}>
					<IoMdArrowDropleft />
				</button>
				{getPaginationRange(currentIndex, numOfIndexses).map((index) => (
					<button
						key={index}
						onClick={() => handleOnChangeListIndex(index)}
						className={currentIndex === index ? 'active' : ''}
					>
						{index}
					</button>
				))}
				<button
					disabled={currentIndex === numOfIndexses}
					onClick={handleOnIncreaseIndex}
				>
					<IoMdArrowDropright />
				</button>
			</Stack>
			<p>
				Loaded {(currentIndex - 1) * 5 + 1} to{' '}
				{Math.min(currentIndex * 5, numOfUsers)} of {numOfUsers}
			</p>
		</Stack>
	);
};

export default UserListBar;
