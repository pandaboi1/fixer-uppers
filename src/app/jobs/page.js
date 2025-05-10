// Index page *****
"use client";
import Button from "@mui/material/Button";
import NavBar from "../comp/nav";
import Footer from "../comp/footer";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { typographyClasses } from "@mui/joy/Typography";

import {
	TextField,
	InputAdornment,
	IconButton,
	Grid,
	Paper,
	Avatar,
	Rating,
	Checkbox,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";

const Fixer_Upper_Logo = "logo.svg";
import { useRouter } from "next/navigation";

const notes = [
	{
		id: 1,
		username: "johndoe",
		stars: 4.5,
		image: "/image_1.jpg",
		businessName: "Creative Studios",
		jobType: "Graphic Designer",
		description:
			"Looking for a part-time graphic designer to work on branding projects.",
		location: "New York, NY",
	},
	{
		id: 2,
		username: "janesmith",
		stars: 4.8,
		image: "/image_1.jpg",
		businessName: "CodeSprint Inc.",
		jobType: "Frontend Developer",
		description:
			"Seeking React developer with experience in MUI for short-term project.",
		location: "San Francisco, CA",
	},
	{
		id: 3,
		username: "alex99",
		stars: 4.2,
		image: "/image_1.jpg",
		businessName: "MarketMinds",
		jobType: "SEO Specialist",
		description:
			"Need help optimizing our ecommerce site for better Google rankings.",
		location: "Chicago, IL",
	},
	{
		id: 4,
		username: "emilywrites",
		stars: 5.0,
		image: "/image_1.jpg",
		businessName: "HealthWell Co.",
		jobType: "Content Writer",
		description:
			"Write health-focused blog posts and website copy on a freelance basis.",
		location: "Austin, TX",
	},
	{
		id: 5,
		username: "tech_guru",
		stars: 4.7,
		image: "/image_1.jpg",
		businessName: "ByteForge",
		jobType: "Backend Developer",
		description:
			"Work with Node.js and PostgreSQL to improve API performance.",
		location: "Remote",
	},
	{
		id: 6,
		username: "lisadesigns",
		stars: 4.9,
		image: "/image_1.jpg",
		businessName: "Visionary Interiors",
		jobType: "Interior Designer",
		description:
			"Assist in redesigning office layouts for multiple clients.",
		location: "Denver, CO",
	},
	{
		id: 7,
		username: "markm",
		stars: 3.9,
		image: "/image_1.jpg",
		businessName: "EcoLeaf",
		jobType: "Sustainability Consultant",
		description:
			"Looking for a sustainability expert for product life cycle analysis.",
		location: "Portland, OR",
	},
	{
		id: 8,
		username: "ana_dev",
		stars: 4.6,
		image: "/image_1.jpg",
		businessName: "CloudScale",
		jobType: "DevOps Engineer",
		description:
			"Maintain CI/CD pipelines and monitor cloud infrastructure.",
		location: "Seattle, WA",
	},
	{
		id: 9,
		username: "rahultech",
		stars: 4.3,
		image: "/image_1.jpg",
		businessName: "AppVerse",
		jobType: "Mobile App Developer",
		description: "Build Android and iOS apps for social media startup.",
		location: "Atlanta, GA",
	},
	{
		id: 10,
		username: "sandyart",
		stars: 4.1,
		image: "/image_1.jpg",
		businessName: "Fine Lines",
		jobType: "Illustrator",
		description:
			"Design book illustrations and digital artwork for kids’ books.",
		location: "Boston, MA",
	},
	{
		id: 11,
		username: "davidlee",
		stars: 4.5,
		image: "/image_1.jpg",
		businessName: "NextGen AI",
		jobType: "Machine Learning Engineer",
		description:
			"Develop and test ML models for personalized recommendations.",
		location: "Palo Alto, CA",
	},
	{
		id: 12,
		username: "sofiawrites",
		stars: 4.7,
		image: "/image_1.jpg",
		businessName: "ContentVibe",
		jobType: "Copywriter",
		description:
			"Create engaging copy for product pages and email campaigns.",
		location: "Miami, FL",
	},
	{
		id: 13,
		username: "carlosweb",
		stars: 4.4,
		image: "/image_1.jpg",
		businessName: "WebWorx",
		jobType: "Full Stack Developer",
		description:
			"Work on both frontend and backend for a B2B SaaS platform.",
		location: "Los Angeles, CA",
	},
	{
		id: 14,
		username: "julia_photos",
		stars: 4.9,
		image: "/image_1.jpg",
		businessName: "Capture Moments",
		jobType: "Photographer",
		description:
			"Event photographer needed for weddings and corporate functions.",
		location: "Nashville, TN",
	},
	{
		id: 15,
		username: "mattseo",
		stars: 4.2,
		image: "/image_1.jpg",
		businessName: "SearchBoost",
		jobType: "SEO Consultant",
		description:
			"Help audit and improve site structure and backlink profile.",
		location: "Philadelphia, PA",
	},
	{
		id: 16,
		username: "ava3d",
		stars: 4.6,
		image: "/image_1.jpg",
		businessName: "3DFlow",
		jobType: "3D Artist",
		description: "Create 3D models for virtual showroom experience.",
		location: "San Diego, CA",
	},
];

export default function Jobs() {
	// React useRouter
	const redirect = useRouter();
	// Jobs redirect
	const handleClickCreateJob = () => {
		redirect.push("/createjob");
	};
	// Jobs redirect
	const handleClickEditJob = () => {
		redirect.push("/editjob");
	};
	// Jobs redirect
	const handleClickMyJobs = () => {
		redirect.push("/myjobs");
	};

	const [open, setOpen] = useState(true);
	const [selectedJobTypes, setSelectedJobTypes] = useState([]);

	const [openDistance, setOpenDistance] = useState(true);
	const [selectedDistance, setSelectedDistance] = useState([]);

	const [openStar, setOpenStar] = useState(true);
	const [selectedStar, setSelectedStar] = useState([]);

	const [avilableJobs, setAvavailableJobs] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/jobs/")
			.then((res) => res.json())
			.then(({ jobRequests }) => {
				setAvavailableJobs(jobRequests);
				setLoading(false);
			});
	}, []);

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleToggleDistance = () => {
		setOpenDistance(!openDistance);
	};

	const handleToggleStar = () => {
		setOpenStar(!openStar);
	};

	const handleJobTypeChange = (event) => {
		const { checked, name } = event.target;
		setSelectedJobTypes((prev) =>
			checked ? [...prev, name] : prev.filter((item) => item !== name)
		);
	};

	const handleDistanceChange = (event) => {
		const { checked, name } = event.target;
		setSelectedDistance((prev) =>
			checked ? [...prev, name] : prev.filter((item) => item !== name)
		);
	};

	const handleStarChange = (event) => {
		const { checked, name } = event.target;
		setSelectedStar((prev) =>
			checked ? [...prev, name] : prev.filter((item) => item !== name)
		);
	};

	return (
		<>
			<NavBar />

			<br></br>
			<br></br>
			<br></br>
			<br></br>

			<Box
				display="flex"
				alignItems="center"
				flexWrap="wrap"
				p={2}
				sx={{ gap: 2 }}
			>
				<Box flex="0 0 auto" minWidth={60}>
					<Button
						sx={{
							backgroundColor: "#87CB28", // Fill color
							color: "#FFFFFF", // Text color
							fontWeight: "bold",
							fontFamily: "Montserrat",
							textTransform: "none",
						}}
						variant="plain"
						onClick={handleClickMyJobs}
					>
						<u>My Jobs</u>
					</Button>
				</Box>
				<Box flex="1 1 0" minWidth={0} textAlign="center">
					<TextField
						placeholder="Type Here"
						size="small"
						aligment="center"
						sx={{
							px: 3,
							textTransform: "none",
						}}
					/>
					<Button
						sx={{
							backgroundColor: "#87CB28", // Fill color
							color: "#FFFFFF", // Text color
							fontWeight: "bold",
							fontFamily: "Montserrat",
							textTransform: "none",
						}}
						//onClick= action
					>
						Search
					</Button>
				</Box>
			</Box>

			<Box
				display="flex"
				alignItems="flex-start"
				flexWrap="wrap"
				p={2}
				sx={{ gap: 2 }}
			>
				<Box flex="0 0 auto" minWidth={60}>
					<Box>
						<Typography
							sx={{
								border: "2px solid #000", // Black outline
								padding: 0,
								margin: 1,
								textAlign: "center",
								fontWeight: "bold",
								fontFamily: "Montserrat",
								fontSize: "1.5rem",
							}}
						>
							Filter
						</Typography>

						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{/* Title with triangle icon */}
							<Box
								onClick={handleToggle}
								sx={{
									display: "flex",
									alignItems: "center",
									cursor: "pointer",
									userSelect: "none",
								}}
							>
								<Typography
									sx={{
										fontWeight: "bold",
										fontSize: "1rem",
									}}
								>
									Jobs Type
								</Typography>
								<Box sx={{ ml: 1 }}>{open ? "▲" : "▼"}</Box>
							</Box>

							{/* Checklist (conditionally shown) */}
							{open && (
								<>
									<FormControlLabel
										control={
											<Checkbox
												name="Job Type 1"
												checked={selectedJobTypes.includes(
													"Job Type 1"
												)}
												onChange={handleJobTypeChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												Job Type 1
											</Typography>
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="Job Type 2"
												checked={selectedJobTypes.includes(
													"Job Type 2"
												)}
												onChange={handleJobTypeChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												Job Type 2
											</Typography>
										}
									/>
								</>
							)}
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{/* Title with triangle icon */}
							<Box
								onClick={handleToggleDistance}
								sx={{
									display: "flex",
									alignItems: "center",
									cursor: "pointer",
									userSelect: "none",
								}}
							>
								<Typography
									sx={{
										fontWeight: "bold",
										fontSize: "1rem",
									}}
								>
									Distance
								</Typography>
								<Box sx={{ ml: 1 }}>
									{openDistance ? "▲" : "▼"}
								</Box>
							</Box>

							{/* Checklist (conditionally shown) */}
							{openDistance && (
								<>
									<FormControlLabel
										control={
											<Checkbox
												name="5 Miles"
												checked={selectedDistance.includes(
													"5 Miles"
												)}
												onChange={handleDistanceChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												5 Miles
											</Typography>
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="10 Miles"
												checked={selectedDistance.includes(
													"10 Miles"
												)}
												onChange={handleDistanceChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												10 Miles
											</Typography>
										}
									/>
								</>
							)}
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{/* Title with triangle icon */}
							<Box
								onClick={handleToggleStar}
								sx={{
									display: "flex",
									alignItems: "center",
									cursor: "pointer",
									userSelect: "none",
								}}
							>
								<Typography
									sx={{
										fontWeight: "bold",
										fontSize: "1rem",
									}}
								>
									Stars
								</Typography>
								<Box sx={{ ml: 1 }}>{openStar ? "▲" : "▼"}</Box>
							</Box>

							{/* Checklist (conditionally shown) */}
							{openStar && (
								<>
									<FormControlLabel
										control={
											<Checkbox
												name="1 to 2 Stars"
												checked={selectedStar.includes(
													"1 to 2 Stars"
												)}
												onChange={handleStarChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												1 to 2 Stars
											</Typography>
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="2 to 3 Stars"
												checked={selectedStar.includes(
													"2 to 3 Stars"
												)}
												onChange={handleStarChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												2 to 3 Stars
											</Typography>
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="3 to 4 Stars"
												checked={selectedStar.includes(
													"3 to 4 Stars"
												)}
												onChange={handleStarChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												3 to 4 Stars
											</Typography>
										}
									/>
									<FormControlLabel
										control={
											<Checkbox
												name="4 to 5 Stars"
												checked={selectedStar.includes(
													"4 to 5 Stars"
												)}
												onChange={handleStarChange}
											/>
										}
										label={
											<Typography
												sx={{ fontSize: "0.8rem" }}
											>
												4 to 5 Stars
											</Typography>
										}
									/>
								</>
							)}
						</Box>
					</Box>
				</Box>

				<Box
					flex="1 1 0"
					minWidth={0}
					textAlign="center"
					sx={{
						maxHeight: 400,
						overflowY: "auto",
						pr: 1,
					}}
				>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						sx={{ width: "100%" }}
					>
						{!isLoading ? (
							<>
								{avilableJobs.map((job) => (
									<Grid
										key={job.rid}
										sx={{
											width: "280px",
										}}
									>
										<Paper
											elevation={3}
											sx={{
												p: 2,
												display: "flex",
												flexDirection: "column",
												gap: 1.5,
											}}
										>
											{/* Top section: Avatar with initial + Username + Rating */}
											<Box
												display="flex"
												alignItems="center"
												gap={1.5}
											>
												<Avatar
													sx={{
														width: 48,
														height: 48,
													}}
												>
													{job.username
														.charAt(0)
														.toUpperCase()}
												</Avatar>
												<Box>
													<Typography
														variant="subtitle1"
														fontWeight={600}
													>
														{job.username}
													</Typography>
													{/* <Rating
														value={job.stars}
														precision={0.1}
														readOnly
														size="small"
													/> */}
												</Box>
											</Box>

											{/* Image (shown below avatar/username) */}
											<Box
												component="img"
												src={"/image_1.jpg"}
												alt={job.jobTitle}
												sx={{
													width: "100%",
													height: 140,
													objectFit: "cover",
													borderRadius: 1,
												}}
											/>

											{/* Business Name + Job Type */}
											<Box>
												<Typography
													variant="subtitle2"
													fontWeight={600}
												>
													{job.jobTitle}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
												>
													{job.jobType}
												</Typography>
											</Box>

											{/* Description */}
											<Typography
												variant="body2"
												sx={{ mt: 1 }}
											>
												{job.jobDescription}
											</Typography>

											{/* Location */}
											<Typography
												variant="caption"
												color="text.secondary"
											>
												Location: {job.location}
											</Typography>
										</Paper>
									</Grid>
								))}
							</>
						) : (
							<Typography variant="subtitle1" fontWeight={600}>
								{" "}
								Loading...{" "}
							</Typography>
						)}
					</Grid>
				</Box>
			</Box>

			<Footer />
		</>
	);
}
