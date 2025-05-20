const DashboardNavigationTile: React.FC<{ heading: string; text: string }> = ({
	heading,
	text,
}) => {
	return (
		<div className="dashboard__nav_tile">
			<div className="overlay">
				<p>{text}</p>
				<h3>{heading}</h3>
			</div>
		</div>
	);
};

export default DashboardNavigationTile;
