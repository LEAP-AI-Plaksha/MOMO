export interface User {
    id: string;
    name: string;
    email: string;
    expertise?: string;
    profilePicture?: string;
  }
  
  export interface Newsletter {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    publishedAt: string;
    isPublic: boolean;
  }
  
  export interface Lecture {
    id: string;
    title: string;
    videoUrl: string;
    transcription?: string;
    shortSummary?: string;
    longSummary?: string;
    newsletterId?: string;
    authorId: string;
    createdAt: string;
    status: 'uploading' | 'processing' | 'transcribing' | 'completed';
  }