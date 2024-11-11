import { Applicant } from "@/types/types";

export const dummyApplicants: Applicant[] = [
  {
    id: "1",
    name: "Alice Smith",
    location: "New York, NY",
    yearsOfExperience: 5,
    educationalExperiences: ["BSc Computer Science", "MSc Software Engineering"],
    professionalExperiences: [
      "Software Engineer at TechCorp",
      "Frontend Developer at WebSolutions",
    ],
    profilePhotoIds: ["photo1", "photo2"],
    prompts: [
      { question: "What is your greatest strength?", answer: "Problem-solving skills." },
      { question: "Why do you want to work here?", answer: "I admire the company's innovation." },
    ],
  },
  {
    id: "2",
    name: "Bob Johnson",
    location: "San Francisco, CA",
    yearsOfExperience: 3,
    educationalExperiences: ["BSc Information Technology"],
    professionalExperiences: ["Junior Developer at CodeFactory"],
    profilePhotoIds: ["photo3"],
    prompts: [
      { question: "What motivates you?", answer: "Learning new technologies." },
      { question: "Describe a challenge you faced.", answer: "I improved a slow process." },
    ],
  },
  {
    id: "3",
    name: "Charlie Brown",
    location: "Austin, TX",
    yearsOfExperience: 4,
    educationalExperiences: ["BSc Software Engineering"],
    professionalExperiences: ["Backend Developer at DataSolutions"],
    profilePhotoIds: ["photo4"],
    prompts: [
      { question: "What is your biggest achievement?", answer: "Led a successful project." },
      { question: "How do you handle stress?", answer: "I prioritize and stay organized." },
    ],
  },
  {
    id: "4",
    name: "Diana Prince",
    location: "Seattle, WA",
    yearsOfExperience: 6,
    educationalExperiences: ["BSc Computer Science", "MSc Data Science"],
    professionalExperiences: ["Data Analyst at InfoTech"],
    profilePhotoIds: ["photo5"],
    prompts: [
      { question: "What are your career goals?", answer: "To become a data scientist." },
      {
        question: "How do you work in a team?",
        answer: "I communicate openly and support my teammates.",
      },
    ],
  },
  {
    id: "5",
    name: "Ethan Hunt",
    location: "Los Angeles, CA",
    yearsOfExperience: 2,
    educationalExperiences: ["BSc Web Development"],
    professionalExperiences: ["Intern at WebCreators"],
    profilePhotoIds: ["photo6"],
    prompts: [
      { question: "What do you enjoy about coding?", answer: "The creativity it allows." },
      { question: "What is your preferred programming language?", answer: "JavaScript." },
    ],
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    location: "Chicago, IL",
    yearsOfExperience: 7,
    educationalExperiences: ["BSc Information Systems"],
    professionalExperiences: ["Project Manager at TechSolutions"],
    profilePhotoIds: ["photo7"],
    prompts: [
      { question: "How do you manage projects?", answer: "I use Agile methodologies." },
      { question: "What is your leadership style?", answer: "I lead by example." },
    ],
  },
  {
    id: "7",
    name: "George Smith",
    location: "Miami, FL",
    yearsOfExperience: 1,
    educationalExperiences: ["BSc Computer Science"],
    professionalExperiences: ["Junior Developer at CodeBase"],
    profilePhotoIds: ["photo8"],
    prompts: [
      { question: "What are your strengths?", answer: "Quick learner and adaptable." },
      { question: "Why did you choose this career?", answer: "I love technology." },
    ],
  },
  {
    id: "8",
    name: "Hannah Baker",
    location: "Boston, MA",
    yearsOfExperience: 5,
    educationalExperiences: ["BSc Graphic Design"],
    professionalExperiences: ["UI/UX Designer at CreativeWorks"],
    profilePhotoIds: ["photo9"],
    prompts: [
      { question: "What inspires your designs?", answer: "User experience and feedback." },
      {
        question: "How do you stay updated with design trends?",
        answer: "I follow industry leaders and blogs.",
      },
    ],
  },
  {
    id: "9",
    name: "Ian Malcolm",
    location: "Orlando, FL",
    yearsOfExperience: 8,
    educationalExperiences: ["BSc Computer Science", "MSc Cybersecurity"],
    professionalExperiences: ["Security Analyst at SecureTech"],
    profilePhotoIds: ["photo10"],
    prompts: [
      {
        question: "What is your approach to cybersecurity?",
        answer: "Proactive and preventive measures.",
      },
      {
        question: "What challenges do you face in your role?",
        answer: "Keeping up with evolving threats.",
      },
    ],
  },
  {
    id: "10",
    name: "Jack Sparrow",
    location: "Port Royal, Jamaica",
    yearsOfExperience: 5,
    educationalExperiences: ["BSc Nautical Science"],
    professionalExperiences: ["Captain at The Black Pearl"],
    profilePhotoIds: ["photo11"],
    prompts: [
      {
        question: "What is your leadership philosophy?",
        answer: "To inspire loyalty and courage.",
      },
      {
        question: "How do you handle unexpected challenges?",
        answer: "With creativity and a bit of luck.",
      },
    ],
  },
];
