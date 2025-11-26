import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../providers/auth';
import { DEPARTMENTS, Department, getDepartmentInfo } from '../types/user';
import { updateUserDepartment, createUserProfile } from '../lib/userService';
import PageLayout from '../components/PageLayout';

export default function Onboarding() {
  const { user, profile, loading, profileLoading, profileError, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    
    // Redirect to sign-in if not authenticated
    if (!user) {
      navigate('/signin', { replace: true });
      return;
    }
    
    // Wait for profile to load
    if (profileLoading) return;
    
    // Redirect to home if already has department
    if (profile?.department) {
      navigate('/', { replace: true });
    }
  }, [user, profile, loading, profileLoading, navigate]);

  const handleSubmit = async () => {
    if (!selectedDepartment || !user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // If profile doesn't exist yet, create it first
      if (!profile) {
        await createUserProfile(user);
      }
      
      await updateUserDepartment(user.uid, selectedDepartment);
      await refreshProfile();
      
      // Redirect to the appropriate dashboard
      const dept = getDepartmentInfo(selectedDepartment);
      navigate(dept?.dashboardPath || '/dashboard/ems', { replace: true });
    } catch (err) {
      console.error('Failed to save department:', err);
      setError('Failed to save your selection. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth state
  if (loading || (profileLoading && !profileError)) {
    return (
      <PageLayout showHeader={false} showFooter={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  // Redirect if no user (after loading completes)
  if (!user) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <PageLayout showHeader={false}>
      <section className="min-h-screen py-12 md:py-20 flex items-center">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <img
              src="/mesh_logo.svg"
              alt="Mesh"
              className="w-14 h-14 mx-auto mb-8 rounded-xl"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to Mesh
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Select your department to personalize your experience. This helps us show you 
              the most relevant information and features.
            </p>
          </motion.div>

          {(error || profileError) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm text-center max-w-md mx-auto flex items-center justify-center gap-2"
            >
              <AlertCircle size={16} />
              <span>{error || profileError}</span>
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-4 mb-10"
          >
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDepartment === dept.id;

              return (
                <motion.button
                  key={dept.id}
                  variants={itemVariants}
                  onClick={() => setSelectedDepartment(dept.id)}
                  disabled={isSubmitting}
                  className={`
                    relative p-5 rounded-xl border-2 text-left transition-all duration-200
                    ${isSelected
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border hover:border-primary/40 hover:bg-muted/50'
                    }
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {dept.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {dept.description}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        <Check size={14} className="text-primary-foreground" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={handleSubmit}
              disabled={!selectedDepartment || isSubmitting}
              className={`
                inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-200
                ${selectedDepartment && !isSubmitting
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/40'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            You can change this later in your account settings.
          </motion.p>
        </div>
      </section>
    </PageLayout>
  );
}

