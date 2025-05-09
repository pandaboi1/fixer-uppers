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
} from "@mui/joy";
import Box from "@mui/joy/Box";
import NavBar from "../comp/nav";
import Footer from "../comp/footer";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    biography: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Not authenticated");

        const userData = await response.json();
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          biography: userData.biography || "",
          password: "",
        });
      } catch (err) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      router.push("/profile");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
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
          <Typography level="h3" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>

          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Biography</FormLabel>
                <Textarea
                  name="biography"
                  value={formData.biography}
                  onChange={(e) =>
                    setFormData({ ...formData, biography: e.target.value })
                  }
                  minRows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Leave blank to keep current password"
                />
              </FormControl>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
      <Footer />
    </>
  );
}