// Index page *****
"use client";
import Button from "@mui/material/Button";
import NavBar from "../comp/nav";
import Footer from "../comp/footer";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { typographyClasses } from "@mui/joy/Typography";
import EditIcon from "@mui/icons-material/Edit";

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
const notes = [];

export default function MyJobs() {
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

	const [availableJobs, setAvailableJobs] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getUserJobs = async () => {
			fetch("/api/me/").then(async (res) => {
				const user = await res.json();

				fetch(`/api/jobs/${user.id}`)
					.then(async (res) => {
						return await res.json();
					})
					.then(({ jobs }) => {
						setAvailableJobs(jobs);
						setLoading(false);
					});
			});
		};

		getUserJobs();
	}, []);

	const [open, setOpen] = useState(true);
	const [selectedJobTypes, setSelectedJobTypes] = useState([]);

	const [openDistance, setOpenDistance] = useState(true);
	const [selectedDistance, setSelectedDistance] = useState([]);

	const [openStar, setOpenStar] = useState(true);
	const [selectedStar, setSelectedStar] = useState([]);

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
						onClick={handleClickCreateJob}
					>
						<u>Create Job</u>
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
								{availableJobs.map((job) => (
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
												{/* <Avatar
													sx={{
														width: 48,
														height: 48,
													}}
												>
													{job.username
														.charAt(0)
														.toUpperCase()}
												</Avatar> */}
												<Box>
													{/* <Typography
														variant="subtitle1"
														fontWeight={600}
													>
														{job.username}
													</Typography> */}
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
