"use client"
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
  Alert
} from "@mui/joy";
import NavBar from "../comp/nav";
import Footer from "../comp/footer";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    biography: '',
    password: ''
  });
  const [user, setUser] = useState({ username: '', rating: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('Not authenticated');
        
        const userData = await response.json();
        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          biography: userData.biography || '',
          password: ''
        });
      } catch (err) {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      router.push('/profile');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, p: 2 }}>
        <Card sx={{ p: 3 }}>
          <Typography level="h3" sx={{ mb: 2 }}>Edit Profile</Typography>
          
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Typography>Username: <strong>{user.username}</strong></Typography>
            <Typography>Rating: {user.rating}</Typography>
          </Stack>

          {error && <Alert color="danger" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Biography</FormLabel>
                <Textarea
                  name="biography"
                  value={formData.biography}
                  onChange={(e) => setFormData({...formData, biography: e.target.value})}
                  minRows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Leave blank to keep current password"
                />
              </FormControl>

              <Button 
                type="submit" 
                loading={loading}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
      <Footer />
    </>
  );
}