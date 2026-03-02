import { useState } from "react";
import LecturePage from "./pages/LecturePage";

const demoLessons = [
  {
    _id: "l1",
    order: 1,
    title: "Empathy as an Instructional Skill",
    lessonDescription:
      "This lesson introduces empathy as an instructional skill that supports effective classroom management.",
    sections: [
      {
        heading: "What Empathy Means in Teaching",
        content: [
          "Empathy means understanding learners’ experiences and responding intentionally to support learning.",
          "Empathy helps instructors stay calm and choose responses that keep learning moving forward.",
        ],
      },
    ],
    keyTakeaways: [
      "Empathy is a practical instructional skill",
      "Empathy and clear expectations work best together",
    ],
  },
  {
    _id: "l4",
    order: 4,
    title: "Empathy-Based Communication in the Classroom",
    lessonDescription:
      "This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority.",
    sections: [
      {
        heading: "Language Shapes Classroom Climate",
        content: [
          "Words influence classroom tone.",
          "Empathy-based communication includes neutral language, clear expectations, calm tone, and concise explanations.",
          "Communication should reduce defensiveness, not increase it.",
        ],
      },
      {
        heading: "Tone and Framing",
        content: [
          "Instead of “You’re not paying attention.” try “Let’s refocus on the main idea.”",
          "Language shifts can prevent conflict.",
        ],
      },
    ],
    keyTakeaways: [
      "Tone matters as much as content",
      "Neutral phrasing reduces defensiveness",
      "Clear communication supports classroom management",
    ],
  },
];

export default function App() {
  const [lessons] = useState(demoLessons);
  const [activeLessonId, setActiveLessonId] = useState(demoLessons[0]?._id);

  return (
    <LecturePage
      lessons={lessons}
      activeLessonId={activeLessonId}
      onSelectLesson={setActiveLessonId}
      onExit={() => console.log("Exit lecture")}
      onTakeQuiz={(lessonId) => console.log("Take quiz for:", lessonId)}
    />
  );
}