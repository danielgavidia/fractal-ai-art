import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyData: Dummy[] = [
	{
		userId: "123",
		email: "jane@gmail.com",
		totalLikes: 40,
	},
	{
		userId: "123",
		email: "jimmy@gmail.com",
		totalLikes: 50,
	},
	{
		userId: "123",
		email: "tom@gmail.com",
		totalLikes: 40,
	},
	{
		userId: "123",
		email: "tim@gmail.com",
		totalLikes: 50,
	},
];

type Dummy = {
	userId: string;
	email: string;
	totalLikes: number;
};

const Search = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [data, setData] = useState<Dummy[]>(dummyData);
	const navigate = useNavigate();

	// Submit search query
	function searchEmails(data: Dummy[], query: string): Dummy[] {
		const lowerQuery = query.toLowerCase();
		return data.filter((x) => x.email.toLowerCase().includes(lowerQuery));
	}

	function handleSubmit(e: React.FormEvent): void {
		e.preventDefault();
		const newData = searchEmails(data, searchQuery);
		setData(newData);
		setSearchQuery("");
	}

	// Dummy data

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search"
					className="w-full p-2 border-[0.5px] border-black rounded-lg outline-none"
				/>
			</form>
			<div className="p-1 space-y-2">
				{data.map((user, key) => {
					return (
						<div key={key} className="flex justify-between">
							<button onClick={() => navigate(`/profile/${user.userId}`)}>{user.email}</button>
							<p>{user.totalLikes}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Search;
