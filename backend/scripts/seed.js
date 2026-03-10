import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "tete";

if (!MONGO_URI) {
  console.error("Missing MONGO_URI env");
  process.exit(1);
}

async function run() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const skills = db.collection("skills");
    const courses = db.collection("courses");
    const lessons = db.collection("lessons");
    const quizzes = db.collection("quizzes");

    // Delete previous seed data
    await quizzes.deleteMany({});
    await lessons.deleteMany({});
    await courses.deleteMany({ title: "Empathy and Classroom Management" });
    await skills.deleteMany({
      name: {
        $in: [
          "Lesson Structure",
          "Explanation Clarity",
          "Assessment",
          "Pacing",
          "Student Engagement",
        ],
      },
    });

    // IDs
    const courseId = new ObjectId();

    const lessonStructureSkillId = new ObjectId();
    const explanationClaritySkillId = new ObjectId();
    const assessmentSkillId = new ObjectId();
    const pacingSkillId = new ObjectId();
    const studentEngagementSkillId = new ObjectId();

    const lesson1Id = new ObjectId();
    const lesson2Id = new ObjectId();
    const lesson3Id = new ObjectId();
    const lesson4Id = new ObjectId();
    const lesson5Id = new ObjectId();

    // 1) Skills
    await skills.insertMany([
      {
        _id: lessonStructureSkillId,
        name: "Lesson Structure",
        description: "Ability to organize lessons clearly and logically.",
      },
      {
        _id: explanationClaritySkillId,
        name: "Explanation Clarity",
        description: "Ability to explain ideas and instructions clearly.",
      },
      {
        _id: assessmentSkillId,
        name: "Assessment",
        description: "Ability to check and evaluate learner understanding.",
      },
      {
        _id: pacingSkillId,
        name: "Pacing",
        description: "Ability to manage lesson timing and flow effectively.",
      },
      {
        _id: studentEngagementSkillId,
        name: "Student Engagement",
        description: "Ability to maintain learner attention and participation.",
      },
    ]);

    // 2) Course
    await courses.insertOne({
      _id: courseId,
      title: "Empathy and Classroom Management",
      description:
        "Empathy and classroom management course for new instructors (industry specialists).",
    });

    // 3) Lessons
    await lessons.insertMany([
      {
        _id: lesson1Id,
        courseId,
        skillId: studentEngagementSkillId,
        title: "Empathy as an Instructional Skill",
        content:
          "This lesson introduces empathy as an instructional skill that supports effective classroom management, especially for instructors who know their subject but feel unsure about handling classroom dynamics. In an instructional context, empathy means understanding learners' experiences and responding intentionally to support learning. When learners feel understood, they are more likely to stay engaged, cooperative, and open to instruction.",
      },
      {
        _id: lesson2Id,
        courseId,
        skillId: explanationClaritySkillId,
        title: "Understanding Learner Behavior",
        content:
          "This lesson helps instructors recognize common learner behaviors and understand what may be happening beneath the surface. It focuses on reading confusion, disengagement, and resistance without making quick assumptions. Learner behavior is often a signal, not a personal challenge. Understanding underlying needs helps instructors respond more accurately and professionally.",
      },
      {
        _id: lesson3Id,
        courseId,
        skillId: pacingSkillId,
        title: "Managing Your Reactions as an Instructor",
        content:
          "This lesson helps instructors recognize emotional triggers in the classroom and respond professionally rather than react impulsively. It focuses on maintaining composure, authority, and clarity during challenging moments. Pausing, processing, and responding intentionally supports professionalism and helps maintain appropriate pacing in the learning environment.",
      },
      {
        _id: lesson4Id,
        courseId,
        skillId: lessonStructureSkillId,
        title: "Empathy-Based Communication in the Classroom",
        content:
          "This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority. It explores how instructors can respond clearly and professionally in everyday classroom interactions. Clear communication and strong framing help maintain lesson structure while reducing defensiveness.",
      },
      {
        _id: lesson5Id,
        courseId,
        skillId: assessmentSkillId,
        title: "Responding to Challenging Classroom Situations",
        content:
          "This lesson focuses on how instructors can respond professionally to challenging classroom situations. It emphasizes maintaining authority, clarity, and empathy during difficult interactions. It also highlights the importance of checking understanding and refocusing learners after disruption.",
      },
    ]);

    // 4) Quizzes
    await quizzes.insertMany([
      // Lesson 1
      {
        _id: new ObjectId(),
        lessonId: lesson1Id,
        scenario:
          "While teaching, you notice several learners looking confused and disengaged.",
        questionType: "multiple-choice",
        question:
          "What action best supports student engagement in this moment?",
        option: [
          "Continue teaching to avoid slowing down the lesson.",
          "Pause and acknowledge the confusion before clarifying the key idea.",
          "Ignore disengaged learners and focus on active students.",
          "Move to the next topic to regain energy.",
        ],
        answer:
          "Pause and acknowledge the confusion before clarifying the key idea.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson1Id,
        scenario:
          "After explaining a concept, a learner reacts with visible frustration.",
        questionType: "multiple-choice",
        question:
          "Which empathy-based response improves explanation clarity?",
        option: [
          "Repeat the same explanation louder.",
          "Restate the key idea using simpler language.",
          "Tell the learner to review the textbook.",
          "Ignore the reaction and continue.",
        ],
        answer: "Restate the key idea using simpler language.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson1Id,
        scenario: "You ask a question, and the room becomes silent.",
        questionType: "multiple-choice",
        question: "What action best supports appropriate pacing?",
        option: [
          "Immediately call on a learner.",
          "Move on to avoid awkward silence.",
          "Pause briefly to allow processing time.",
          "Express frustration to encourage faster responses.",
        ],
        answer: "Pause briefly to allow processing time.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson1Id,
        scenario: "A learner challenges your instruction during an activity.",
        questionType: "multiple-choice",
        question: "What response maintains structure while showing empathy?",
        option: [
          "Ignore the comment and continue.",
          "React defensively to reassert authority.",
          "Acknowledge the concern and restate the learning objective clearly.",
          "Cancel the activity.",
        ],
        answer:
          "Acknowledge the concern and restate the learning objective clearly.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson1Id,
        scenario: "Several learners appear unsure after completing an activity.",
        questionType: "multiple-choice",
        question:
          "What empathy-informed action supports effective assessment?",
        option: [
          "Assume they understood since no one asked questions.",
          "Move forward because time is limited.",
          "Briefly check understanding with a clarifying question.",
          "Assign homework without discussion.",
        ],
        answer: "Briefly check understanding with a clarifying question.",
      },

      // Lesson 2
      {
        _id: new ObjectId(),
        lessonId: lesson2Id,
        scenario:
          "During a discussion, several learners stop participating and avoid eye contact.",
        questionType: "multiple-choice",
        question: "What is the most appropriate first interpretation?",
        option: [
          "The learners are bored.",
          "The learners are being disrespectful.",
          "The learners may be confused or unsure.",
          "The learners do not value the topic.",
        ],
        answer: "The learners may be confused or unsure.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson2Id,
        scenario:
          "After explaining instructions, one learner responds with visible frustration.",
        questionType: "multiple-choice",
        question: "What is the most productive next step?",
        option: [
          "Repeat the same instructions quickly.",
          "Clarify expectations and check for understanding.",
          "Tell the learner to review the syllabus.",
          "Ignore the frustration.",
        ],
        answer: "Clarify expectations and check for understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson2Id,
        scenario:
          "You notice learners becoming increasingly quiet during a fast-paced explanation.",
        questionType: "multiple-choice",
        question: "What should guide your response?",
        option: [
          "Continue to maintain momentum.",
          "Slow down and check comprehension.",
          "Assign independent work immediately.",
          "Call on someone to answer quickly.",
        ],
        answer: "Slow down and check comprehension.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson2Id,
        scenario:
          "A learner challenges the purpose of an activity and questions why it matters.",
        questionType: "multiple-choice",
        question: "How should you interpret this behavior?",
        option: [
          "As resistance to authority.",
          "As possible uncertainty about the lesson objective.",
          "As intentional disruption.",
          "As disrespect.",
        ],
        answer: "As possible uncertainty about the lesson objective.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson2Id,
        scenario:
          "After an activity, several learners remain silent when asked if they understood.",
        questionType: "multiple-choice",
        question: "What is the most effective action?",
        option: [
          "Assume understanding since no one asked questions.",
          "Move forward due to time limits.",
          "Ask a brief checking-for-understanding question.",
          "End the lesson early.",
        ],
        answer: "Ask a brief checking-for-understanding question.",
      },

      // Lesson 3
      {
        _id: new ObjectId(),
        lessonId: lesson3Id,
        scenario: "A learner challenges your explanation with a sharp tone.",
        questionType: "multiple-choice",
        question: "What response best maintains engagement?",
        option: [
          "Respond defensively to assert authority.",
          "Ignore the comment.",
          "Acknowledge the concern calmly and continue constructively.",
          "End the discussion immediately.",
        ],
        answer:
          "Acknowledge the concern calmly and continue constructively.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson3Id,
        scenario:
          "You feel frustrated after learners repeatedly misunderstand instructions.",
        questionType: "multiple-choice",
        question: "What is the most professional response?",
        option: [
          "Repeat instructions louder.",
          "Clarify and rephrase calmly.",
          "Express frustration to encourage attention.",
          "Move on to save time.",
        ],
        answer: "Clarify and rephrase calmly.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson3Id,
        scenario:
          "After asking a question, the room is silent and you feel uncomfortable.",
        questionType: "multiple-choice",
        question: "What supports effective pacing?",
        option: [
          "Immediately call on someone.",
          "Pause and allow thinking time.",
          "Move on quickly.",
          "Express impatience.",
        ],
        answer: "Pause and allow thinking time.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson3Id,
        scenario:
          "You feel irritated when a learner questions the purpose of an activity.",
        questionType: "multiple-choice",
        question: "What should guide your response?",
        option: [
          "React emotionally.",
          "Restate the learning objective clearly.",
          "Cancel the activity.",
          "Ignore the learner.",
        ],
        answer: "Restate the learning objective clearly.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson3Id,
        scenario: "You sense tension after a difficult exchange.",
        questionType: "multiple-choice",
        question: "What should you do next?",
        option: [
          "Continue without addressing it.",
          "Briefly check understanding to refocus the class.",
          "End the lesson early.",
          "Discipline the learner.",
        ],
        answer: "Briefly check understanding to refocus the class.",
      },

      // Lesson 4
      {
        _id: new ObjectId(),
        lessonId: lesson4Id,
        scenario: "A learner seems distracted during instruction.",
        questionType: "multiple-choice",
        question: "Which response best maintains engagement?",
        option: [
          "Why are you not paying attention?",
          "Let's focus on this part together.",
          "Ignore the behavior.",
          "Publicly criticize the learner.",
        ],
        answer: "Let's focus on this part together.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson4Id,
        scenario: "Learners look confused after instructions.",
        questionType: "multiple-choice",
        question: "What communication approach helps most?",
        option: [
          "Repeat the same wording.",
          "Simplify and clarify expectations.",
          "Move on quickly.",
          "Blame learners for not listening.",
        ],
        answer: "Simplify and clarify expectations.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson4Id,
        scenario: "A learner asks for clarification while you are mid-explanation.",
        questionType: "multiple-choice",
        question: "What is the best response?",
        option: [
          "Ignore and continue.",
          "Pause briefly and clarify.",
          "Tell them to ask later.",
          "Show irritation.",
        ],
        answer: "Pause briefly and clarify.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson4Id,
        scenario: "A discussion begins drifting off-topic.",
        questionType: "multiple-choice",
        question: "What communication maintains structure?",
        option: [
          "This is off-topic. Stop.",
          "Let's connect this back to today's objective.",
          "Ignore it.",
          "Cancel discussion.",
        ],
        answer: "Let's connect this back to today's objective.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson4Id,
        scenario: "You are unsure if learners understand instructions.",
        questionType: "multiple-choice",
        question: "What should you say?",
        option: [
          "You should understand this.",
          "Does this make sense?",
          "Can someone summarize the next step?",
          "Skip checking.",
        ],
        answer: "Can someone summarize the next step?",
      },

      // Lesson 5
      {
        _id: new ObjectId(),
        lessonId: lesson5Id,
        scenario:
          "During group work, one learner begins making sarcastic comments that distract others.",
        questionType: "multiple-choice",
        question: "What response best protects student engagement?",
        option: [
          "Publicly criticize the learner.",
          "Ignore the behavior completely.",
          "Calmly redirect the learner to the task.",
          "End the activity early.",
        ],
        answer: "Calmly redirect the learner to the task.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson5Id,
        scenario: "A learner challenges the purpose of an assignment.",
        questionType: "multiple-choice",
        question: "What is the most effective response?",
        option: [
          "Because I said so.",
          "Restate the learning objective clearly.",
          "Ignore the question.",
          "Cancel the assignment.",
        ],
        answer: "Restate the learning objective clearly.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson5Id,
        scenario: "A tense exchange slows down the lesson significantly.",
        questionType: "multiple-choice",
        question: "What should you do next?",
        option: [
          "Continue arguing to prove your point.",
          "Pause briefly and calmly transition back to content.",
          "End class immediately.",
          "Assign extra work as a consequence.",
        ],
        answer: "Pause briefly and calmly transition back to content.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson5Id,
        scenario:
          "A learner repeatedly interrupts the lesson with unrelated comments.",
        questionType: "multiple-choice",
        question: "What response maintains structure?",
        option: [
          "Stop interrupting.",
          "Ignore the learner completely.",
          "Acknowledge briefly and refocus on the lesson objective.",
          "End discussion permanently.",
        ],
        answer:
          "Acknowledge briefly and refocus on the lesson objective.",
      },
      {
        _id: new ObjectId(),
        lessonId: lesson5Id,
        scenario:
          "After a difficult interaction, you are unsure whether learners are still focused.",
        questionType: "multiple-choice",
        question: "What should you do?",
        option: [
          "Continue without checking.",
          "Briefly confirm understanding with a quick question.",
          "Ignore the situation.",
          "End the activity early.",
        ],
        answer: "Briefly confirm understanding with a quick question.",
      },
    ]);

    console.log("✅ Seed complete");
    console.log("courseId:", courseId.toHexString());
    console.log("lessonIds:", {
      lesson1Id: lesson1Id.toHexString(),
      lesson2Id: lesson2Id.toHexString(),
      lesson3Id: lesson3Id.toHexString(),
      lesson4Id: lesson4Id.toHexString(),
      lesson5Id: lesson5Id.toHexString(),
    });
    console.log("skillIds:", {
      lessonStructureSkillId: lessonStructureSkillId.toHexString(),
      explanationClaritySkillId: explanationClaritySkillId.toHexString(),
      assessmentSkillId: assessmentSkillId.toHexString(),
      pacingSkillId: pacingSkillId.toHexString(),
      studentEngagementSkillId: studentEngagementSkillId.toHexString(),
    });
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();