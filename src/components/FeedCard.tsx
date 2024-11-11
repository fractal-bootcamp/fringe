import { Applicant, Company, Prompt } from '@/types/types'

interface FeedCardProps {
  item: Applicant | Company;
  type: 'client' | 'company';
}

export default function FeedCard({ item, type }: FeedCardProps) {
  if (type === 'client') {
    const applicant = item as Applicant;
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          {applicant.profilePhotoIds?.[0] && (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0">
              {/* Add Image component here if you have photo URLs */}
            </div>
          )}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-bold">{applicant.name}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Location:</span> {applicant.location}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Experience:</span> {applicant.yearsOfExperience} years
            </p>
            
            {applicant.educationalExperiences && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Education:</h3>
                <p className="text-gray-600">{applicant.educationalExperiences}</p>
              </div>
            )}
            
            {applicant.professionalExperiences && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Professional Experience:</h3>
                <p className="text-gray-600">{applicant.professionalExperiences}</p>
              </div>
            )}

            {applicant.prompts && applicant.prompts.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Prompts:</h3>
                <div className="space-y-2">
                  {applicant.prompts.map((prompt: Prompt, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">{prompt.question}</p>
                      <p className="text-sm text-gray-600">{prompt.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const company = item as Company;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {company.profilePhotoIds?.[0] && (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0">
            {/* Add Image component here if you have photo URLs */}
          </div>
        )}
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold mb-2">{company.name}</h2>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {company.location}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Industry:</span> <span className="capitalize">{company.industry}</span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Team Size:</span> {company.employeeCount} employees
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Operating for:</span> {company.yearsOfOperation} years
          </p>
        </div>
      </div>
    </div>
  );
} 