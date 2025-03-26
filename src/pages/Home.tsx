import React, { useEffect, useState, useCallback } from 'react';
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { fetchJobs } from '../store/jobSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { locationOutline, businessOutline, timeOutline } from 'ionicons/icons';
import Navbar from '../components/Navbar';
import './Home.css';
import debounce from 'lodash/debounce';

// More realistic job data
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
const locations = ['New York, NY', 'San Francisco, CA', 'London, UK', 'Remote'];
const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Salesforce'];
const salaryRanges = ['$80K - $100K', '$100K - $130K', '$130K - $150K', '$150K+'];
const roles = [
  'Frontend Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Mobile Developer'
];

const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48];
const DEFAULT_ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { jobs, loading, error } = useAppSelector((state) => state.jobs);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company.toLowerCase().includes(searchText.toLowerCase()) ||
    job.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search changes or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, itemsPerPage]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 300),
    []
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the content when page changes
    const content = document.querySelector('ion-content');
    if (content) {
      content.scrollToTop(500);
    }
  };

  const handleItemsPerPageChange = (event: CustomEvent) => {
    const newItemsPerPage = parseInt(event.detail.value);
    setItemsPerPage(newItemsPerPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Previous button
    buttons.push(
      <IonButton
        key="prev"
        className="page-button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </IonButton>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <IonButton
          key={i}
          className={`page-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </IonButton>
      );
    }

    // Next button
    buttons.push(
      <IonButton
        key="next"
        className="page-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </IonButton>
    );

    return buttons;
  };

  if (loading) {
    return (
      <IonPage>
        <Navbar />
        <IonContent>
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <Navbar />
        <IonContent>
          <div className="ion-text-center ion-padding">
            <p>Error: {error}</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <div className="hero-section">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of job opportunities with all the information you need.</p>
        </div>
        <div className="search-container">
          <IonSearchbar
            onIonInput={e => debouncedSearch(e.detail.value!)}
            placeholder="Search jobs, companies, or locations..."
            className="custom-searchbar"
            debounce={300}
          />
        </div>
        <div className="main-content">
          <div className="items-per-page">
            <label htmlFor="items-per-page">Jobs per page:</label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <IonGrid>
            <IonRow>
              {displayedJobs.map(job => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={job.id}>
                  <IonCard className="job-card">
                    <IonCardHeader>
                      <IonCardTitle className="job-title">{job.title}</IonCardTitle>
                      <IonCardSubtitle className="company-name">
                        <IonIcon icon={businessOutline} /> {job.company}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="job-details">
                        <div className="location">
                          <IonIcon icon={locationOutline} />
                          <IonText>{job.location}</IonText>
                        </div>
                        <div className="job-type">
                          <IonIcon icon={timeOutline} />
                          <IonText>{job.type}</IonText>
                        </div>
                      </div>
                      <div className="salary">
                        <IonChip color="success">{job.salary}</IonChip>
                      </div>
                      <IonButton
                        expand="block"
                        className="view-details-btn"
                        onClick={() => history.push(`/job/${job.id}`)}
                      >
                        View Details
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          
          {filteredJobs.length > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
              </div>
              <div className="pagination-buttons">
                {renderPaginationButtons()}
              </div>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="ion-text-center ion-padding">
              <h2>No jobs found</h2>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home; 