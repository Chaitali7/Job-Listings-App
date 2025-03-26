export interface Job {
  id: number;
  title: string;
  body: string;
  userId: number;
  company: string;
  location: string;
  type: string;
  salary: string;
}

export interface JobApplication {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
}

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
} 