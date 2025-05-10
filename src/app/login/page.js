"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Image from "next/image";

const logo = "logo.svg";

export default function JoySignInSideTemplate() {
	const router = useRouter();
	
	// Home redirect
  const handleClickHome = () => {
    router.push('../')
  }

	const submitForm = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		// sending a "POST" request to localhost:3000/auth/login
		// we also send the uemail and upassword
		const res = await fetch("/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: form.email.value,
				password: form.password.value,
			}),
		});

		// at the end if everything is good then we just go
		// redirect the user to localhost:3000/myjobs
		if (res.ok) {
			router.push("../");
		} else {
			const data = await res.json();
			console.error("Error on login: ", data.error);
		}
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<GlobalStyles
				styles={{
					":root": {
						"--Form-maxWidth": "800px",
						"--Transition-duration": "0.4s",
					},
				}}
			/>
			<Box
				sx={(theme) => ({
					width: { xs: "100%", md: "50vw" },
					transition: "width var(--Transition-duration)",
					transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
					position: "relative",
					zIndex: 1,
					display: "flex",
					justifyContent: "flex-end",
					backdropFilter: "blur(12px)",
					backgroundColor: "rgba(255 255 255 / 0.2)",
					[theme.getColorSchemeSelector("dark")]: {
						backgroundColor: "rgba(19 19 24 / 0.4)",
					},
				})}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100dvh",
						width: "100%",
						px: 2,
					}}
				>
					<Box
						component="header"
						sx={{
							py: 3,
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Box
							sx={{
								gap: 2,
								display: "flex",
								alignItems: "center",
							}}
						>
							<Image
                onClick={handleClickHome}
								style={{ padding: 10, marginRight: 10 }}
								src={logo}
								alt="Fixer-Uppers logo"
								width={100}
								height={100}
								priority
							/>
							<Typography
								level="h4"
								sx={{
									fontWeight: "bold",
									fontFamily: "Montserrat, sans-serif",
								}}
							>
								Fixer-Uppers
							</Typography>
						</Box>
					</Box>

					<Box
						component="main"
						sx={{
							my: "auto",
							py: 2,
							pb: 5,
							display: "flex",
							flexDirection: "column",
							gap: 2,
							width: 400,
							maxWidth: "100%",
							mx: "auto",
							borderRadius: "sm",
							"& form": {
								display: "flex",
								flexDirection: "column",
								gap: 2,
							},
							[`& .MuiFormLabel-asterisk`]: {
								visibility: "hidden",
							},
						}}
					>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Image
                onClick={handleClickHome}
								style={{ padding: 10, marginRight: 10 }}
								src={logo}
								alt="Fixer-Uppers logo"
								width={100}
								height={100}
								priority
							/>
						</Box>
						<Typography
							level="h2"
							sx={{
								fontFamily: "Montserrat, sans-serif",
								textAlign: "center",
							}}
						>
							Fixer-Uppers
						</Typography>

						<Stack sx={{ gap: 2, mt: 2 }}>
							<form onSubmit={submitForm}>
								<FormControl required>
									<FormLabel>Email</FormLabel>
									<Input type="email" name="email" />
								</FormControl>
								<FormControl required>
									<FormLabel>Password</FormLabel>
									<Input type="password" name="password" />
								</FormControl>
								<Stack sx={{ gap: 4, mt: 2 }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Checkbox
											size="sm"
											label="Remember me"
											name="persistent"
										/>
										<Link
											level="title-sm"
											href="#replace-with-a-link"
										>
											Forgot your password?
										</Link>
									</Box>
									<Button type="submit" fullWidth>
										Sign in
									</Button>
								</Stack>
							</form>
						</Stack>
					</Box>

					<Box component="footer" sx={{ py: 3 }}>
						<Typography
							level="body-xs"
							sx={{ textAlign: "center" }}
						>
							© Fixer-Uppers {new Date().getFullYear()}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box
				sx={(theme) => ({
					height: "100%",
					position: "fixed",
					right: 0,
					top: 0,
					bottom: 0,
					left: { xs: 0, md: "50vw" },
					transition:
						"background-image var(--Transition-duration), left var(--Transition-duration) !important",
					transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
					backgroundColor: "background.level1",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundImage:
						"url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
					[theme.getColorSchemeSelector("light")]: {
						backgroundImage:
							"url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
					},
				})}
			/>
		</CssVarsProvider>
	);
}
