import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
  IonToast,
  IonLabel,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { saveJobApplication } from '../services/localStorage';
import { cloudUploadOutline, documentTextOutline } from 'ionicons/icons';
import Navbar from '../components/Navbar';
import './JobApplication.css';

const JobApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const job = jobs.find((j) => j.id === parseInt(id));
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      saveJobApplication({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        applicationDate: new Date().toISOString(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        coverLetter: formData.coverLetter,
      });
      setShowToast(true);
      setTimeout(() => {
        history.push('/applied');
      }, 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' B';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!job) {
    return (
      <IonPage>
        <Navbar />
        <IonContent>
          <div className="application-container">
            <div className="application-form">
              <h2>Job not found</h2>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <div className="application-container">
          <form className="application-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Apply for {job.title} at {job.company}</h2>
            
            <div className="form-group">
              <IonLabel>Full Name</IonLabel>
              <IonInput
                type="text"
                value={formData.fullName}
                onIonChange={e => setFormData({ ...formData, fullName: e.detail.value || '' })}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={e => setFormData({ ...formData, email: e.detail.value || '' })}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <IonLabel>Phone Number</IonLabel>
              <IonInput
                type="tel"
                value={formData.phone}
                onIonChange={e => setFormData({ ...formData, phone: e.detail.value || '' })}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <IonLabel>Years of Experience</IonLabel>
              <IonInput
                type="number"
                value={formData.experience}
                onIonChange={e => setFormData({ ...formData, experience: e.detail.value || '' })}
                required
                placeholder="Enter years of experience"
                min="0"
                max="50"
              />
            </div>

            <div className="form-group">
              <IonLabel>Cover Letter</IonLabel>
              <IonTextarea
                value={formData.coverLetter}
                onIonChange={e => setFormData({ ...formData, coverLetter: e.detail.value || '' })}
                required
                placeholder="Write your cover letter here..."
                rows={6}
              />
            </div>

            <div className="upload-section">
              <IonLabel>Resume</IonLabel>
              <label className={`upload-resume ${formData.resume ? 'file-selected' : ''}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
                <IonIcon icon={cloudUploadOutline} />
                <h3>{formData.resume ? 'Resume Selected' : 'Upload Resume'}</h3>
                <p>PDF, DOC, DOCX (Max 5MB)</p>
                {formData.resume && (
                  <div className="file-info">
                    <IonIcon icon={documentTextOutline} />
                    <span>{formData.resume.name} ({formatFileSize(formData.resume.size)})</span>
                  </div>
                )}
              </label>
            </div>

            <IonButton
              type="submit"
              expand="block"
              className="submit-button"
            >
              Submit Application
            </IonButton>
          </form>
        </div>

        <IonToast
          isOpen={showToast}
          message="Application submitted successfully!"
          duration={2000}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default JobApplication; 