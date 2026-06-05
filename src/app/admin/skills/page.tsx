'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import AdminLayout from '@/components/admin/AdminLayout';
import toast from 'react-hot-toast';

type Skill = Database['public']['Tables']['skills']['Row'];

const SkillsAdmin = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Language',
    proficiency: 'Intermediate',
    years_used: 1,
    icon_url: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'years_used' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('skills')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Skill updated successfully!');
      } else {
        const { error } = await supabase
          .from('skills')
          .insert([formData]);
        if (error) throw error;
        toast.success('Skill added successfully!');
      }
      resetForm();
      fetchSkills();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      years_used: skill.years_used,
      icon_url: skill.icon_url || '',
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast.success('Skill deleted successfully!');
      fetchSkills();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Language',
      proficiency: 'Intermediate',
      years_used: 1,
      icon_url: '',
    });
    setEditingId(null);
    setShowForm(false);
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Skills Management</h1>
            <p className="text-gray-400 mt-2">Manage your technical skills and expertise</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-secondary rounded-lg font-semibold text-dark hover:shadow-lg hover:shadow-accent/50 transition-all"
          >
            {showForm ? '✕ Cancel' : '+ Add Skill'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            className="bg-dark-tertiary rounded-lg p-6 border border-accent/10 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="e.g., React"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                >
                  <option>Language</option>
                  <option>Framework</option>
                  <option>Database</option>
                  <option>Tool</option>
                  <option>DevOps</option>
                  <option>AI/ML</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency</label>
                <select
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Use</label>
                <input
                  type="number"
                  name="years_used"
                  value={formData.years_used}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon URL</label>
                <input
                  type="url"
                  name="icon_url"
                  value={formData.icon_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark rounded-lg border border-accent/20 text-white focus:border-accent focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-gradient-to-r from-accent to-accent-secondary rounded-lg font-semibold text-dark hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-dark rounded-lg font-semibold text-gray-300 border border-accent/20 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="bg-dark-tertiary rounded-lg p-6 border border-accent/10 hover:border-accent/30 transition-all group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {skill.icon_url && (
                    <img
                      src={skill.icon_url}
                      alt={skill.name}
                      className="w-8 h-8 rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.category}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Proficiency:</span>
                  <span className="text-sm font-semibold text-accent">{skill.proficiency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Experience:</span>
                  <span className="text-sm font-semibold text-accent">{skill.years_used}yr{skill.years_used !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="flex-1 px-3 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded text-sm font-medium transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="flex-1 px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-sm font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {skills.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No skills yet. Start by adding your first skill!</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-secondary rounded-lg font-semibold text-dark"
            >
              Add Your First Skill
            </button>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default SkillsAdmin;
