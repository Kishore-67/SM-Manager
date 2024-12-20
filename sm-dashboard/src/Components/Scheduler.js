// Import necessary dependencies from Material-UI and other libraries
import React, { useState } from 'react';
import { 
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/Scheduler.css';

// Initialize the calendar localizer with moment.js
const localizer = momentLocalizer(moment);

// Define color schemes for different social media platforms
const platformColors = {
  Twitter: { main: '#1DA1F2', light: 'rgba(29, 161, 242, 0.1)' },
  LinkedIn: { main: '#0077B5', light: 'rgba(0, 119, 181, 0.1)' },
  Instagram: { main: '#E4405F', light: 'rgba(228, 64, 95, 0.1)' },
  Facebook: { main: '#4267B2', light: 'rgba(66, 103, 178, 0.1)' },
};

const Scheduler = () => {
  // Initialize state for the form data
  const [scheduleData, setScheduleData] = useState({
    content: '',              // Post content
    platform: '',            // Selected social media platform
    scheduledTime: new Date('2024-12-20T11:36:27').toISOString().slice(0, 16), // Default time
  });

  // State to store all scheduled posts
  const [scheduledPosts, setScheduledPosts] = useState([]);

  // Available social media platforms
  const platforms = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'];

  /**
   * Handle the submission of a new scheduled post
   * - Validates input
   * - Creates a new post object
   * - Adds it to the scheduledPosts array
   * - Resets the form
   */
  const handleSchedule = () => {
    // Validate that all fields are filled
    if (!scheduleData.content || !scheduleData.platform || !scheduleData.scheduledTime) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new post object with calendar event properties
    const newPost = {
      ...scheduleData,
      id: Date.now(),                    // Unique identifier
      scheduledTime: new Date(scheduleData.scheduledTime),
      title: `${scheduleData.platform} Post`,  // Event title for calendar
      start: new Date(scheduleData.scheduledTime), // Event start time
      end: new Date(new Date(scheduleData.scheduledTime).getTime() + 30 * 60000), // End time (30 mins later)
    };

    // Add new post to the list
    setScheduledPosts([...scheduledPosts, newPost]);
    
    // Reset form fields
    setScheduleData({
      content: '',
      platform: '',
      scheduledTime: new Date('2024-12-20T11:36:27').toISOString().slice(0, 16),
    });
  };

  /**
   * Delete a scheduled post by its ID
   * @param {number} id - The ID of the post to delete
   */
  const handleDelete = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };

  /**
   * Custom styling for calendar events based on the platform
   * @param {Object} event - The calendar event object
   * @returns {Object} Style object for the event
   */
  const eventStyleGetter = (event) => {
    const color = platformColors[event.platform]?.main || '#1976d2';
    return {
      style: {
        backgroundColor: color,
        border: 'none',
      }
    };
  };

  return (
    <Box className="scheduler-container" sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom className="scheduler-title">
        Post Scheduler
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }} className="scheduler-form">
            <Stack spacing={2}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Post Content"
                value={scheduleData.content}
                onChange={(e) => setScheduleData({ ...scheduleData, content: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                  }
                }}
              />

              <FormControl fullWidth className="platform-select">
                <InputLabel>Platform</InputLabel>
                <Select
                  value={scheduleData.platform}
                  label="Platform"
                  onChange={(e) => setScheduleData({ ...scheduleData, platform: e.target.value })}
                  size="small"
                >
                  {platforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      <Chip
                        label={platform}
                        className="platform-chip"
                        size="small"
                        sx={{
                          backgroundColor: platformColors[platform].light,
                          color: platformColors[platform].main,
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Schedule Time"
                type="datetime-local"
                value={scheduleData.scheduledTime}
                onChange={(e) => setScheduleData({ ...scheduleData, scheduledTime: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                  }
                }}
              />

              <Button 
                variant="contained" 
                onClick={handleSchedule}
                className="schedule-button"
                size="small"
              >
                Schedule Post
              </Button>
            </Stack>
          </Paper>

          <Typography variant="h6" gutterBottom className="scheduler-title">
            Scheduled Posts
          </Typography>

          <Stack spacing={1} sx={{ maxHeight: '300px', overflow: 'auto' }}>
            {scheduledPosts.map((post) => (
              <Paper 
                key={post.id} 
                elevation={2} 
                sx={{ p: 1.5 }} 
                className={`scheduled-post platform-${post.platform.toLowerCase()}`}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box>
                    <Chip
                      label={post.platform}
                      className="platform-chip"
                      size="small"
                      sx={{
                        backgroundColor: platformColors[post.platform].light,
                        color: platformColors[post.platform].main,
                        mb: 0.5
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {post.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.scheduledTime.toLocaleString()}
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={() => handleDelete(post.id)} 
                    color="error"
                    className="delete-button"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }} className="calendar-paper">
            <Calendar
              localizer={localizer}
              events={scheduledPosts}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(100vh - 180px)' }}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day', 'agenda']}
              defaultView="month"
              tooltipAccessor={(event) => event.content}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Scheduler;