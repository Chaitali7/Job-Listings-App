import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

// Transform the post data into our Job format
const transformPost = (post: any): Job => ({
  id: post.id,
  title: `${post.title.slice(0, 30)}...`, // Use first part of title
  company: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'][Math.floor(Math.random() * 5)],
  location: ['New York, NY', 'San Francisco, CA', 'London, UK', 'Remote'][Math.floor(Math.random() * 4)],
  type: ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)],
  salary: [`$${80 + Math.floor(Math.random() * 70)}K - $${120 + Math.floor(Math.random() * 80)}K`][0],
  description: post.body
});

export const api = {
  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      return response.data.map(transformPost);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Get job by ID
  getJobById: async (id: number): Promise<Job> => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`);
      return transformPost(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  },

  // Submit job application
  submitApplication: async (jobId: number, applicationData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, {
        ...applicationData,
        jobId,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  }
}; 