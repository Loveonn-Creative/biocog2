import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface SubscriptionActivatorProps {
  onActivated?: () => void;
}

export const SubscriptionActivator = ({ onActivated }: SubscriptionActivatorProps) => {
  const [activating, setActivating] = useState(false);
  const { toast } = useToast();

  const benefits = [
    'Unlimited invoice scans',
    'AI-powered insights & recommendations',
    'Advanced analytics & reports',
    'Priority customer support',
    'Blockchain verification',
    'Real-time carbon tracking',
    'Green loan eligibility calculator',
    'Government scheme matching',
  ];

  const activateTrial = async () => {
    setActivating(true);
    try {
      const { data, error } = await supabase.functions.invoke('activate-trial-subscription');

      if (error) throw error;

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      toast({
        title: '🎉 Welcome to 90 Days of Unlimited Access!',
        description: `Your free trial is now active until ${new Date(
          data.trial_ends_at
        ).toLocaleDateString()}`,
      });

      onActivated?.();
    } catch (error: any) {
      toast({
        title: 'Activation Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setActivating(false);
    }
  };

  return (
    <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Start Your 90-Day Free Trial</h2>
        <p className="text-lg text-muted-foreground">
          Unlock all premium features with no credit card required
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <Clock className="w-4 h-4 text-primary" />
        <span className="font-medium">Full access for 3 months</span>
        <Badge variant="secondary" className="ml-2">
          ₹0
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm">{benefit}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pt-4"
      >
        <Button
          size="lg"
          className="text-lg px-8 py-6 font-semibold"
          onClick={activateTrial}
          disabled={activating}
        >
          {activating ? 'Activating...' : 'Activate Free Trial'}
        </Button>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        No credit card required • Cancel anytime • No hidden fees
      </p>
    </Card>
  );
};
