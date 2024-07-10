import React, { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Typography,
  Box,
  Divider,
  CardContent,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import httpInstance from '../../../header/HttpInstance';
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in local storage');

      const userDetails = JSON.parse(token);
      if (!userDetails || !userDetails.id) throw new Error('Invalid user details');
      const response = await httpInstance.get(`/get-profile-details/${userDetails.id}`); // Replace with your actual API endpoint
      setUser(response.data[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Card variant="outlined">
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Profile
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* Left Side: Basic Details */}
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText primary="Distributor Name" secondary={user?.distributor_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date of Birth" secondary={user?.date_of_birth} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Gender" secondary={user?.gender} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="PAN" secondary={user?.pan_number} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Aadhar Number" secondary={user?.aadhar_number} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Profession" secondary={user?.profession} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Nominee Name" secondary={user?.nominee_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Relation" secondary={user?.relationship_with_nominee} />
                </ListItem>
              </List>
            </Grid>

            {/* Right Side: User Photo */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
              <Avatar
                alt={user?.name}
                src={user?.photo} // Assuming user?.photo contains the URL of the user's photo
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Card>
  );
};

export default ProfilePage;
