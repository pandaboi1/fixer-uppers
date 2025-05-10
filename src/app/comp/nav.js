'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const FixerUpperLogo = "/logo.svg";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/auth/me');
        const data = await res.json();
        console.log('Fetched user data:', data);
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleClickHome = () => router.push('/');
  const handleClickLogin = () => router.push('/login');
  const handleClickSignUp = () => router.push('/signup');

  const handleLogout = async () => {
    try {
      const res = await fetch('/auth/logout', {
        method: 'POST',
      });

      if (res.ok) {
        setUser(null);
        router.push('../');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1a1a1a" }}>
        <Toolbar sx={{ py: "10px" }}>
          <Image
            onClick={handleClickHome}
            role="button"
            aria-label="Go to homepage"
            style={{ padding: "10px", marginRight: "10px", cursor: "pointer" }}
            src={FixerUpperLogo}
            alt="Fixer-Uppers logo"
            width={100}
            height={100}
            priority
          />
          <h1 className="text-2xl font-bold text-white">Fixer-Uppers</h1>
          <Typography sx={{ flexGrow: 2 }} />

          {user ? (
            <>
              <Typography sx={{ color: "#87CB28", mr: 2 }}>
                Hello, {user.ufirstname}
              </Typography>
              <Button
                sx={{ color: "#ffffff", backgroundColor: "#ff5252", mx: 1 }}
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: "#87CB28", mx: 1 }} onClick={handleClickLogin}>
                Login
              </Button>
              <Button
                sx={{ backgroundColor: "#87CB28", mx: 1 }}
                variant="contained"
                onClick={handleClickSignUp}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
