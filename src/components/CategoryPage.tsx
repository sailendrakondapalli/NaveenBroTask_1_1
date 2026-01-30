import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Tag, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase, Post } from '../lib/supabase';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { user, signInWithGoogle } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryMap: { [key: string]: { label: string; type: string } } = {
    'powerapps': { label: 'Power Apps', type: 'powerapps' },
    'powerbi': { label: 'Power BI', type: 'powerbi' },
    'powerautomate': { label: 'Power Automate', type: 'powerautomate' }
  };

  const currentCategory = categoryMap[category || ''];

  useEffect(() => {
    if (currentCategory) {
      fetchPosts();
    }
  }, [category]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .eq('type', currentCategory.type)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentCategory.label} Components
          </h1>
          <p className="text-gray-600">
            All available {currentCategory.label} components and solutions
          </p>
        </div>

        {/* Components Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading components...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No {currentCategory.label} components available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;