// src/app/admin/forum/moderation/page.tsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Check, X, AlertTriangle, MessageSquare } from 'lucide-react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';


// Types for reported content
interface ReportedContent {
  id: string;
  type: 'topic' | 'reply';
  contentId: string;
  contentTitle: string;
  contentPreview: string;
  reportedBy: {
    id: string;
    name: string;
    avatar_url: string;
  };
  reason: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ForumModerationPage() {
  const [reports, setReports] = useState<ReportedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedReport, setSelectedReport] = useState<ReportedContent | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/forum/reports');
        
        if (!res.ok) {
          throw new Error('Failed to fetch reports');
        }
        
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  const handleApprove = async (reportId: string) => {
    try {
      const res = await fetch(`/api/forum/reports/${reportId}/approve`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Failed to approve report');
      }

      // Update local state
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? { ...report, status: 'approved' } : report
        )
      );
      
      if (selectedReport?.id === reportId) {
        setSelectedReport(prev => prev ? { ...prev, status: 'approved' } : null);
      }
    } catch (error) {
      console.error('Error approving report:', error);
    }
  };

  const handleReject = async (reportId: string) => {
    try {
      const res = await fetch(`/api/forum/reports/${reportId}/reject`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Failed to reject report');
      }

      // Update local state
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? { ...report, status: 'rejected' } : report
        )
      );
      
      if (selectedReport?.id === reportId) {
        setSelectedReport(prev => prev ? { ...prev, status: 'rejected' } : null);
      }
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  const filteredReports = reports.filter(report => 
    filter === 'all' || report.status === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <Link href="/admin/forum" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              <span>Back to Forum Management</span>
            </Link>
            <h1 className="text-2xl font-bold">Content Moderation</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="space-x-2">
                <button 
                  className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`px-3 py-1 rounded ${filter === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}
                  onClick={() => setFilter('approved')}
                >
                  Approved
                </button>
                <button 
                  className={`px-3 py-1 rounded ${filter === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}
                  onClick={() => setFilter('rejected')}
                >
                  Rejected
                </button>
              </div>
            </div>

            <div className="flex h-[calc(100vh-240px)]">
              <div className="w-1/3 border-r overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading reports...</div>
                ) : filteredReports.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No reports found</div>
                ) : (
                  <ul>
                    {filteredReports.map(report => (
                      <li 
                        key={report.id}
                        className={`border-b p-4 cursor-pointer hover:bg-gray-50 ${selectedReport?.id === report.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedReport(report)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium truncate flex-1">{report.contentTitle}</div>
                          {report.status === 'pending' && <AlertTriangle size={16} className="text-yellow-500 ml-2 flex-shrink-0" />}
                          {report.status === 'approved' && <Check size={16} className="text-green-500 ml-2 flex-shrink-0" />}
                          {report.status === 'rejected' && <X size={16} className="text-red-500 ml-2 flex-shrink-0" />}
                        </div>
                        <div className="text-sm text-gray-500 mb-1 flex items-center">
                          {report.type === 'topic' ? (
                            <MessageSquare size={14} className="mr-1" />
                          ) : (
                            <MessageSquare size={14} className="mr-1" />
                          )}
                          <span>{report.type === 'topic' ? 'Topic' : 'Reply'}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Reported: {formatDate(report.createdAt)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="w-2/3 p-6 overflow-y-auto">
                {selectedReport ? (
                  <div>
                    <div className="mb-4 pb-4 border-b">
                      <h2 className="text-xl font-bold mb-2">{selectedReport.contentTitle}</h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3">Type: {selectedReport.type === 'topic' ? 'Topic' : 'Reply'}</span>
                        <span>Reported: {formatDate(selectedReport.createdAt)}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Report Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center mb-3">
                          <img 
                            src={selectedReport.reportedBy.avatar_url || '/default-avatar.png'} 
                            alt={selectedReport.reportedBy.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-medium">{selectedReport.reportedBy.name}</div>
                            <div className="text-xs text-gray-500">Reported {formatDate(selectedReport.createdAt)}</div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="text-sm mb-2 font-medium">Reason for reporting:</div>
                          <p className="text-gray-700">{selectedReport.reason}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Reported Content</h3>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-gray-700 whitespace-pre-line">{selectedReport.contentPreview}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <Link 
                        href={selectedReport.type === 'topic' 
                          ? `/forum/topic/${selectedReport.contentId}` 
                          : `/forum/topic/${selectedReport.contentId}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        target="_blank"
                      >
                        <Eye size={18} className="mr-1" />
                        <span>View in Forum</span>
                      </Link>
                      <div className="space-x-2">
                        {selectedReport.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleReject(selectedReport.id)}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
                            >
                              <X size={18} className="mr-1" />
                              <span>Reject Report</span>
                            </button>
                            <button 
                              onClick={() => handleApprove(selectedReport.id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
                            >
                              <Check size={18} className="mr-1" />
                              <span>Remove Content</span>
                            </button>
                          </>
                        )}
                        {selectedReport.status === 'approved' && (
                          <div className="text-green-600 flex items-center">
                            <Check size={18} className="mr-1" />
                            <span>Content removed</span>
                          </div>
                        )}
                        {selectedReport.status === 'rejected' && (
                          <div className="text-gray-600 flex items-center">
                            <X size={18} className="mr-1" />
                            <span>Report rejected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <AlertTriangle size={40} className="mx-auto mb-2 text-gray-400" />
                      <p>Select a report to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}