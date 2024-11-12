import React, { useState } from "react";
import { Match, User } from "@/types/types";

interface ChatPageProps {
  match: Match;
}

const ChatPage = ({ match }: ChatPageProps) => {
  // const { profileId } = useParams();
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState<Message[]>(match.messages);
  const [matchedProfile, setMatchedProfile] = useState<User>(match.users[0]);
  // const { userType } = userTypeStore();
  // const [scheduleDate, setScheduleDate] = useState("");
  // const [scheduleTime, setScheduleTime] = useState("");
  // const [scheduledCall, setScheduledCall] = useState<Date | null>(null);
  // const [meetLink, setMeetLink] = useState<string>("");

  // const matchedProfile =
  //   userType === "applicant"
  //     ? dummyCompanies.find((c) => c.id === profileId)
  //     : dummyApplicants.find((a) => a.id === profileId);

  // const likedSections = matchedProfile
  //   ? [
  //       { section: "About", content: matchedProfile.prompts[0].answer },
  //       { section: "Location", content: matchedProfile.location },
  //       ...(userType === "applicant"
  //         ? [
  //             {
  //               section: "Industry",
  //               content: (matchedProfile as (typeof dummyCompanies)[0]).industry,
  //             },
  //           ]
  //         : [
  //             {
  //               section: "Experience",
  //               content: (matchedProfile as (typeof dummyApplicants)[0]).professionalExperiences[0],
  //             },
  //           ]),
  //     ]
  //   : [];

  // const handleSend = () => {
  //   if (!message.trim()) return;

  //   // Add new message to messages array
  //   setMessages([
  //     ...messages,
  //   ]);

  //   setMessage("");
  // };

  // const handleScheduleCall = () => {
  //   if (!scheduleDate || !scheduleTime) {
  //     alert("Please select both date and time");
  //     return;
  //   }
  //   const dateTime = new Date(`${scheduleDate}T${scheduleTime}`);
  //   setScheduledCall(dateTime);

  //   // Add system message about scheduled call
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       content: `Call scheduled for ${dateTime.toLocaleString()}`,
  //       sender: "system",
  //       timestamp: new Date(),
  //     },
  //   ]);
  // };

  // const generateTimeOptions = () => {
  //   const options = [];
  //   for (let hour = 0; hour <= 23; hour++) {
  //     for (let minute of ["00", "15", "30", "45"]) {
  //       const time = `${hour.toString().padStart(2, "0")}:${minute}`;
  //       options.push(time);
  //     }
  //   }
  //   return options;
  // };

  // useEffect(() => {
  //   const checkScheduledCall = () => {
  //     if (!scheduledCall) return;

  //     const now = new Date();
  //     const callTime = new Date(scheduledCall);

  //     // Show announcement 5 minutes before call AND at call time
  //     const timeDiff = callTime.getTime() - now.getTime();
  //     if (timeDiff <= 5 * 60 * 1000 && timeDiff > 0 && !meetLink) {
  //       // Generate meet link if not already generated
  //       const link = `https://meet.google.com/${Math.random().toString(36).substring(2, 10)}`;
  //       setMeetLink(link);

  //       // Add system message about the upcoming call
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           content: `Your call starts in ${Math.ceil(timeDiff / 60000)} minutes! Join here: `,
  //           sender: "system",
  //           timestamp: new Date(),
  //         },
  //       ]);
  //     } else if (timeDiff <= 0 && timeDiff > -60000) {
  //       // Within first minute of call time
  //       // Add system message that call is starting now
  //       setMessages((prev) => {
  //         // Avoid duplicate messages
  //         if (prev.some((msg) => msg.content.includes("starting now"))) return prev;
  //         return [
  //           ...prev,
  //           {
  //             content: `Your call is starting now! Join here: `,
  //             sender: "system",
  //             timestamp: new Date(),
  //           },
  //         ];
  //       });
  //     }
  //   };

  //   const interval = setInterval(checkScheduledCall, 10000); // Check every 10 seconds
  //   return () => clearInterval(interval);
  // }, [scheduledCall, meetLink]);

  // if (!matchedProfile) {
  //   return <div className="p-4">Profile not found</div>;
  // }

  if (!match) {
    return <div className="p-4">Match not found</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg text-gray-600">{matchedProfile.name[0]}</span>
          </div>
          <h1 className="font-semibold">{matchedProfile.name}</h1>
        </div>
        {/* Schedule call */}
        <div className="flex items-center space-x-2">
          {/* date picker */}
          {/* <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          /> */}
          {/* time picker */}
          {/* <select
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="">Select time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))} */}
          {/* </select> */}
          {/* schedule call button */}
          {/* <button
            onClick={handleScheduleCall}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Schedule Call
          </button> */}
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {/* Match announcement */}
        <div className="text-center text-sm text-gray-500 mb-6">
          You matched with {matchedProfile.name}!
        </div>

        {/* Liked sections as messages */}
        {/* <div className="space-y-4">
          {likedSections.map((like, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="bg-pink-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-xs text-pink-800 font-medium mb-1">
                  Liked your {like.section.toLowerCase()}
                </p>
                <p className="text-sm text-gray-800">{like.content}</p>
              </div>
              {index === likedSections.length - 1 && (
                <div className="mt-4 text-sm text-gray-500 italic px-2">
                  Start a conversation about what they liked!
                </div>
              )}
            </div>
          ))}
        </div> */}

        {/* User messages */}
        {/* <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              > */}
        {/* join link if it's a system message about the call */}
        {/* {msg.content.includes("Join here:") ? (
                  <p className="text-sm">
                    {msg.content.split("Join here:")[0]}
                    Join here:{" "}
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {meetLink}
                    </a>
                  </p>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Chat input */}
      <div className="fixed bottom-[56px] left-0 right-0 border-t bg-white">
        <div className="p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
              placeholder="Type a message..."
              // onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              // onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
