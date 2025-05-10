"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

import Box from "@mui/joy/Box";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from "@mui/joy/FormLabel";

import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
const Fixer_Upper_Logo = "logo.svg";

export default function SignUp() {

  // Redirect router
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      username,
      email,
      password,
      isContractor,
      firstName,
      lastName,
      city,
      jobType: isContractor ? jobType : null,
      companyName: isContractor ? companyName : null,
      cityLocation: isContractor ? cityLocation : null,
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      console.error("Non-JSON response:", err);
      alert("Unexpected error. Please try again.");
      return;
    }

    if (res.ok) {
      alert("User created!");
      router.push("../");
    } else {
      alert("Error: " + (data.error || "Something went wrong"));
    }
  };

  // Home redirect
  const handleClickHome = () => {
    router.push('../')
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const [isContractor, setIsContractor] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [cityLocation, setCityLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked(!checked);
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
          height: "100%",
          position: "fixed",
          right: { xs: 0, md: "50vw" },
          top: 0,
          bottom: 0,
          left: 0,
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          },
        })}
      />

      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
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
            <Box sx={{
              display: "flex", justifyContent: "center",
              borderRadius: "25px"
            }}>
              <Image
                onClick={handleClickHome}
                style={{ padding: 10, marginRight: 10 }}
                src={Fixer_Upper_Logo}
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
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <FormControl required>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>City</FormLabel>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>

                <FormControlLabel
                  sx={{px:"5px"}}
                  control={
                    <Checkbox
                      sx={{px:"5px"}}
                      checked={isContractor}
                      onChange={(e) => setIsContractor(e.target.checked)}
                    />
                  }
                  label="Are you a contractor?"
                />

                {isContractor && (
                  <>
                    <FormControl required>
                      <FormLabel>Company Name</FormLabel>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl required>
                      <FormLabel>City Located</FormLabel>
                      <Input
                        value={cityLocation}
                        onChange={(e) => setCityLocation(e.target.value)}
                      />
                    </FormControl>

                    <FormControl required>
                      <FormLabel>Job Type</FormLabel>
                      <Input
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      />
                    </FormControl>
                  </>
                )}


                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    borderRadius: "25px",
                    backgroundColor: "#87CB28",
                    width: "100%",
                    height: "40px",
                  }}
                >
                  Sign Up
                </Button>
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

    </CssVarsProvider>
  );
}
