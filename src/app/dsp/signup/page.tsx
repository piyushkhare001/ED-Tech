"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const sections = [
  {
    id: "basic",
    title: "Basic Details",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      { name: "email", label: "E-mail", type: "email", required: true },
      {
        name: "education",
        label: "Educational Qualification",
        type: "select",
        required: true,
        options: ["High School", "Bachelors", "Masters", "PhD"],
      },
      { name: "branch", label: "Branch", type: "text", required: true },
      {
        name: "yearSemester",
        label: "Year/Semester",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "introduction",
    title: "Introduction & Background",
    fields: [
      {
        name: "aboutYourself",
        label: "Can you tell us about yourself and your academic background?",
        type: "textarea",
      },
      {
        name: "motivation",
        label:
          "What motivated you to apply for the Student Partner role at DESIZNIDEAZ?",
        type: "textarea",
      },
      {
        name: "industryTrends",
        label:
          "How do you stay updated with industry trends and developments in education?",
        type: "textarea",
      },
    ],
  },
  {
    id: "education",
    title: "Education & Career Aspirations",
    fields: [
      {
        name: "careerGoals",
        label:
          "What are your career goals, and how does this role align with them?",
        type: "textarea",
      },
      {
        name: "techTransformation",
        label:
          "How do you think education can be transformed through technology?",
        type: "textarea",
      },
      {
        name: "skillsToGain",
        label:
          "What skills or knowledge do you hope to gain from this partnership?",
        type: "textarea",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Interpersonal Skills",
    fields: [
      {
        name: "communicationExample",
        label:
          "Can you describe a time when you effectively communicated complex ideas to peers?",
        type: "textarea",
      },
      {
        name: "conflictResolution",
        label:
          "How would you approach resolving conflicts or disagreements with team members?",
        type: "textarea",
      },
      {
        name: "relationshipBuilding",
        label:
          "How do you build and maintain relationships with peers and mentors?",
        type: "textarea",
      },
    ],
  },
  {
    id: "problemSolving",
    title: "Problem-Solving & Adaptability",
    fields: [
      {
        name: "challengingProject",
        label:
          "Describe a challenging project you managed and how you overcame obstacles.",
        type: "textarea",
      },
      {
        name: "taskPrioritization",
        label: "How do you prioritize tasks and manage your time?",
        type: "textarea",
      },
      {
        name: "adaptability",
        label: "Can you adapt to new tools, technologies, or workflows?",
        type: "textarea",
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Initiative",
    fields: [
      {
        name: "leadershipExperience",
        label:
          "Share an experience where you demonstrated leadership or initiative.",
        type: "textarea",
      },
      {
        name: "servicePromotion",
        label: "How would you promote DESIZNIDEAZ's services to your peers?",
        type: "textarea",
      },
      {
        name: "improvementIdeas",
        label:
          "What ideas do you have for improving student engagement and outcomes?",
        type: "textarea",
      },
    ],
  },
  {
    id: "availability",
    title: "Availability & Commitment",
    fields: [
      {
        name: "weeklyAvailability",
        label: "What is your availability for this role (hours/week)?",
        type: "select",
        options: ["5-10 hours", "10-15 hours", "15-20 hours", "20+ hours"],
      },
      {
        name: "commitmentDuration",
        label: "How long do you plan to commit to this partnership?",
        type: "select",
        options: ["3-6 months", "6-12 months", "1+ year"],
      },
      {
        name: "constraints",
        label:
          "Are there any potential conflicts of interest or scheduling constraints?",
        type: "textarea",
      },
    ],
  },
  {
    id: "scenarios",
    title: "Scenario-Based Questions",
    fields: [
      {
        name: "skepticalPeer",
        label:
          "Imagine you're promoting DESIZNIDEAZ to a skeptical peer. How would you respond?",
        type: "textarea",
      },
      {
        name: "technicalIssues",
        label:
          "If you encountered technical issues with our platform, what steps would you take?",
        type: "textarea",
      },
      {
        name: "feedbackHandling",
        label:
          "How would you handle feedback or criticism from peers or mentors?",
        type: "textarea",
      },
    ],
  },
  {
    id: "final",
    title: "Finalizing the screening",
    fields: [
      {
        name: "questions",
        label: "What questions do you have about DESIZNIDEAZ or this role?",
        type: "textarea",
      },
      {
        name: "additionalInfo",
        label: "Is there anything else you'd like to share about yourself?",
        type: "textarea",
      },
      {
        name: "expectations",
        label: "What are your expectations from this partnership?",
        type: "textarea",
      },
    ],
  },
];

const StudentPartnerForm = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    const saved = localStorage.getItem("currentSection");
    return saved ? parseInt(saved) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("studentPartnerForm");
    return saved ? JSON.parse(saved) : {};
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem("studentPartnerForm", JSON.stringify(formData));
    localStorage.setItem("currentSection", currentSection.toString());
    setProgress((currentSection / (sections.length - 1)) * 100);
  }, [formData, currentSection]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isCurrentSectionValid = () => {
    const currentFields = sections[currentSection].fields;
    if (currentSection === 0) {
      return currentFields.every(
        (field) =>
          formData[field.name] && formData[field.name].toString().trim() !== ""
      );
    }
    return true;
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      localStorage.removeItem("studentPartnerForm");
      localStorage.removeItem("currentSection");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-center text-green-600">
              Application Submitted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <AlertDescription>
                Thank you for applying to be a Student Partner at DESIZNIDEAZ!
              </AlertDescription>
              <AlertDescription>
                We will review your application and get back to you via email
                soon.
              </AlertDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="min-h-[100px] w-full"
            required={field.required}
          />
        );
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => handleInputChange(field.name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full"
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-t-4 border-t-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-green-600">
              Student Partner Registration
            </CardTitle>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Section {currentSection + 1} of {sections.length}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {sections[currentSection].title}
              </h2>
              {sections[currentSection].fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentSection === 0}
                  className="px-6"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentSectionValid() || isSubmitting}
                  className="px-6 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : currentSection === sections.length - 1
                    ? "Submit"
                    : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPartnerForm;
