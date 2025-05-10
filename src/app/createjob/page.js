"use client";
// React core and state management hooks
import { useState, useEffect } from "react";
// Next.js navigation hook
import { useRouter } from "next/navigation";
// MUI Joy UI components
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
} from "@mui/joy";
import Box from "@mui/joy/Box";
// Custom components
import NavBar from "../comp/nav";
import Footer from "../comp/footer";

export default function CreateJob() {
	// Next.js router for page navigation
	const router = useRouter();

	// Component state management
	const [formData, setFormData] = useState({
		jobTitle: "",
		location: "",
		jobDescription: "",
		offeredPrice: "",
		jobType: "",
	});
	const [user, setUser] = useState({ username: "", rating: 0 }); // User context
	const [error, setError] = useState(""); // Error message state
	const [loading, setLoading] = useState(false); // Loading state

	// // Fetch user data on component mount
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			// Get authenticated user data from protected endpoint
	// 			const response = await fetch("/api/auth/me", {
	// 				credentials: "include", // Include cookies in request
	// 			});

	// 			// Handle unauthorized access
	// 			if (!response.ok) throw new Error("Not authenticated");

	// 			// Update user state with fetched data
	// 			const userData = await response.json();
	// 			setUser(userData);
	// 		} catch (err) {
	// 			// Redirect to login if authentication fails
	// 			router.push("/login");
	// 		}
	// 	};
	// 	fetchUser();
	// }, [router]); // Re-run if router changes

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		const form = event.currentTarget;

		const response = await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jobTitle: form.jobTitle.value,
				jobDescription: form.jobDescription.value,
				location: form.location.value,
				offeredPrice: form.offeredPrice.value,
				jobType: form.jobType.value,
			}), // Send form data as JSON
		});

		if (response.ok) {
			router.push("/myjobs");
		} else {
			const data = await response.json();
			console.error("Error on job creation: ", data.error);
		}
	};

	return (
		<>
			<NavBar />
			{/* Main content container */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					width: "100%",
					px: 2,
				}}
			>
				<Card sx={{ width: "600px" }}>
					{/* Page title */}
					<Typography level="h3" sx={{ mb: 2 }}>
						Create New Job
					</Typography>

					{/* User information display */}
					<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
						<Typography>
							User: <strong>{user.username}</strong>
						</Typography>
						<Typography>Rating: {user.rating}</Typography>
					</Stack>

					{/* Error message display */}
					{error && (
						<Alert color="danger" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					{/* Job creation form */}
					<form onSubmit={handleSubmit}>
						<Stack spacing={2}>
							{/* Job name input */}
							<FormControl required>
								<FormLabel>Job Title</FormLabel>
								<Input
									name="jobTitle"
									value={formData.jobTitle}
									onChange={(e) =>
										setFormData({
											...formData,
											jobTitle: e.target.value,
										})
									}
								/>
							</FormControl>

							{/* Location input */}
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

							{/* JobType input */}
							<FormControl required>
								<FormLabel>Job Type</FormLabel>
								<Input
									name="jobType"
									value={formData.jobType}
									onChange={(e) =>
										setFormData({
											...formData,
											jobType: e.target.value,
										})
									}
								/>
							</FormControl>

							{/* Job description textarea */}
							<FormControl required>
								<FormLabel>Job Description</FormLabel>
								<Textarea
									name="jobDescription"
									value={formData.jobDescription}
									onChange={(e) =>
										setFormData({
											...formData,
											jobDescription: e.target.value,
										})
									}
									minRows={4}
								/>
							</FormControl>

							{/* Price input with currency decorator */}
							<FormControl required>
								<FormLabel>Offered Price ($)</FormLabel>
								<Input
									name="offeredPrice"
									type="number"
									value={formData.offeredPrice}
									onChange={(e) =>
										setFormData({
											...formData,
											offeredPrice: e.target.value,
										})
									}
									startDecorator="$"
								/>
							</FormControl>

							{/* Submission button with loading state */}
							<Button
								type="submit"
								loading={loading}
								disabled={loading}
								sx={{ mt: 2 }}
							>
								{loading ? "Posting..." : "Create Job"}
							</Button>
						</Stack>
					</form>
				</Card>
			</Box>
			<Footer />
		</>
	);
}
