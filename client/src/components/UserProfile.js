import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from '../api/axios'; // Assuming axios is set up for API calls
import './ProfilePage.css'; // Import the CSS file
import StarsBackground from './StarsBackground';
import { Canvas } from '@react-three/fiber'; // Import Canvas from react-three/fiber

export default function UserProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingProfile, setEditingProfile] = useState(null);
  const [deletingProfile, setDeletingProfile] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/auth/profile', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setProfile(res.data);
    } catch (err) {
      setError('Error fetching profile, please try again later.');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user profile
  const deleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your profile?')) return;
    setDeletingProfile(true);
    setError('');
    try {
      await axios.delete('/auth/profile'); // Endpoint for deleting profile
      alert('Profile deleted successfully');
      navigate('/register'); // Redirect to the register page after successful deletion
    } catch (err) {
      setError('Error deleting profile, please try again later.');
      console.error('Error deleting profile:', err);
    } finally {
      setDeletingProfile(false);
    }
  };

  // Handle profile edit
  const handleEdit = () => {
    setEditingProfile(profile); // Pass the profile data to the edit form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      await axios.put('/auth/profile', editingProfile); // Assuming the endpoint for profile update
      setProfile(editingProfile);  // Update the profile state with new data
      setEditingProfile(null);  // Close the edit form
    } catch (err) {
      setError('Error updating profile, please try again later.');
      console.error('Error updating profile:', err);
    }
  };

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <StarsBackground />
      </Canvas>
      <div className="profile-content">
        <h2>User Profile</h2>

        {profile && !loading && !error && (
          <div className="profile-details">
            <div className="profile-info">
              <div className="profile-field">
                <strong>Name:</strong>
                {editingProfile ? (
                  <input
                    type="text"
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                    className="profile-input"
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>
              <div className="profile-field">
                <strong>Email:</strong>
                {editingProfile ? (
                  <input
                    type="email"
                    value={editingProfile.email}
                    onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                    className="profile-input"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="profile-field">
                <strong>Password:</strong>
                {editingProfile ? (
                  <input
                    type="password"
                    value={editingProfile.password}
                    onChange={(e) => setEditingProfile({ ...editingProfile, password: e.target.value })}
                    className="profile-input"
                  />
                ) : (
                  <span>******</span>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {editingProfile ? (
                <button onClick={handleProfileUpdate} className="submit-button">
                  Save Changes
                </button>
              ) : (
                <button onClick={handleEdit} className="edit-button">
                  Edit Profile
                </button>
              )}
              <button
                onClick={deleteProfile}
                className="delete-button"
                disabled={deletingProfile}
              >
                {deletingProfile ? 'Deleting...' : 'Delete Profile'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
