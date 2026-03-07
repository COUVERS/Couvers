// seed.js
// Run:
//   MONGO_URI="..." DB_NAME="tete" node seed.js
//
// Notes:
// - This script seeds 1 course + Lessons 1~5 + Quizzes 1~5 (each quiz has 5 items).
// - Requires: npm i mongodb
// - If your project is NOT ESM, either set package.json {"type":"module"} or convert imports to require().

import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "tete";

if (!MONGO_URI) {
  console.error("Missing MONGO_URI env");
  process.exit(1);
}

const now = new Date("2026-02-26T00:00:00.000Z");

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  const courses = db.collection("courses");
  const lessons = db.collection("lessons");
  const quizzes = db.collection("quizzes");

  // Optional: clear previous seeded data by title (safe-ish)
  await courses.deleteMany({ title: "Empathy and Classroom Management" });

  // IDs
  const courseId = new ObjectId();

  const lesson1Id = new ObjectId();
  const lesson2Id = new ObjectId();
  const lesson3Id = new ObjectId();
  const lesson4Id = new ObjectId();
  const lesson5Id = new ObjectId();

  const quiz1Id = new ObjectId();
  const quiz2Id = new ObjectId();
  const quiz3Id = new ObjectId();
  const quiz4Id = new ObjectId();
  const quiz5Id = new ObjectId();

  // 1) Course
  await courses.insertOne({
    _id: courseId,
    projectName: "TeTe",
    teamName: "Couvers",
    title: "Empathy and Classroom Management",
    description:
      "Empathy and classroom management course for new instructors (industry specialists).",
    contentsOutline: [
      "Empathy as an Instructional Skill",
      "Understanding Learner Behavior",
      "Managing Your Reactions as an Instructor",
      "Empathy-Based Communication in the Classroom",
      "Responding to Challenging Classroom Situations",
    ],
    skillMapping: [
      { question: "Q1", skill: "StudentEngagement" },
      { question: "Q2", skill: "ExplanationClarity" },
      { question: "Q3", skill: "Pacing" },
      { question: "Q4", skill: "LessonStructure" },
      { question: "Q5", skill: "Assessment" },
    ],
    createdAt: now,
  });

  // 2) Lessons 1~5
  await lessons.insertMany([
    {
      _id: lesson1Id,
      courseId,
      order: 1,
      title: "Empathy as an Instructional Skill",
      lessonDescription:
        "This lesson introduces empathy as an instructional skill that supports effective classroom management, especially for instructors who know their subject but feel unsure about handling classroom dynamics.",
      sections: [
        {
          heading: "What Empathy Means in Teaching",
          content: [
            "In an instructional context, empathy means understanding learners’ experiences and responding intentionally to support learning.",
            "Empathy in teaching is not: being overly lenient, removing expectations, avoiding difficult situations.",
            "Empathy is: recognizing confusion, frustration, or anxiety; staying calm and professional; choosing responses that keep learning moving forward.",
            "When learners feel understood, they are more likely to stay engaged, cooperative, and open to instruction.",
          ],
        },
        {
          heading: "Why Empathy Matters for Classroom Management",
          content: [
            "Classroom management is not about control—it’s about creating conditions where learning can happen.",
            "When empathy is missing, small issues can quickly turn into tension or resistance. When empathy is present, instructors can address challenges early and calmly.",
            "Empathy helps instructors reduce tension, build trust, and address issues before they escalate.",
            "In real classrooms, instructors often see mixed reactions at the same time. Effective instructors pause, observe, and respond with intention rather than reacting emotionally in the moment.",
          ],
        },
        {
          heading: "Empathy Is a Skill You Can Practice",
          content: [
            "Empathy is not something you either have or don’t have—it’s a skill that improves with practice.",
            "Instructors can develop empathy by paying close attention to learner behavior and reactions, reflecting briefly before responding, and balancing understanding with clear expectations.",
            "Empathy does not weaken authority. Strong classroom management combines empathy and structure, not one without the other.",
          ],
        },
      ],
      keyTakeaways: [
        "Empathy is a practical instructional skill, not a personality trait",
        "Understanding learner behavior supports classroom management",
        "Empathy and clear expectations work best together",
      ],
      createdAt: now,
    },
    {
      _id: lesson2Id,
      courseId,
      order: 2,
      title: "Understanding Learner Behavior",
      lessonDescription:
        "This lesson helps instructors recognize common learner behaviors and understand what may be happening beneath the surface. It focuses on reading confusion, disengagement, and resistance without making quick assumptions.",
      sections: [
        {
          heading: "What Learner Behavior Really Means",
          content: [
            "Learner behavior is often misinterpreted, especially by new instructors.",
            "In teaching, behavior is usually a signal, not a personal response to the instructor.",
            "Common behaviors include silence, lack of participation, visible frustration, and challenging comments.",
            "These behaviors do not automatically mean learners are uninterested or disrespectful. Understanding learner behavior helps instructors respond more accurately and professionally.",
          ],
        },
        {
          heading: "Quiet and Disengaged Learners",
          content: [
            "Quiet behavior is one of the most commonly misunderstood signals in the classroom.",
            "A quiet learner may be processing new information, unsure if they understand, anxious about speaking, or overwhelmed by the pace.",
            "Silence does not always indicate a lack of interest.",
            "Effective instructors avoid assuming intent and instead observe patterns over time before responding.",
          ],
        },
        {
          heading: "Frustrated and Challenging Reactions",
          content: [
            "Frustration often appears as sharp comments, visible irritation, or resistance to instructions.",
            "These reactions are frequently linked to confusion, feeling left behind, or unclear expectations.",
            "Rather than reacting defensively, instructors who understand learner behavior pause and ask: “What might be causing this response?”",
            "This shift helps prevent unnecessary conflict.",
          ],
        },
        {
          heading: "Surface Behavior vs. Underlying Needs",
          content: [
            "What instructors see is surface behavior; what learners experience internally may be very different.",
            "Disengagement may signal confusion; resistance may signal frustration; silence may signal uncertainty.",
            "Understanding this difference allows instructors to respond with clarity, not emotion.",
            "Strong classroom management starts with accurate interpretation.",
          ],
        },
      ],
      keyTakeaways: [
        "Learner behavior is often a signal, not a personal challenge",
        "Quiet or disengaged behavior does not always mean disinterest",
        "Understanding underlying needs supports better instructional responses",
      ],
      createdAt: now,
    },
    {
      _id: lesson3Id,
      courseId,
      order: 3,
      title: "Managing Your Reactions as an Instructor",
      lessonDescription:
        "This lesson helps instructors recognize emotional triggers in the classroom and respond professionally rather than react impulsively. It focuses on maintaining composure, authority, and clarity during challenging moments.",
      sections: [
        {
          heading: "Why Instructor Reactions Matter",
          content: [
            "Learners do not only respond to content—they respond to the instructor’s tone, posture, and emotional control.",
            "Instructors may experience frustration, defensiveness, embarrassment, or pressure to “regain control.”",
            "Reacting emotionally can escalate situations.",
            "Responding intentionally supports professionalism and stability.",
          ],
        },
        {
          heading: "Common Emotional Triggers",
          content: [
            "New instructors often feel triggered when learners challenge instructions, silence follows a question, participation is low, or a learner appears disengaged.",
            "These moments are normal.",
            "Professional instructors recognize the trigger internally but choose a measured response externally.",
          ],
        },
        {
          heading: "Pause, Process, Respond",
          content: [
            "A simple framework: Notice your reaction → Pause briefly → Respond with clarity and purpose.",
            "This prevents defensive language and preserves authority.",
            "Strong classroom management depends on emotional regulation.",
          ],
        },
        {
          heading: "Professional Presence",
          content: [
            "Professional presence includes a steady tone, controlled pacing, neutral body language, and clear expectations.",
            "When instructors remain calm, learners are more likely to stabilize as well.",
          ],
        },
      ],
      keyTakeaways: [
        "Emotional triggers are normal in teaching",
        "Pausing prevents escalation",
        "Professional presence strengthens classroom management",
      ],
      createdAt: now,
    },
    {
      _id: lesson4Id,
      courseId,
      order: 4,
      title: "Empathy-Based Communication in the Classroom",
      lessonDescription:
        "This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority. It explores how instructors can respond clearly and professionally in everyday classroom interactions.",
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
        {
          heading: "Clarity Without Over-Explaining",
          content: [
            "Empathy does not mean long explanations.",
            "It means clear instructions, simple phrasing, and respectful redirection.",
            "Authority remains intact.",
          ],
        },
        {
          heading: "Balancing Support and Expectations",
          content: [
            "Empathy-based communication acknowledges concerns, reinforces standards, and keeps learning moving forward.",
            "This balance builds trust.",
          ],
        },
      ],
      keyTakeaways: [
        "Tone matters as much as content",
        "Neutral phrasing reduces defensiveness",
        "Clear communication supports classroom management",
      ],
      createdAt: now,
    },
    {
      _id: lesson5Id,
      courseId,
      order: 5,
      title: "Responding to Challenging Classroom Situations",
      lessonDescription:
        "This lesson focuses on how instructors can respond professionally to challenging classroom situations. It emphasizes maintaining authority, clarity, and empathy during difficult interactions.",
      sections: [
        {
          heading: "Challenging Situations Are Normal",
          content: [
            "In every classroom, instructors may encounter disruptive comments, repeated disengagement, resistance to activities, and emotional reactions.",
            "Challenging moments do not mean failure—they are part of instructional practice.",
            "Effective instructors prepare to respond calmly rather than react emotionally.",
          ],
        },
        {
          heading: "Stay Calm and Maintain Authority",
          content: [
            "When a challenging moment occurs: keep your tone steady, avoid public embarrassment, and focus on the learning objective.",
            "Authority does not require aggression. It requires clarity and consistency.",
          ],
        },
        {
          heading: "Address the Behavior, Not the Person",
          content: [
            "Instead of labeling the learner, focus on the behavior.",
            "Instead of “You are being disrespectful.” try “Let’s keep our comments focused on the task.”",
            "This maintains professionalism and reduces defensiveness.",
          ],
        },
        {
          heading: "Redirect and Refocus",
          content: [
            "A practical framework: Acknowledge briefly → Reinforce expectations → Redirect to learning.",
            "Example: “I understand there’s some frustration. Let’s return to the main objective.”",
            "Redirection prevents escalation.",
          ],
        },
        {
          heading: "Preventing Escalation",
          content: [
            "Escalation often happens when instructors respond emotionally, expectations are unclear, or frustration is ignored.",
            "Professional responses combine empathy with structure.",
            "Strong classroom management is demonstrated most clearly in difficult moments.",
          ],
        },
      ],
      keyTakeaways: [
        "Challenging situations are normal in teaching",
        "Calm authority prevents escalation",
        "Address behavior, not personality",
        "Redirect learning with clarity",
      ],
      createdAt: now,
    },
  ]);

  // 3) Quizzes 1~5 (each: 5 items)
  await quizzes.insertMany([
    {
      _id: quiz1Id,
      courseId,
      lessonId: lesson1Id,
      items: [
        {
          order: 1,
          skill: "StudentEngagement",
          scenario:
            "While teaching, you notice several learners looking confused and disengaged.",
          question:
            "What action best supports student engagement in this moment?",
          choices: [
            "Continue teaching to avoid slowing down the lesson.",
            "Pause and acknowledge the confusion before clarifying the key idea.",
            "Ignore disengaged learners and focus on active students.",
            "Move to the next topic to regain energy.",
          ],
          correctIndex: 1,
          review:
            "Engagement increases when learners feel understood. Acknowledging confusion helps rebuild attention and connection.",
        },
        {
          order: 2,
          skill: "ExplanationClarity",
          scenario:
            "After explaining a concept, a learner reacts with visible frustration.",
          question:
            "Which empathy-based response improves explanation clarity?",
          choices: [
            "Repeat the same explanation louder.",
            "Restate the key idea using simpler language.",
            "Tell the learner to review the textbook.",
            "Ignore the reaction and continue.",
          ],
          correctIndex: 1,
          review:
            "Empathy helps instructors adjust explanations. Clarifying and simplifying improves understanding.",
        },
        {
          order: 3,
          skill: "Pacing",
          scenario: "You ask a question, and the room becomes silent.",
          question: "What action best supports appropriate pacing?",
          choices: [
            "Immediately call on a learner.",
            "Move on to avoid awkward silence.",
            "Pause briefly to allow processing time.",
            "Express frustration to encourage faster responses.",
          ],
          correctIndex: 2,
          review:
            "Silence often means learners are thinking. Adjusting pacing supports comprehension and reduces pressure.",
        },
        {
          order: 4,
          skill: "LessonStructure",
          scenario: "A learner challenges your instruction during an activity.",
          question: "What response maintains structure while showing empathy?",
          choices: [
            "Ignore the comment and continue.",
            "React defensively to reassert authority.",
            "Acknowledge the concern and restate the learning objective clearly.",
            "Cancel the activity.",
          ],
          correctIndex: 2,
          review:
            "Strong lesson structure balances empathy with clear goals and expectations.",
        },
        {
          order: 5,
          skill: "Assessment",
          scenario:
            "Several learners appear unsure after completing an activity.",
          question:
            "What empathy-informed action supports effective assessment?",
          choices: [
            "Assume they understood since no one asked questions.",
            "Move forward because time is limited.",
            "Briefly check understanding with a clarifying question.",
            "Assign homework without discussion.",
          ],
          correctIndex: 2,
          review:
            "Empathy encourages instructors to verify understanding rather than assume it.",
        },
      ],
      createdAt: now,
    },
    {
      _id: quiz2Id,
      courseId,
      lessonId: lesson2Id,
      items: [
        {
          order: 1,
          skill: "StudentEngagement",
          scenario:
            "During a discussion, several learners stop participating and avoid eye contact.",
          question: "What is the most appropriate first interpretation?",
          choices: [
            "The learners are bored.",
            "The learners are being disrespectful.",
            "The learners may be confused or unsure.",
            "The learners do not value the topic.",
          ],
          correctIndex: 2,
          review:
            "Learner disengagement often signals confusion or uncertainty. Accurate interpretation supports stronger engagement.",
        },
        {
          order: 2,
          skill: "ExplanationClarity",
          scenario:
            "After explaining instructions, one learner responds with visible frustration.",
          question: "What is the most productive next step?",
          choices: [
            "Repeat the same instructions quickly.",
            "Clarify expectations and check for understanding.",
            "Tell the learner to review the syllabus.",
            "Ignore the frustration.",
          ],
          correctIndex: 1,
          review:
            "Frustration often reflects unclear instructions. Improving clarity strengthens learning.",
        },
        {
          order: 3,
          skill: "Pacing",
          scenario:
            "You notice learners becoming increasingly quiet during a fast-paced explanation.",
          question: "What should guide your response?",
          choices: [
            "Continue to maintain momentum.",
            "Slow down and check comprehension.",
            "Assign independent work immediately.",
            "Call on someone to answer quickly.",
          ],
          correctIndex: 1,
          review:
            "Changes in participation may signal pacing issues. Adjusting speed supports understanding.",
        },
        {
          order: 4,
          skill: "LessonStructure",
          scenario:
            "A learner challenges the purpose of an activity and questions why it matters.",
          question: "How should you interpret this behavior?",
          choices: [
            "As resistance to authority.",
            "As possible uncertainty about the lesson objective.",
            "As intentional disruption.",
            "As disrespect.",
          ],
          correctIndex: 1,
          review:
            "Questions about purpose often signal unclear structure. Reinforcing objectives strengthens lesson flow.",
        },
        {
          order: 5,
          skill: "Assessment",
          scenario:
            "After an activity, several learners remain silent when asked if they understood.",
          question: "What is the most effective action?",
          choices: [
            "Assume understanding since no one asked questions.",
            "Move forward due to time limits.",
            "Ask a brief checking-for-understanding question.",
            "End the lesson early.",
          ],
          correctIndex: 2,
          review:
            "Surface behavior may hide uncertainty. Quick formative assessment prevents misunderstandings.",
        },
      ],
      createdAt: now,
    },
    {
      _id: quiz3Id,
      courseId,
      lessonId: lesson3Id,
      items: [
        {
          order: 1,
          skill: "StudentEngagement",
          scenario: "A learner challenges your explanation with a sharp tone.",
          question: "What response best maintains engagement?",
          choices: [
            "Respond defensively to assert authority.",
            "Ignore the comment.",
            "Acknowledge the concern calmly and continue constructively.",
            "End the discussion immediately.",
          ],
          correctIndex: 2,
          review:
            "Calm responses maintain engagement and prevent defensive escalation.",
        },
        {
          order: 2,
          skill: "ExplanationClarity",
          scenario:
            "You feel frustrated after learners repeatedly misunderstand instructions.",
          question: "What is the most professional response?",
          choices: [
            "Repeat instructions louder.",
            "Clarify and rephrase calmly.",
            "Express frustration to encourage attention.",
            "Move on to save time.",
          ],
          correctIndex: 1,
          review:
            "Clear, calm clarification improves comprehension and authority.",
        },
        {
          order: 3,
          skill: "Pacing",
          scenario:
            "After asking a question, the room is silent and you feel uncomfortable.",
          question: "What supports effective pacing?",
          choices: [
            "Immediately call on someone.",
            "Pause and allow thinking time.",
            "Move on quickly.",
            "Express impatience.",
          ],
          correctIndex: 1,
          review:
            "Thoughtful pacing reduces pressure and supports processing.",
        },
        {
          order: 4,
          skill: "LessonStructure",
          scenario:
            "You feel irritated when a learner questions the purpose of an activity.",
          question: "What should guide your response?",
          choices: [
            "React emotionally.",
            "Restate the learning objective clearly.",
            "Cancel the activity.",
            "Ignore the learner.",
          ],
          correctIndex: 1,
          review:
            "Re-centering on objectives maintains structure and professionalism.",
        },
        {
          order: 5,
          skill: "Assessment",
          scenario: "You sense tension after a difficult exchange.",
          question: "What should you do next?",
          choices: [
            "Continue without addressing it.",
            "Briefly check understanding to refocus the class.",
            "End the lesson early.",
            "Discipline the learner.",
          ],
          correctIndex: 1,
          review:
            "Quick checks restore learning focus after emotional moments.",
        },
      ],
      createdAt: now,
    },
    {
      _id: quiz4Id,
      courseId,
      lessonId: lesson4Id,
      items: [
        {
          order: 1,
          skill: "StudentEngagement",
          scenario: "A learner seems distracted during instruction.",
          question: "Which response best maintains engagement?",
          choices: [
            "“Why are you not paying attention?”",
            "“Let’s focus on this part together.”",
            "Ignore the behavior.",
            "Publicly criticize the learner.",
          ],
          correctIndex: 1,
          review:
            "Neutral phrasing supports engagement without embarrassment.",
        },
        {
          order: 2,
          skill: "ExplanationClarity",
          scenario: "Learners look confused after instructions.",
          question: "What communication approach helps most?",
          choices: [
            "Repeat the same wording.",
            "Simplify and clarify expectations.",
            "Move on quickly.",
            "Blame learners for not listening.",
          ],
          correctIndex: 1,
          review: "Clear and simple language improves comprehension.",
        },
        {
          order: 3,
          skill: "Pacing",
          scenario:
            "A learner asks for clarification while you are mid-explanation.",
          question: "What is the best response?",
          choices: [
            "Ignore and continue.",
            "Pause briefly and clarify.",
            "Tell them to ask later.",
            "Show irritation.",
          ],
          correctIndex: 1,
          review: "Adjusting communication pacing supports understanding.",
        },
        {
          order: 4,
          skill: "LessonStructure",
          scenario: "A discussion begins drifting off-topic.",
          question: "What communication maintains structure?",
          choices: [
            "“This is off-topic. Stop.”",
            "“Let’s connect this back to today’s objective.”",
            "Ignore it.",
            "Cancel discussion.",
          ],
          correctIndex: 1,
          review:
            "Linking comments to objectives preserves structure respectfully.",
        },
        {
          order: 5,
          skill: "Assessment",
          scenario: "You are unsure if learners understand instructions.",
          question: "What should you say?",
          choices: [
            "“You should understand this.”",
            "“Does this make sense?” (and move on quickly)",
            "“Can someone summarize the next step?”",
            "Skip checking.",
          ],
          correctIndex: 2,
          review:
            "Active checking confirms understanding more effectively.",
        },
      ],
      createdAt: now,
    },
    {
      _id: quiz5Id,
      courseId,
      lessonId: lesson5Id,
      items: [
        {
          order: 1,
          skill: "StudentEngagement",
          scenario:
            "During group work, one learner begins making sarcastic comments that distract others.",
          question: "What response best protects student engagement?",
          choices: [
            "Publicly criticize the learner.",
            "Ignore the behavior completely.",
            "Calmly redirect the learner to the task.",
            "End the activity early.",
          ],
          correctIndex: 2,
          review:
            "Calm redirection protects engagement without escalating tension.",
        },
        {
          order: 2,
          skill: "ExplanationClarity",
          scenario: "A learner challenges the purpose of an assignment.",
          question: "What is the most effective response?",
          choices: [
            "“Because I said so.”",
            "Restate the learning objective clearly.",
            "Ignore the question.",
            "Cancel the assignment.",
          ],
          correctIndex: 1,
          review:
            "Clarifying purpose strengthens understanding and reduces resistance.",
        },
        {
          order: 3,
          skill: "Pacing",
          scenario: "A tense exchange slows down the lesson significantly.",
          question: "What should you do next?",
          choices: [
            "Continue arguing to prove your point.",
            "Pause briefly and calmly transition back to content.",
            "End class immediately.",
            "Assign extra work as a consequence.",
          ],
          correctIndex: 1,
          review: "Resetting calmly restores instructional pacing.",
        },
        {
          order: 4,
          skill: "LessonStructure",
          scenario:
            "A learner repeatedly interrupts the lesson with unrelated comments.",
          question: "What response maintains structure?",
          choices: [
            "“Stop interrupting.”",
            "Ignore the learner completely.",
            "Acknowledge briefly and refocus on the lesson objective.",
            "End discussion permanently.",
          ],
          correctIndex: 2,
          review:
            "Linking responses back to objectives preserves lesson structure.",
        },
        {
          order: 5,
          skill: "Assessment",
          scenario:
            "After a difficult interaction, you are unsure whether learners are still focused.",
          question: "What should you do?",
          choices: [
            "Continue without checking.",
            "Briefly confirm understanding with a quick question.",
            "Ignore the situation.",
            "End the activity early.",
          ],
          correctIndex: 1,
          review:
            "Quick checks help restore learning focus after disruption.",
        },
      ],
      createdAt: now,
    },
  ]);

  console.log("✅ Seed complete:", {
    courseId: courseId.toHexString(),
    lessons: {
      lesson1Id: lesson1Id.toHexString(),
      lesson2Id: lesson2Id.toHexString(),
      lesson3Id: lesson3Id.toHexString(),
      lesson4Id: lesson4Id.toHexString(),
      lesson5Id: lesson5Id.toHexString(),
    },
    quizzes: {
      quiz1Id: quiz1Id.toHexString(),
      quiz2Id: quiz2Id.toHexString(),
      quiz3Id: quiz3Id.toHexString(),
      quiz4Id: quiz4Id.toHexString(),
      quiz5Id: quiz5Id.toHexString(),
    },
  });

  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});