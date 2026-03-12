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

    await quizzes.deleteMany({});
    await lessons.deleteMany({});
    await courses.deleteMany({
      title: {
        $in: ["Empathy and Classroom Management", "Lesson Planning"],
      },
    });
    await skills.deleteMany({
      name: {
        $in: [
          "Student Engagement",
          "Explanation Clarity",
          "Pacing",
          "Lesson Structure",
          "Assessment",
        ],
      },
    });

    const studentEngagementSkillId = new ObjectId();
    const explanationClaritySkillId = new ObjectId();
    const pacingSkillId = new ObjectId();
    const lessonStructureSkillId = new ObjectId();
    const assessmentSkillId = new ObjectId();

    const empathyCourseId = new ObjectId();
    const planningCourseId = new ObjectId();

    const empathyLesson1Id = new ObjectId();
    const empathyLesson2Id = new ObjectId();
    const empathyLesson3Id = new ObjectId();
    const empathyLesson4Id = new ObjectId();
    const empathyLesson5Id = new ObjectId();

    const planningLesson1Id = new ObjectId();
    const planningLesson2Id = new ObjectId();
    const planningLesson3Id = new ObjectId();
    const planningLesson4Id = new ObjectId();
    const planningLesson5Id = new ObjectId();

    await skills.insertMany([
      {
        _id: studentEngagementSkillId,
        name: "Student Engagement",
        description:
          "Ability to maintain learner attention, participation, and involvement during instruction.",
      },
      {
        _id: explanationClaritySkillId,
        name: "Explanation Clarity",
        description:
          "Ability to explain concepts, objectives, and instructions clearly and understandably.",
      },
      {
        _id: pacingSkillId,
        name: "Pacing",
        description:
          "Ability to manage lesson timing and progression effectively.",
      },
      {
        _id: lessonStructureSkillId,
        name: "Lesson Structure",
        description:
          "Ability to organize lesson components in a clear and logical sequence.",
      },
      {
        _id: assessmentSkillId,
        name: "Assessment",
        description:
          "Ability to check and evaluate learner understanding during and after instruction.",
      },
    ]);

    await courses.insertMany([
      {
        _id: empathyCourseId,
        title: "Empathy and Classroom Management",
        description:
          "Empathy and classroom management course for new instructors (industry specialists).",
      },
      {
        _id: planningCourseId,
        title: "Lesson Planning",
        description:
          "Lesson planning is a critical skill for effective teaching. A well-designed lesson provides structure, clarity, and purpose for both instructors and learners. Rather than improvising instruction, teachers who plan carefully can create learning experiences that are organized, engaging, and aligned with clear objectives.",
      },
    ]);

    await lessons.insertMany([
      {
        _id: empathyLesson1Id,
        courseId: empathyCourseId,
        skillId: studentEngagementSkillId,
        title: "Empathy as an Instructional Skill",
        content:
          "This lesson introduces empathy as an instructional skill that supports effective classroom management, especially for instructors who know their subject but feel unsure about handling classroom dynamics. In an instructional context, empathy means understanding learners' experiences and responding intentionally to support learning. Empathy is not being overly lenient, removing expectations, or avoiding difficult situations. Instead, empathy helps instructors recognize confusion, frustration, or anxiety, stay calm and professional, and choose responses that keep learning moving forward. When learners feel understood, they are more likely to stay engaged, cooperative, and open to instruction.",
      },
      {
        _id: empathyLesson2Id,
        courseId: empathyCourseId,
        skillId: explanationClaritySkillId,
        title: "Understanding Learner Behavior",
        content:
          "This lesson helps instructors recognize common learner behaviors and understand what may be happening beneath the surface. Learner behavior is often a signal, not a personal challenge. Silence, lack of participation, visible frustration, and challenging comments do not automatically mean learners are disrespectful or uninterested. Understanding underlying needs helps instructors respond more clearly and professionally.",
      },
      {
        _id: empathyLesson3Id,
        courseId: empathyCourseId,
        skillId: pacingSkillId,
        title: "Managing Your Reactions as an Instructor",
        content:
          "This lesson helps instructors recognize emotional triggers in the classroom and respond professionally rather than react impulsively. Instructors may feel frustration, defensiveness, embarrassment, or pressure to regain control. A useful approach is to notice your reaction, pause briefly, and respond with clarity and purpose. Good pacing includes allowing time for thinking, reducing pressure, and maintaining professional composure during challenging moments.",
      },
      {
        _id: empathyLesson4Id,
        courseId: empathyCourseId,
        skillId: lessonStructureSkillId,
        title: "Empathy-Based Communication in the Classroom",
        content:
          "This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority. Words influence classroom tone. Empathy-based communication includes neutral language, clear expectations, calm tone, and concise explanations. Small changes in wording can reduce defensiveness and help maintain lesson structure.",
      },
      {
        _id: empathyLesson5Id,
        courseId: empathyCourseId,
        skillId: assessmentSkillId,
        title: "Responding to Challenging Classroom Situations",
        content:
          "This lesson focuses on how instructors can respond professionally to challenging classroom situations. It emphasizes maintaining authority, clarity, and empathy during difficult interactions. Effective responses include acknowledging concerns, reinforcing expectations, redirecting learners toward the task, and checking understanding when needed.",
      },
      {
        _id: planningLesson1Id,
        courseId: planningCourseId,
        skillId: studentEngagementSkillId,
        title: "Designing Lessons that Promote Student Engagement",
        content:
          "This lesson explores how instructors can design lessons that actively engage learners. Engagement is not only about keeping students busy; it is about creating meaningful opportunities for participation, thinking, and interaction. A well-planned lesson encourages students to become active participants in the learning process rather than passive listeners. Student engagement is one of the strongest predictors of successful learning. When learners are actively involved, they are more likely to understand concepts, retain information, and apply knowledge. Effective lesson plans often include interactive questions, collaborative learning, and application activities.",
      },
      {
        _id: planningLesson2Id,
        courseId: planningCourseId,
        skillId: explanationClaritySkillId,
        title: "Explaining Learning Objectives Clearly",
        content:
          "This lesson focuses on communicating lesson goals clearly. When students understand what they are expected to learn, they can focus their efforts more effectively. Learning objectives describe the knowledge or skills students should develop. Effective objectives are specific, measurable, and observable. Clear objectives help students understand lesson goals, focus on important information, and monitor their progress. Instructors should present objectives at the start, use simple language, and connect objectives to real-world applications.",
      },
      {
        _id: planningLesson3Id,
        courseId: planningCourseId,
        skillId: pacingSkillId,
        title: "Managing Time Effectively in a Lesson",
        content:
          "This lesson explores how instructors manage time effectively during lessons. Pacing ensures lessons move smoothly while allowing time for understanding and practice. Poor pacing can cause confusion when lessons move too fast, or boredom when they move too slowly. Balanced pacing keeps students engaged. Effective lessons often include an introduction, learning activities, and a conclusion, with time distributed intentionally across each phase.",
      },
      {
        _id: planningLesson4Id,
        courseId: planningCourseId,
        skillId: lessonStructureSkillId,
        title: "Structuring an Effective Lesson",
        content:
          "This lesson explains how instructors organize lessons into clear and logical stages. A well-structured lesson usually includes an introduction, instruction and practice, and lesson closure. Clear structure helps students follow the progression of ideas and understand how different activities support the learning goals. Structure provides a framework that guides both teaching and learning.",
      },
      {
        _id: planningLesson5Id,
        courseId: planningCourseId,
        skillId: assessmentSkillId,
        title: "Planning Lessons with Assessment in Mind",
        content:
          "This lesson focuses on integrating assessment into lesson planning to monitor student learning. Assessment helps instructors determine whether students are achieving the learning objectives. Effective lesson planning includes opportunities to evaluate understanding throughout the learning process using both informal and formal assessment methods. When assessment is integrated into planning, instructors can adjust instruction more effectively.",
      },
    ]);

    await quizzes.insertMany([
      // Empathy - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "While teaching, you notice several learners looking confused and disengaged.",
        questionType: "multiple-choice",
        question: "What action best supports student engagement in this moment?",
        option: [
          "Continue teaching to avoid slowing down the lesson.",
          "Pause and acknowledge the confusion before clarifying the key idea.",
          "Ignore disengaged learners and focus on active students.",
          "Move to the next topic to regain energy.",
        ],
        answer:
          "Pause and acknowledge the confusion before clarifying the key idea.",
        review:
          "Engagement increases when learners feel understood. Acknowledging confusion helps rebuild attention and connection.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
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
        review:
          "Empathy helps instructors adjust explanations. Clarifying and simplifying improves understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
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
        review:
          "Silence often means learners are thinking. Adjusting pacing supports comprehension and reduces pressure.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
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
        review:
          "Strong lesson structure balances empathy with clear goals and expectations.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "Several learners appear unsure after completing an activity.",
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
        review:
          "Empathy encourages instructors to verify understanding rather than assume it.",
      },

      // Empathy - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
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
        review:
          "Learner disengagement often signals confusion or uncertainty rather than lack of interest.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
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
        review:
          "Frustration often reflects unclear instructions. Improving clarity strengthens learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
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
        review:
          "Changes in participation may signal pacing issues. Adjusting speed supports understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
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
        review:
          "Questions about purpose often signal unclear structure. Reinforcing objectives strengthens lesson flow.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
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
        review:
          "Surface behavior may hide uncertainty. Quick formative assessment prevents misunderstandings.",
      },

      // Empathy - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
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
        review:
          "Calm responses maintain engagement and prevent defensive escalation.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
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
        review:
          "Clear, calm clarification improves comprehension and authority.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
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
        review:
          "Thoughtful pacing reduces pressure and supports processing.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
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
        review:
          "Re-centering on objectives maintains structure and professionalism.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
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
        review:
          "Quick checks restore learning focus after emotional moments.",
      },

      // Empathy - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
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
        review:
          "Neutral phrasing supports engagement without embarrassment.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
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
        review:
          "Clear and simple language improves comprehension.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario:
          "A learner asks for clarification while you are mid-explanation.",
        questionType: "multiple-choice",
        question: "What is the best response?",
        option: [
          "Ignore and continue.",
          "Pause briefly and clarify.",
          "Tell them to ask later.",
          "Show irritation.",
        ],
        answer: "Pause briefly and clarify.",
        review:
          "Adjusting communication pacing supports understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
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
        review:
          "Linking comments to objectives preserves structure respectfully.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
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
        review:
          "Active checking confirms understanding more effectively.",
      },

      // Empathy - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
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
        review:
          "Calm redirection protects engagement without escalating tension.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
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
        review:
          "Clarifying purpose strengthens understanding and reduces resistance.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
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
        review:
          "Resetting calmly restores instructional pacing.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
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
        review:
          "Linking responses back to objectives preserves lesson structure.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
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
        review:
          "Quick checks help restore learning focus after disruption.",
      },

      // Lesson Planning - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "An instructor plans a lesson that consists mainly of a 60-minute lecture. Students begin checking their phones.",
        questionType: "multiple-choice",
        question: "What change could increase engagement?",
        option: [
          "Add interactive activities such as discussions",
          "Extend the lecture",
          "Reduce course content",
          "Avoid asking questions",
        ],
        answer: "Add interactive activities such as discussions",
        review:
          "Interactive activities encourage participation and maintain attention.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "A teacher wants students to apply a concept instead of memorizing it.",
        questionType: "multiple-choice",
        question: "Which activity supports this goal?",
        option: [
          "Case study solving a real problem",
          "Longer lecture",
          "Silent reading",
          "Removing interaction",
        ],
        answer: "Case study solving a real problem",
        review:
          "Application activities promote deeper learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "A teacher includes discussion questions throughout the lesson.",
        questionType: "multiple-choice",
        question: "What is the main benefit?",
        option: [
          "Keeps students actively involved",
          "Reduces planning",
          "Eliminates interaction",
          "Shortens lesson time",
        ],
        answer: "Keeps students actively involved",
        review:
          "Questions encourage continuous participation.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "Students work in small groups to solve a problem.",
        questionType: "multiple-choice",
        question: "What engagement strategy is this?",
        option: [
          "Collaborative learning",
          "Passive instruction",
          "Independent testing",
          "Silent reading",
        ],
        answer: "Collaborative learning",
        review:
          "Collaboration improves interaction and engagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "An instructor wants students to connect the lesson to real life.",
        questionType: "multiple-choice",
        question: "What strategy helps achieve this?",
        option: [
          "Use real-world examples",
          "Avoid practical examples",
          "Focus only on theory",
          "Remove discussion",
        ],
        answer: "Use real-world examples",
        review:
          "Real-world examples make learning more meaningful.",
      },

      // Lesson Planning - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "Students appear confused about what they should learn.",
        questionType: "multiple-choice",
        question: "What should the instructor include?",
        option: [
          "Clear learning objectives",
          "Additional grading rules",
          "Longer lecture notes",
          "Fewer explanations",
        ],
        answer: "Clear learning objectives",
        review:
          "Learning objectives clarify lesson goals.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "An instructor uses complex terminology that students do not understand.",
        questionType: "multiple-choice",
        question: "What improves clarity?",
        option: [
          "Use simpler language",
          "Increase technical vocabulary",
          "Avoid examples",
          "Move to next topic quickly",
        ],
        answer: "Use simpler language",
        review:
          "Simple explanations improve understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "The instructor connects the lesson to previous topics.",
        questionType: "multiple-choice",
        question: "What is the benefit?",
        option: [
          "Helps students understand context",
          "Shortens the lesson",
          "Removes need for explanation",
          "Reduces participation",
        ],
        answer: "Helps students understand context",
        review:
          "Connecting knowledge helps comprehension.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "The instructor demonstrates a process step-by-step.",
        questionType: "multiple-choice",
        question: "Why is this effective?",
        option: [
          "Makes explanations easier to follow",
          "Eliminates questions",
          "Reduces planning",
          "Replaces practice",
        ],
        answer: "Makes explanations easier to follow",
        review:
          "Step-by-step demonstrations clarify processes.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "Students misunderstand assignment instructions.",
        questionType: "multiple-choice",
        question: "What planning strategy helps prevent this?",
        option: [
          "Provide clear instructions and examples",
          "Give instructions once",
          "Remove details",
          "Avoid written instructions",
        ],
        answer: "Provide clear instructions and examples",
        review:
          "Clear instructions reduce confusion.",
      },

      // Lesson Planning - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The instructor explains a concept then immediately moves on.",
        questionType: "multiple-choice",
        question: "What pacing issue occurs?",
        option: [
          "Lesson moving too quickly",
          "Lesson too structured",
          "Too many examples",
          "Too interactive",
        ],
        answer: "Lesson moving too quickly",
        review:
          "Students need time to process information.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "Students finish an activity earlier than expected.",
        questionType: "multiple-choice",
        question: "What should the instructor do?",
        option: [
          "Prepare extra activities",
          "End the lesson",
          "Skip interaction",
          "Ignore extra time",
        ],
        answer: "Prepare extra activities",
        review:
          "Extra activities maintain engagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The lesson includes introduction, activities, and conclusion.",
        questionType: "multiple-choice",
        question: "What does this support?",
        option: [
          "Effective pacing",
          "Random instruction",
          "Passive learning",
          "Independent grading",
        ],
        answer: "Effective pacing",
        review:
          "Structured phases help manage time.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "Students need more time for discussion.",
        questionType: "multiple-choice",
        question: "What should the instructor do?",
        option: [
          "Adjust pacing",
          "Stop discussion",
          "Skip questions",
          "End lesson",
        ],
        answer: "Adjust pacing",
        review:
          "Flexible pacing supports deeper learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The lesson includes long explanations but little practice.",
        questionType: "multiple-choice",
        question: "What improvement is needed?",
        option: [
          "Balance explanation and practice",
          "Extend lecture",
          "Reduce interaction",
          "Remove exercises",
        ],
        answer: "Balance explanation and practice",
        review:
          "Practice reinforces understanding.",
      },

      // Lesson Planning - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "A teacher begins without introducing the topic.",
        questionType: "multiple-choice",
        question: "What is missing?",
        option: [
          "Lesson introduction",
          "Assessment",
          "Discussion",
          "Evaluation",
        ],
        answer: "Lesson introduction",
        review:
          "The introduction prepares students for learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "Students practice after a demonstration.",
        questionType: "multiple-choice",
        question: "What stage is this?",
        option: [
          "Instruction and practice",
          "Lesson closure",
          "Lesson introduction",
          "Evaluation",
        ],
        answer: "Instruction and practice",
        review:
          "Practice allows students to apply concepts.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "The instructor summarizes the lesson.",
        questionType: "multiple-choice",
        question: "What stage is this?",
        option: [
          "Lesson closure",
          "Introduction",
          "Evaluation",
          "Instruction",
        ],
        answer: "Lesson closure",
        review:
          "Closure reinforces understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "The lesson follows clear phases.",
        questionType: "multiple-choice",
        question: "What is the benefit?",
        option: [
          "Students follow ideas more easily",
          "Less preparation needed",
          "Less interaction",
          "Easier grading",
        ],
        answer: "Students follow ideas more easily",
        review:
          "Structure improves clarity.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "Students feel activities are unrelated.",
        questionType: "multiple-choice",
        question: "What planning issue exists?",
        option: [
          "Lack of clear structure",
          "Too many objectives",
          "Too much participation",
          "Excessive feedback",
        ],
        answer: "Lack of clear structure",
        review:
          "Clear structure connects activities to goals.",
      },

      // Lesson Planning - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "An instructor asks how they will know if students understood.",
        questionType: "multiple-choice",
        question: "What aspect is being considered?",
        option: [
          "Assessment strategy",
          "Lesson pacing",
          "Classroom management",
          "Content difficulty",
        ],
        answer: "Assessment strategy",
        review:
          "Assessment measures learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "The instructor asks quick questions during the lesson.",
        questionType: "multiple-choice",
        question: "What type of assessment is this?",
        option: [
          "Informal formative assessment",
          "Final exam",
          "Certification",
          "Diagnostic test",
        ],
        answer: "Informal formative assessment",
        review:
          "Formative assessment checks understanding during learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "Students take a short quiz at the end of the lesson.",
        questionType: "multiple-choice",
        question: "What is its purpose?",
        option: [
          "Measure learning outcomes",
          "Replace instruction",
          "Reduce time",
          "Remove feedback",
        ],
        answer: "Measure learning outcomes",
        review:
          "Quizzes evaluate learning objectives.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "The instructor notices a misunderstanding.",
        questionType: "multiple-choice",
        question: "What should they do?",
        option: [
          "Clarify the concept",
          "Ignore it",
          "Continue lesson",
          "Address only in exam",
        ],
        answer: "Clarify the concept",
        review:
          "Immediate clarification supports learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "Activities and assessments align with objectives.",
        questionType: "multiple-choice",
        question: "Why is this important?",
        option: [
          "Ensures learning outcomes are measured",
          "Reduces planning time",
          "Removes feedback",
          "Simplifies grading",
        ],
        answer: "Ensures learning outcomes are measured",
        review:
          "Alignment ensures lessons support intended goals.",
      },
    ]);

    console.log("✅ Seed complete");
    console.log("Courses:", {
      empathyCourseId: empathyCourseId.toHexString(),
      planningCourseId: planningCourseId.toHexString(),
    });
    console.log("Skills:", {
      studentEngagementSkillId: studentEngagementSkillId.toHexString(),
      explanationClaritySkillId: explanationClaritySkillId.toHexString(),
      pacingSkillId: pacingSkillId.toHexString(),
      lessonStructureSkillId: lessonStructureSkillId.toHexString(),
      assessmentSkillId: assessmentSkillId.toHexString(),
    });
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();