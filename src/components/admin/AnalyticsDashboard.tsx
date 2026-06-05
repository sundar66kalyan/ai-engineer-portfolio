'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase';

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data } = await supabase
          .from('analytics')
          .select('*')
          .gte('created_at', thirtyDaysAgo.toISOString())
          .order('created_at', { ascending: true });

        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  const eventCounts: Record<string, number> = {};
  const dailyEvents: Record<string, number> = {};

  events.forEach((event) => {
    eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
    const date = new Date(event.created_at).toLocaleDateString();
    dailyEvents[date] = (dailyEvents[date] || 0) + 1;
  });

  const eventData = Object.entries(eventCounts).map(([name, count]) => ({
    name: name.replace(/_/g, ' '),
    count,
  }));

  const dailyData = Object.entries(dailyEvents).map(([date, count]) => ({
    date,
    events: count,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: events.length },
          { label: 'Unique Events', value: Object.keys(eventCounts).length },
          { label: 'This Month', value: events.length },
          { label: 'Avg Daily', value: Math.round(events.length / 30) },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-dark-tertiary rounded-lg p-6 border border-accent/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-accent mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-dark-tertiary rounded-lg p-6 border border-accent/10">
          <h3 className="text-lg font-bold text-white mb-6">Events by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f3a',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}
              />
              <Bar dataKey="count" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-tertiary rounded-lg p-6 border border-accent/10">
          <h3 className="text-lg font-bold text-white mb-6">Daily Events Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f3a',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}
              />
              <Line type="monotone" dataKey="events" stroke="#00d4ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
