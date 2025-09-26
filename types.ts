
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface AnalysisResult {
  summary: string;
  complexity: 'Low' | 'Medium' | 'High' | string;
  clarifyingQuestions: string[];
}
