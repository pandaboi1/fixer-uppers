"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Input,
	Textarea,
	Typography,
	Card,
	Stack,
	FormControl,
	FormLabel,
	Alert,
	Select,
	Option,
} from "@mui/joy";
import Box from "@mui/joy/Box";
import NavBar from "../comp/nav";
import Footer from "../comp/footer";

export default function EditJob() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		cjobname: "",
		location: "",
		job_description: "",
		offered_price: "",
		status: "open",
	});
	const [user, setUser] = useState({ username: "", rating: 0 });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Fetch user and job data on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch user data
				const userResponse = await fetch("/api/auth/me", {
					credentials: "include",
				});

				if (!userResponse.ok) throw new Error("Not authenticated");
				const userData = await userResponse.json();
				setUser(userData);

				// Fetch job data (replace :rid with actual job ID from URL)
				const jobResponse = await fetch(
					`/api/jobs/${window.location.pathname.split("/").pop()}`
				);
				if (!jobResponse.ok) throw new Error("Job not found");
				const jobData = await jobResponse.json();
				setFormData(jobData);
			} catch (err) {
				router.push("/login");
			}
		};
		fetchData();
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/jobs/${formData.rid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						document.cookie.split("token=")[1]
					}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update job");
			}

			router.push("/my-jobs");
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<>
			<NavBar />
			<Box sx={{ maxWidth: 800, mx: "auto", my: 4, p: 2 }}>
				<Card sx={{ p: 3 }}>
					{/* Job Header Section */}
					<Stack
						direction="row"
						justifyContent="space-between"
						sx={{ mb: 2 }}
					>
						<Typography level="h3">{formData.cjobname}</Typography>
						<Typography level="title-lg">
							${formData.offered_price}
						</Typography>
					</Stack>

					{/* User and Job Info */}
					<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
						<Typography>
							User: <strong>{user.username}</strong>
						</Typography>
						<Typography>Rating: {user.rating}</Typography>
						<Typography>
							Posted:{" "}
							{new Date(formData.timestamp).toLocaleDateString()}
						</Typography>
					</Stack>

					{error && (
						<Alert color="danger" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<form onSubmit={handleSubmit}>
						<Stack spacing={2}>
							<FormControl required>
								<FormLabel>Job Name</FormLabel>
								<Input
									name="cjobname"
									value={formData.cjobname}
									onChange={(e) =>
										setFormData({
											...formData,
											cjobname: e.target.value,
										})
									}
								/>
							</FormControl>

							<FormControl required>
								<FormLabel>Location</FormLabel>
								<Input
									name="location"
									value={formData.location}
									onChange={(e) =>
										setFormData({
											...formData,
											location: e.target.value,
										})
									}
								/>
							</FormControl>

							<FormControl required>
								<FormLabel>Job Description</FormLabel>
								<Textarea
									name="job_description"
									value={formData.job_description}
									onChange={(e) =>
										setFormData({
											...formData,
											job_description: e.target.value,
										})
									}
									minRows={4}
								/>
							</FormControl>

							<FormControl required>
								<FormLabel>Status</FormLabel>
								<Select
									value={formData.status}
									onChange={(e, value) =>
										setFormData({
											...formData,
											status: value,
										})
									}
								>
									<Option value="open">Open</Option>
									<Option value="in-progress">
										In Progress
									</Option>
									<Option value="completed">Completed</Option>
								</Select>
							</FormControl>

							<Button
								type="submit"
								loading={loading}
								disabled={loading}
								sx={{ mt: 2 }}
							>
								{loading ? "Updating..." : "Update Job"}
							</Button>
						</Stack>
					</form>
				</Card>
			</Box>
			<Footer />
		</>
	);
}
