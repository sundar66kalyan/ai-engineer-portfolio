'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import AdminLayout from '@/components/admin/AdminLayout';
import toast from 'react-hot-toast';

type Profile = Database['public']['Tables']['profiles']['Row'];

const ProfileAdmin = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar_url: '',
    resume_url: '',
    github_username: '',
    linkedin_url: '',
    twitter_url: '',
    location: '',
    years_experience: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .single();
        if (data) {
          setProfile(data);
          setFormData(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'years_experience' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (profile) {
        const { error } = await supabase
          .from('profiles')
          .update(formData)
          .eq('id', profile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('profiles')
          .insert([formData]);
        if (error) throw error;
      }
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-2 text-white">Profile Settings</h1>
        <p className="text-gray-400 mb-8">Manage your portfolio profile information</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-dark-tertiary rounded-lg p-6 border border-accent/10">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Media & URLs */}
          <div className="bg-dark-tertiary rounded-lg p-6 border border-accent/10">
            <h2 className="text-xl font-bold text-white mb-4">Media & Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
                <input
                  type="url"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL</label>
                <input
                  type="url"
                  name="resume_url"
                  value={formData.resume_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-dark-tertiary rounded-lg p-6 border border-accent/10">
            <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Username</label>
                <input
                  type="text"
                  name="github_username"
                  value={formData.github_username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
                <input
                  type="url"
                  name="twitter_url"
                  value={formData.twitter_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-accent to-accent-secondary rounded-lg font-semibold text-dark hover:shadow-lg hover:shadow-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (profile) setFormData(profile);
              }}
              className="px-8 py-3 bg-dark-tertiary rounded-lg font-semibold text-gray-300 hover:text-white transition-all border border-accent/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default ProfileAdmin;
