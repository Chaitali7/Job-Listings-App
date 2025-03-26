import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Job, JobApplication, JobState } from './types';

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk<Job[], void>(
  'jobs/fetchJobs',
  async () => {
    const response = await axios.get<Job[]>('https://jsonplaceholder.typicode.com/posts');
    return response.data.map((job, index) => ({
      ...job,
      title: [
        'Frontend Developer',
        'Backend Engineer',
        'Full Stack Developer',
        'DevOps Engineer',
        'UI/UX Designer',
        'Product Manager',
        'Data Scientist',
        'Mobile Developer'
      ][index % 8],
      company: [
        'Google',
        'Microsoft',
        'Amazon',
        'Apple',
        'Meta',
        'Netflix',
        'Adobe',
        'Salesforce'
      ][index % 8],
      location: [
        'New York, NY',
        'San Francisco, CA',
        'London, UK',
        'Remote',
        'Seattle, WA',
        'Austin, TX',
        'Boston, MA',
        'Chicago, IL'
      ][index % 8],
      type: ['Full-time', 'Part-time', 'Contract', 'Remote'][index % 4],
      salary: ['$80K - $100K', '$100K - $130K', '$130K - $150K', '$150K+'][index % 4]
    }));
  }
);

export const fetchJobDetails = createAsyncThunk<Job, number>(
  'jobs/fetchJobDetails',
  async (id) => {
    const response = await axios.get<Job>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const index = (id - 1) % 8;
    return {
      ...response.data,
      title: [
        'Frontend Developer',
        'Backend Engineer',
        'Full Stack Developer',
        'DevOps Engineer',
        'UI/UX Designer',
        'Product Manager',
        'Data Scientist',
        'Mobile Developer'
      ][index],
      company: [
        'Google',
        'Microsoft',
        'Amazon',
        'Apple',
        'Meta',
        'Netflix',
        'Adobe',
        'Salesforce'
      ][index],
      location: [
        'New York, NY',
        'San Francisco, CA',
        'London, UK',
        'Remote',
        'Seattle, WA',
        'Austin, TX',
        'Boston, MA',
        'Chicago, IL'
      ][index],
      type: ['Full-time', 'Part-time', 'Contract', 'Remote'][index % 4],
      salary: ['$80K - $100K', '$100K - $130K', '$130K - $150K', '$150K+'][index % 4]
    };
  }
);

export const submitJobApplication = createAsyncThunk<Job, JobApplication>(
  'jobs/submitApplication',
  async (jobData) => {
    const response = await axios.post<Job>('https://jsonplaceholder.typicode.com/posts', jobData);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch job details';
      });
  },
});

export const { setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer; 