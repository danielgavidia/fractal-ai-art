import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/expressUtils";
import { User } from "../types/types";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [userData, setUserData] = useState<User[]>([]);
	const navigate = useNavigate();

	// Fetch user data
	useEffect(() => {
		const fetch = async () => {
			const res = await getUsers();
			setUserData(res);
		};
		fetch();
	}, []);

	// Submit search query
	function searchEmails(userData: User[], query: string): User[] {
		const lowerQuery = query.toLowerCase();
		return userData.filter((x) => x.email.toLowerCase().includes(lowerQuery));
	}

	function handleSubmit(e: React.FormEvent): void {
		e.preventDefault();
		if (!userData) {
			return;
		}
		const newData = searchEmails(userData, searchQuery);
		setUserData(newData);
		setSearchQuery("");
	}

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
				{userData && (
					<>
						{userData.map((user, key) => {
							return (
								<div key={key} className="flex justify-between">
									<button onClick={() => navigate(`/profile/${user.id}`)}>{user.email}</button>
									<p>{user.likesCount}</p>
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default Search;
