import { Job, JobApplication } from '../store/types';

const APPLIED_JOBS_KEY = 'appliedJobs';

export interface AppliedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  applicationDate: string;
  status?: 'Pending' | 'Accepted' | 'Rejected';
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
}

export const saveJobApplication = (job: AppliedJob): void => {
  try {
    const appliedJobs = getAppliedJobs();
    appliedJobs.push({ ...job, status: 'Pending' });
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(appliedJobs));
  } catch (error) {
    console.error('Error saving job application:', error);
  }
};

export const getAppliedJobs = (): AppliedJob[] => {
  try {
    const appliedJobs = localStorage.getItem(APPLIED_JOBS_KEY);
    return appliedJobs ? JSON.parse(appliedJobs) : [];
  } catch (error) {
    console.error('Error getting applied jobs:', error);
    return [];
  }
};

export const hasAppliedToJob = (jobId: number): boolean => {
  try {
    const appliedJobs = getAppliedJobs();
    return appliedJobs.some(application => application.id === jobId);
  } catch (error) {
    console.error('Error checking job application:', error);
    return false;
  }
};

export const removeJobApplication = (jobId: number): void => {
  try {
    const appliedJobs = getAppliedJobs();
    const updatedJobs = appliedJobs.filter(application => application.id !== jobId);
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updatedJobs));
  } catch (error) {
    console.error('Error removing job application:', error);
  }
}; 