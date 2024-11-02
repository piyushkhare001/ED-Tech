import React from 'react';

const TrainingProcess = () => {
  const steps = [
    {
      icon: '📚',
      title: 'Understand Concepts',
      description: 'Go through Guided videos to understand concepts',
    },
    {
      icon: '📊',
      title: 'Test Knowledge',
      description: 'Test you knowledge by attending quizzes and assignment properly',
    },
    {
      icon: '🛠️',
      title: 'Hands-on Experience',
      description: 'Learn from the expert and work on the projects.',
    },
    {
      icon: '💬',
      title: 'Instant Doubt Solving',
      description: 'Get your doubt resolution from the experts instantly.',
    },
    {
      icon: '📝',
      title: 'Final Exam',
      description: 'Complete training modules and take final exam and become master.',
    },
    {
      icon: '📜',
      title: 'Get Certified',
      description: 'Get a Certificate on course completion and passing assessment',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">How Will Your Training Work</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-4xl text-teal-500 mb-4">{step.icon}</div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingProcess;