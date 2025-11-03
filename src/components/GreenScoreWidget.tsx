import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface GreenScoreData {
  score: number;
  grade: string;
  factors: {
    gstn_compliance: number;
    invoice_quality: number;
    carbon_reduction: number;
    sustainability_practices: number;
    certification_level: number;
  };
  recommendations: Array<{
    title: string;
    action: string;
    potential_points: number;
  }>;
  previous_score: number;
}

export const GreenScoreWidget = () => {
  const [scoreData, setScoreData] = useState<GreenScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const { toast } = useToast();

  const loadGreenScore = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('green_score, green_score_factors, green_score_last_updated')
        .eq('user_id', user.id)
        .single();

      if (profile && profile.green_score !== null) {
        const factors = profile.green_score_factors as any || {
          gstn_compliance: 0,
          invoice_quality: 0,
          carbon_reduction: 0,
          sustainability_practices: 0,
          certification_level: 0,
        };
        
        setScoreData({
          score: profile.green_score,
          grade: getGrade(profile.green_score),
          factors,
          recommendations: [],
          previous_score: profile.green_score,
        });
      }
    } catch (error) {
      console.error('Failed to load green score:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = async () => {
    setCalculating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('calculate-green-score', {
        body: { user_id: user.id },
      });

      if (error) throw error;

      setScoreData(data);
      toast({
        title: '🌱 Green Score Updated!',
        description: `Your score is now ${data.score} (${data.grade})`,
      });
    } catch (error: any) {
      toast({
        title: 'Calculation Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => {
    loadGreenScore();
  }, []);

  const getGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    return 'C';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4" />
          <div className="h-24 bg-muted rounded mb-4" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Green Score</h3>
            <p className="text-sm text-muted-foreground">
              Your sustainability rating
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={calculateScore}
          disabled={calculating}
        >
          {calculating ? 'Calculating...' : 'Recalculate'}
        </Button>
      </div>

      {scoreData ? (
        <>
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative inline-flex items-center justify-center"
            >
              <div className="w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={getScoreColor(scoreData.score)}
                    initial={{ strokeDasharray: '0 352' }}
                    animate={{
                      strokeDasharray: `${(scoreData.score / 100) * 352} 352`,
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(scoreData.score)}`}>
                  {scoreData.score}
                </span>
                <Badge variant="secondary" className="mt-1">
                  {scoreData.grade}
                </Badge>
              </div>
            </motion.div>

            {scoreData.score > scoreData.previous_score && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-green-600"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  +{scoreData.score - scoreData.previous_score} points
                </span>
              </motion.div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Score Breakdown</h4>
            {Object.entries(scoreData.factors).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-muted-foreground">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="font-medium">{value}/100</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>

          {scoreData.recommendations && scoreData.recommendations.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                How to Improve
              </h4>
              {scoreData.recommendations.map((rec, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium">{rec.title}</span>
                    <Badge variant="outline" className="text-xs">
                      +{rec.potential_points}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.action}</p>
                </div>
              ))}
            </div>
          )}

          {scoreData.score >= 80 && (
            <div className="bg-primary/10 p-4 rounded-lg flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Excellent Score!</p>
                <p className="text-xs text-muted-foreground">
                  You qualify for premium green loan rates
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Calculate your Green Score to see your sustainability rating
          </p>
          <Button onClick={calculateScore} disabled={calculating}>
            {calculating ? 'Calculating...' : 'Calculate Green Score'}
          </Button>
        </div>
      )}
    </Card>
  );
};
