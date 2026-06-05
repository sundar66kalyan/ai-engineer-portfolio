import { supabase } from './supabase';

export interface AnalyticsEvent {
  eventName: string;
  eventData?: Record<string, any>;
  pageUrl?: string;
}

export async function trackEvent(event: AnalyticsEvent, userId?: string) {
  try {
    await supabase.from('analytics').insert({
      event_name: event.eventName,
      event_data: event.eventData || {},
      page_url: event.pageUrl || typeof window !== 'undefined' ? window.location.pathname : '',
      user_id: userId || null,
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

export async function getAnalytics(days: number = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    return data || [];
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }
}
