import React, { useState } from 'react';
import { Eye, Copy, Download, Tag, Star, Clock, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase, Post } from '../lib/supabase';

const ComponentsLibrary = () => {
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('Power Apps');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const tabs = [
    { label: 'Power Apps', value: 'powerapps' },
    { label: 'Power BI', value: 'powerbi' },
    { label: 'Power Automate', value: 'powerautomate' }
  ];
  
  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(6); // Show only 6 posts on home page
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentTabValue = tabs.find(tab => tab.label === activeTab)?.value || 'powerapps';
  const filteredComponents = posts.filter(post => post.type === currentTabValue);

  const handleCopyCode = async (content: string) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    try {
      await navigator.clipboard.writeText(content);
      alert('Code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = (downloadLink: string) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.label
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Component Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading components...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredComponents.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Image */}
              {post.images && post.images.length > 0 && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.images[0]} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {post.title}
                </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                    {post.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {post.is_free ? 'Free' : 'Premium'}
                  </span>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                  <button 
                    onClick={() => handleCopyCode(post.content)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  >
                    {!user && <Lock className="w-4 h-4" />}
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  
                  {post.download_link && (
                    <button 
                      onClick={() => handleDownload(post.download_link!)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                    >
                      {!user && <Lock className="w-4 h-4" />}
                      <Download className="w-4 h-4" />
                    </button>
                  )}
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentsLibrary;