import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "tete";

if (!MONGO_URI) {
  console.error("Missing MONGO_URI env!");
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
        $in: [
          "Empathy and Classroom Management",
          "Lesson Planning",
          "Effective Communication",
          "Fundamentals of Teaching",
          "Assessment and Feedback",
        ],
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

    // Skill IDs
    const studentEngagementSkillId = new ObjectId();
    const explanationClaritySkillId = new ObjectId();
    const pacingSkillId = new ObjectId();
    const lessonStructureSkillId = new ObjectId();
    const assessmentSkillId = new ObjectId();

    // Course IDs
    const empathyCourseId = new ObjectId();
    const planningCourseId = new ObjectId();
    const effectiveCommunicationCourseId = new ObjectId();
    const fundamentalsTeachingCourseId = new ObjectId();
    const assessmentFeedbackCourseId = new ObjectId();

    // Empathy lesson IDs
    const empathyLesson1Id = new ObjectId();
    const empathyLesson2Id = new ObjectId();
    const empathyLesson3Id = new ObjectId();
    const empathyLesson4Id = new ObjectId();
    const empathyLesson5Id = new ObjectId();

    // Planning lesson IDs
    const planningLesson1Id = new ObjectId();
    const planningLesson2Id = new ObjectId();
    const planningLesson3Id = new ObjectId();
    const planningLesson4Id = new ObjectId();
    const planningLesson5Id = new ObjectId();

    // Effective Communication lesson IDs
    const effectiveCommunicationLesson1Id = new ObjectId();
    const effectiveCommunicationLesson2Id = new ObjectId();
    const effectiveCommunicationLesson3Id = new ObjectId();
    const effectiveCommunicationLesson4Id = new ObjectId();
    const effectiveCommunicationLesson5Id = new ObjectId();

    // Fundamentals of Teaching lesson IDs
    const fundamentalsTeachingLesson1Id = new ObjectId();
    const fundamentalsTeachingLesson2Id = new ObjectId();
    const fundamentalsTeachingLesson3Id = new ObjectId();
    const fundamentalsTeachingLesson4Id = new ObjectId();
    const fundamentalsTeachingLesson5Id = new ObjectId();
    
    // Assessment and Feedback lesson IDs
    const assessmentFeedbackLesson1Id = new ObjectId();
    const assessmentFeedbackLesson2Id = new ObjectId();
    const assessmentFeedbackLesson3Id = new ObjectId();
    const assessmentFeedbackLesson4Id = new ObjectId();
    const assessmentFeedbackLesson5Id = new ObjectId();

    await skills.insertMany([
  {
    _id: studentEngagementSkillId,
    name: "Student Engagement",
    description:
      "Ability to maintain learner attention, participation, and involvement during instruction.",
    order: 1,

  },
  {
    _id: explanationClaritySkillId,
    name: "Explanation Clarity",
    description:
      "Ability to explain concepts, objectives, and instructions clearly and understandably.",
    order: 2,
  },
  {
    _id: pacingSkillId,
    name: "Pacing",
    description:
      "Ability to manage lesson timing and progression effectively.",
    order: 3,
  },
  {
    _id: lessonStructureSkillId,
    name: "Lesson Structure",
    description:
      "Ability to organize lesson components in a clear and logical sequence.",
    order: 4,
  },
  {
    _id: assessmentSkillId,
    name: "Assessment",
    description:
      "Ability to check and evaluate learner understanding during and after instruction.",
    order: 5,
  },
    ]);

await courses.insertMany([
    {
    _id: fundamentalsTeachingCourseId,
    title: "Fundamentals of Teaching",
    description:
      "Fundamentals of Teaching introduces the core principles that support effective instruction in modern classrooms. This course focuses on how instructors design learning experiences, deliver content strategically, and respond to student needs in real time. Rather than focusing only on content delivery, this course emphasizes decision-making during instruction, including how to manage cognitive load, support diverse learners, and maintain engagement while ensuring learning outcomes are achieved.",
    order: 1,
    icon: "fundamentalsOfTeaching",
  },
    {
    _id: effectiveCommunicationCourseId,
    title: "Effective Communication",
    description:
      "Effective communication is a foundational teaching skill. It helps instructors explain ideas clearly, listen actively, provide meaningful feedback, encourage interaction, and use verbal and nonverbal communication to support student understanding and engagement. When communication is clear and purposeful, students are more likely to participate, understand expectations, and feel confident in their learning.",
    order: 2,
    icon: "effectiveCommunication",
    },
  {
    _id: empathyCourseId,
    title: "Empathy and Classroom Management",
    description:
      "Empathy and classroom management course for new instructors (industry specialists).",
    order: 3,
    icon: "empathy",
  },
  {
    _id: planningCourseId,
    title: "Lesson Planning",
    description:
      "Lesson planning is a critical skill for effective teaching. A well-designed lesson provides structure, clarity, and purpose for both instructors and learners. Rather than improvising instruction, teachers who plan carefully can create learning experiences that are organized, engaging, and aligned with clear objectives.",
    order: 4,
    icon: "lessonPlanning",
  },
  {
    _id: assessmentFeedbackCourseId,
    title: "Assessment and Feedback",
    description:
      "Assessment and feedback are central to effective teaching. While assessment measures student understanding, feedback guides improvement and supports continued learning. In professional teaching contexts, assessment is not only about grading. It helps instructors identify student strengths and weaknesses, adjust instruction strategies, encourage reflection and self-improvement, and support long-term learning outcomes. When assessment and feedback are used together, they create a continuous learning cycle where students can evaluate their progress and improve their performance.",
    order: 5,
    icon: "assessment",
  },
]);

  await lessons.insertMany([
  // =========================
  // Empathy and Classroom Management
  // =========================
{
  _id: empathyLesson1Id,
  courseId: empathyCourseId,
  skillId: studentEngagementSkillId,
  order: 1,
  title: "Empathy as an Instructional Skill",
  lessonDescription:
    "This lesson introduces empathy as an instructional skill that supports effective classroom management, especially for instructors who know their subject but feel unsure about handling classroom dynamics.",
  sections: [
    {
      heading: "What Empathy Means in Teaching",
      blocks: [
        {
          type: "text",
          text: "In an instructional context, empathy means understanding learners’ experiences and responding intentionally to support learning.",
        },
        {
          type: "text",
          text: "Empathy in teaching is not:\n• being overly lenient\n• removing expectations\n• avoiding difficult situations",
        },
        {
          type: "text",
          text: "Instead, empathy helps instructors respond professionally and thoughtfully, even when challenges arise.",
        },
        {
          type: "text",
          text: "Empathy is:\n• recognizing confusion, frustration, or anxiety\n• staying calm and professional\n• choosing responses that keep learning moving forward",
        },
        {
          type: "text",
          text: "When learners feel understood, they are more likely to stay engaged, cooperative, and open to instruction.",
        },
      ],
    },
    {
      heading: "Why Empathy Matters for Classroom Management",
      blocks: [
        {
          type: "text",
          text: "Classroom management is not about control, it’s about creating conditions where learning can happen.",
        },
        {
          type: "text",
          text: "When empathy is missing, small issues can quickly turn into tension or resistance. When empathy is present, instructors can address challenges early and calmly.",
        },
        {
          type: "text",
          text: "In real classrooms, instructors often see mixed reactions at the same time.",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          imgAlt: "Students collaborating in a classroom",
        },
        {
          type: "text",
          text: "Empathy helps instructors:\n• reduce tension and defensiveness\n• build trust with learners\n• address issues before they escalate",
        },
        {
          type: "text",
          text: "For example:\n• A quiet learner may be overwhelmed, not uninterested\n• A challenging comment may reflect frustration, not disrespect",
        },
        {
          type: "text",
          text: "Effective instructors pause, observe, and respond with intention rather than reacting emotionally in the moment.",
        },
      ],
    },
    {
      heading: "Empathy Is a Skill You Can Practice",
      blocks: [
        {
          type: "text",
          text: "Empathy is not something you either have or don’t have—it’s a skill that improves with practice.",
        },
        {
          type: "text",
          text: "Instructors can develop empathy by:\n• paying close attention to learner behavior and reactions\n• reflecting briefly before responding\n• balancing understanding with clear expectations",
        },
        {
          type: "text",
          text: "Empathy does not weaken authority. Strong classroom management combines empathy and structure, not one without the other.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Empathy is a practical instructional skill, not just a personality trait.",
    "Understanding learner behavior supports classroom management.",
    "Empathy and clear expectations work best together.",
  ],
},
  {
    _id: empathyLesson2Id,
    courseId: empathyCourseId,
    skillId: explanationClaritySkillId,
    order: 2,
    title: "Understanding Learner Behavior",
    lessonDescription:
      "This lesson helps instructors recognize common learner behaviors and understand what may be happening beneath the surface. It focuses on reading confusion, disengagement, and resistance without making quick assumptions.",
      sections: [
    {
      heading: "What Learner Behavior Really Means",
      blocks: [
        {
          type: "text",
          text: "Learner behavior is often misinterpreted, especially by new instructors. In teaching, behavior is usually a signal, not a personal response to the instructor.",
        },
        {
          type: "text",
          text: "Common behaviors include:\n• silence\n• lack of participation\n• visible frustration\n• challenging comments",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350",
          imgAlt: "Students in a classroom showing different engagement levels",
        },
        {
          type: "text",
          text: "These behaviors do not automatically mean learners are uninterested or disrespectful. Understanding learner behavior helps instructors respond more accurately and professionally.",
        },
      ],
    },
    {
      heading: "Quiet and Disengaged Learners",
      blocks: [
        {
          type: "text",
          text: "Quiet behavior is one of the most commonly misunderstood signals in the classroom.",
        },
        {
          type: "text",
          text: "A quiet learner may be:\n• processing new information\n• unsure if they understand\n• anxious about speaking\n• overwhelmed by the pace",
        },
        {
          type: "text",
          text: "Silence does not always indicate a lack of interest. Effective instructors avoid assuming intent and instead observe patterns over time before responding.",
        },
      ],
    },
    {
      heading: "Frustrated and Challenging Reactions",
      blocks: [
        {
          type: "text",
          text: "Frustration often appears as:\n• sharp comments\n• visible irritation\n• resistance to instructions",
        },
        {
          type: "text",
          text: "These reactions are frequently linked to:\n• confusion\n• feeling left behind\n• unclear expectations",
        },
        {
          type: "text",
          text: "Rather than reacting defensively, instructors who understand learner behavior pause and ask: “What might be causing this response?” This shift helps prevent unnecessary conflict.",
        },
      ],
    },
    {
      heading: "Surface Behavior vs. Underlying Needs",
      blocks: [
        {
          type: "text",
          text: "What instructors see is surface behavior. What learners experience internally may be very different.",
        },
        {
          type: "text",
          text: "For example:\n• disengagement may signal confusion\n• resistance may signal frustration\n• silence may signal uncertainty",
        },
        {
          type: "text",
          text: "Understanding this difference allows instructors to respond with clarity, not emotion. Strong classroom management starts with accurate interpretation.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Learner behavior is often a signal, not a personal challenge.",
    "Quiet or disengaged behavior does not always mean disinterest.",
    "Understanding underlying needs supports better instructional responses.",
  ],
  },
  {
    _id: empathyLesson3Id,
    courseId: empathyCourseId,
    skillId: pacingSkillId,
    order: 3,
    title: "Managing Your Reactions as an Instructor",
    lessonDescription:
      "“Responding instead of reacting.”\n This lesson helps instructors recognize emotional triggers in the classroom and respond professionally rather than react impulsively. It focuses on maintaining composure, authority, and clarity during challenging moments.",
    sections: [
    {
      heading: "Why Instructor Reactions Matter",
      blocks: [
        {
          type: "text",
          text: "Learners do not only respond to content—they respond to the instructor’s tone, posture, and emotional control.",
        },
        {
          type: "text",
          text: "In classroom settings, instructors may experience:\n• frustration\n• defensiveness\n• embarrassment\n• pressure to “regain control”",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1584697964403-6f5d2d3c4f6b",
          imgAlt: "Teacher calmly managing a classroom discussion",
        },
        {
          type: "text",
          text: "Reacting emotionally can escalate situations. Responding intentionally supports professionalism and stability.",
        },
      ],
    },
    {
      heading: "Common Emotional Triggers",
      blocks: [
        {
          type: "text",
          text: "New instructors often feel triggered when:\n• learners challenge instructions\n• silence follows a question\n• participation is low\n• a learner appears disengaged",
        },
        {
          type: "text",
          text: "These moments are normal. Professional instructors recognize the trigger internally but choose a measured response externally.",
        },
      ],
    },
    {
      heading: "Pause, Process, Respond",
      blocks: [
        {
          type: "text",
          text: "A simple framework:\n• Notice your reaction\n• Pause briefly\n• Respond with clarity and purpose",
        },
        {
          type: "text",
          text: "This prevents defensive language and preserves authority. Strong classroom management depends on emotional regulation.",
        },
      ],
    },
    {
      heading: "Professional Presence",
      blocks: [
        {
          type: "text",
          text: "Professional presence includes:\n• steady tone\n• controlled pacing\n• neutral body language\n• clear expectations",
        },
        {
          type: "text",
          text: "When instructors remain calm, learners are more likely to stabilize as well.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Emotional triggers are normal in teaching.",
    "Pausing prevents escalation.",
    "Professional presence strengthens classroom management.",
  ],
  },
  {
    _id: empathyLesson4Id,
    courseId: empathyCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Empathy-Based Communication in the Classroom",
    lessonDescription:
      "“What to say - and how to say it.” /n This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority. It explores how instructors can respond clearly and professionally in everyday classroom interactions.",
    sections: [
    {
      heading: "Language Shapes Classroom Climate",
      blocks: [
        {
          type: "text",
          text: "Words influence classroom tone.",
        },
        {
          type: "text",
          text: "Empathy-based communication includes:\n• neutral language\n• clear expectations\n• calm tone\n• concise explanations",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
          imgAlt: "Teacher speaking with students in a calm classroom setting",
        },
        {
          type: "text",
          text: "Communication should reduce defensiveness, not increase it.",
        },
      ],
    },
    {
      heading: "Tone and Framing",
      blocks: [
        {
          type: "text",
          text: "Instead of:\n“You’re not paying attention.”",
        },
        {
          type: "text",
          text: "Try:\n“Let’s refocus on the main idea.”",
        },
        {
          type: "text",
          text: "Language shifts can prevent conflict.",
        },
      ],
    },
    {
      heading: "Clarity Without Over-Explaining",
      blocks: [
        {
          type: "text",
          text: "Empathy does not mean long explanations.",
        },
        {
          type: "text",
          text: "It means:\n• clear instructions\n• simple phrasing\n• respectful redirection",
        },
        {
          type: "text",
          text: "Authority remains intact.",
        },
      ],
    },
    {
      heading: "Balancing Support and Expectations",
      blocks: [
        {
          type: "text",
          text: "Empathy-based communication:\n• acknowledges concerns\n• reinforces standards\n• keeps learning moving forward",
        },
        {
          type: "text",
          text: "This balance builds trust.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Tone matters as much as content.",
    "Neutral phrasing reduces defensiveness.",
    "Clear communication supports classroom management.",
  ],
  },
  {
    _id: empathyLesson5Id,
    courseId: empathyCourseId,
    skillId: assessmentSkillId,
    order: 5,
    title: "Responding to Challenging Classroom Situations",
    lessonDescription:
      "”Applying empathy and structure in real moments.” /n This lesson focuses on how instructors can respond professionally to challenging classroom situations. It emphasizes maintaining authority, clarity, and empathy during difficult interactions.",
    sections: [
    {
      heading: "Challenging Situations Are Normal",
      blocks: [
        {
          type: "text",
          text: "In every classroom, instructors may encounter:\n• disruptive comments\n• repeated disengagement\n• resistance to activities\n• emotional reactions",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
          imgAlt: "Teacher managing a classroom discussion with students",
        },
        {
          type: "text",
          text: "Challenging moments do not mean failure. They are part of instructional practice. Effective instructors prepare to respond calmly rather than react emotionally.",
        },
      ],
    },
    {
      heading: "Stay Calm and Maintain Authority",
      blocks: [
        {
          type: "text",
          text: "When a challenging moment occurs:\n• Keep your tone steady\n• Avoid public embarrassment\n• Focus on the learning objective",
        },
        {
          type: "text",
          text: "Authority does not require aggression. It requires clarity and consistency.",
        },
      ],
    },
    {
      heading: "Address the Behavior, Not the Person",
      blocks: [
        {
          type: "text",
          text: "Instead of labeling the learner, focus on the behavior.",
        },
        {
          type: "text",
          text: "For example:\nInstead of:\n“You are being disrespectful.”\nTry:\n“Let’s keep our comments focused on the task.”",
        },
        {
          type: "text",
          text: "This maintains professionalism and reduces defensiveness.",
        },
      ],
    },
    {
      heading: "Redirect and Refocus",
      blocks: [
        {
          type: "text",
          text: "A practical framework:\n• Acknowledge briefly\n• Reinforce expectations\n• Redirect to learning",
        },
        {
          type: "text",
          text: "Example:\n“I understand there’s some frustration. Let’s return to the main objective.”",
        },
        {
          type: "text",
          text: "Redirection prevents escalation.",
        },
      ],
    },
    {
      heading: "Preventing Escalation",
      blocks: [
        {
          type: "text",
          text: "Escalation often happens when:\n• instructors respond emotionally\n• expectations are unclear\n• frustration is ignored",
        },
        {
          type: "text",
          text: "Professional responses combine empathy with structure. Strong classroom management is demonstrated most clearly in difficult moments.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Challenging situations are normal in teaching.",
    "Calm authority prevents escalation.",
    "Address behavior, not personality.",
    "Redirect learning with clarity.",
  ],
  },

  // =========================
  // Lesson Planning
  // =========================
  {
    _id: planningLesson1Id,
    courseId: planningCourseId,
    skillId: studentEngagementSkillId,
    order: 1,
    title: "Designing Lessons that Promote Student Engagement",
    lessonDescription:
      "This lesson explores how instructors can design lessons that actively engage learners. Engagement is not only about keeping students busy; it is about creating meaningful opportunities for participation, thinking, and interaction.",
    sections: [
    {
      heading: "Why Engagement Matters in Lesson Planning",
      blocks: [
        {
          type: "text",
          text: "Student engagement is one of the strongest predictors of successful learning. When learners are actively involved, they are more likely to understand concepts, retain information, and apply new knowledge.",
        },
        {
          type: "text",
          text: "Lessons that lack engagement often lead to:\n• reduced attention and motivation\n• minimal participation\n• lower knowledge retention",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Students actively participating in a classroom discussion",
        },
        {
          type: "text",
          text: "By planning activities that involve students, instructors can create a more dynamic learning environment.",
        },
      ],
    },
    {
      heading: "Strategies to Increase Engagement",
      blocks: [
        {
          type: "text",
          text: "Effective lesson plans often include activities that require students to think, discuss, or apply knowledge.",
        },
        {
          type: "text",
          text: "Examples include:",
        },
        {
          type: "text",
          text: "Interactive questions\nInstead of only presenting information, instructors can ask questions that encourage discussion.\nExample:\n“How would you apply this concept in a real-world situation?”",
        },
        {
          type: "text",
          text: "Collaborative learning\nStudents work together to solve problems or analyze information.\nBenefits include:\n• stronger communication skills\n• exposure to multiple perspectives\n• deeper understanding of concepts",
        },
        {
          type: "text",
          text: "Application activities\nStudents apply knowledge through tasks such as case studies, simulations, or problem-solving exercises.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Engagement should be intentionally planned. When instructors design lessons with participation in mind, students become more invested in the learning process.",
        },
        {
          type: "text",
          text: "A well-planned lesson encourages students to become active participants in the learning process rather than passive listeners.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Student engagement increases understanding, retention, and application of knowledge.",
    "Effective lesson plans include discussion, collaboration, and application.",
    "Engagement should be intentionally built into lesson design.",
  ],
  },
  {
    _id: planningLesson2Id,
    courseId: planningCourseId,
    skillId: explanationClaritySkillId,
    order: 2,
    title: "Explaining Learning Objectives Clearly",
    lessonDescription:
      "This lesson focuses on how instructors can clearly communicate the goals of a lesson. When students understand what they are expected to learn, they are better able to focus their efforts and monitor their progress.",
    sections: [
    {
      heading: "What Are Learning Objectives?",
      blocks: [
        {
          type: "text",
          text: "Learning objectives describe the knowledge or skills that students should develop during a lesson.",
        },
        {
          type: "text",
          text: "Effective objectives are:\n• specific\n• measurable\n• focused on observable outcomes",
        },
        {
          type: "text",
          text: "Example objective:\n“By the end of the lesson, students will be able to explain the steps of the scientific method.”",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher explaining lesson goals to students in a classroom",
        },
        {
          type: "text",
          text: "Clear objectives help students understand the purpose of the lesson.",
        },
      ],
    },
    {
      heading: "Why Clear Objectives Improve Learning",
      blocks: [
        {
          type: "text",
          text: "When objectives are clearly explained, students can:\n• understand what they are expected to achieve\n• focus on relevant information\n• evaluate their own progress",
        },
        {
          type: "text",
          text: "Without clear objectives, lessons may feel disorganized or confusing.",
        },
      ],
    },
    {
      heading: "Best Practices for Communicating Objectives",
      blocks: [
        {
          type: "text",
          text: "Instructors often improve clarity by:\n• presenting objectives at the beginning of the lesson\n• explaining them in simple language\n• connecting them to real-world applications",
        },
        {
          type: "text",
          text: "This approach helps students see the relevance and purpose of the lesson.",
        },
        {
          type: "text",
          text: "Clear learning objectives provide direction for both teaching and learning.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Learning objectives describe the knowledge or skills students should develop.",
    "Clear objectives help students focus, understand purpose, and monitor progress.",
    "Objectives should be introduced early and explained in simple, relevant language.",
  ],
  },
  {
    _id: planningLesson3Id,
    courseId: planningCourseId,
    skillId: pacingSkillId,
    order: 3,
    title: "Managing Time Effectively in a Lesson",
    lessonDescription:
      "This lesson explores how instructors can manage time effectively during a lesson. Pacing refers to how instructional time is distributed across different activities and explanations.",
    sections: [
    {
      heading: "The Importance of Pacing in Lesson Planning",
      blocks: [
        {
          type: "text",
          text: "Good pacing ensures that lessons move smoothly while giving students enough time to understand and practice new concepts.",
        },
        {
          type: "text",
          text: "Poor pacing can negatively affect learning.",
        },
        {
          type: "text",
          text: "For example:\n• moving too quickly may leave students confused\n• moving too slowly may reduce engagement",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher managing classroom time and student activities",
        },
        {
          type: "text",
          text: "Balanced pacing helps maintain student attention while allowing time for reflection and practice.",
        },
      ],
    },
    {
      heading: "Planning Lesson Timing",
      blocks: [
        {
          type: "text",
          text: "Many instructors structure lessons using three main phases:",
        },
        {
          type: "text",
          text: "Introduction\n• present the topic\n• explain learning objectives\n• activate prior knowledge",
        },
        {
          type: "text",
          text: "Learning activities\n• instruction and explanation\n• group discussions or exercises\n• guided practice",
        },
        {
          type: "text",
          text: "Conclusion\n• summarize key ideas\n• answer questions\n• reinforce important concepts",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Effective pacing requires flexibility. Teachers should monitor student understanding and adjust the lesson when necessary.",
        },
        {
          type: "text",
          text: "Strong pacing balances clarity, engagement, and time for practice.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Pacing affects student understanding and engagement.",
    "Lessons should be structured into introduction, activities, and conclusion.",
    "Effective instructors adjust pacing based on student needs.",
  ],
  },
  {
    _id: planningLesson4Id,
    courseId: planningCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Structuring an Effective Lesson",
    lessonDescription:
      "This lesson focuses on how instructors can organize lessons in a clear and logical structure. A well-structured lesson helps students follow the progression of ideas and understand how different activities support the learning goals.",
    sections: [
    {
      heading: "Core Components of a Structured Lesson",
      blocks: [
        {
          type: "text",
          text: "Most effective lessons include three main components:",
        },
        {
          type: "text",
          text: "1. Lesson Introduction\nThe instructor introduces the topic and connects it to previous knowledge.",
        },
        {
          type: "text",
          text: "This stage may include:\n• presenting learning objectives\n• asking introductory questions\n• explaining the relevance of the topic",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher introducing a lesson to students in a classroom",
        },
        {
          type: "text",
          text: "2. Instruction and Practice\nStudents explore the topic through explanations, demonstrations, and activities.",
        },
        {
          type: "text",
          text: "Examples include:\n• guided practice\n• problem-solving exercises\n• collaborative activities",
        },
        {
          type: "text",
          text: "3. Lesson Closure\nAt the end of the lesson, the instructor reinforces key concepts and encourages reflection.",
        },
        {
          type: "text",
          text: "This stage might include:\n• summarizing the main ideas\n• asking review questions\n• connecting the lesson to future topics",
        },
      ],
    },
    {
      heading: "Why Structure Matters",
      blocks: [
        {
          type: "text",
          text: "Clear lesson structure helps students:\n• follow the logical progression of ideas\n• remain focused during activities\n• understand how each part of the lesson contributes to learning",
        },
        {
          type: "text",
          text: "Structure provides a framework that guides both teaching and learning.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Effective lessons include introduction, instruction/practice, and closure.",
    "Clear structure helps students follow and stay engaged.",
    "Lesson structure connects activities to learning goals.",
  ],
  },
  {
    _id: planningLesson5Id,
    courseId: planningCourseId,
    skillId: assessmentSkillId,
    order: 5,
    title: "Planning Lessons with Assessment in Mind",
    lessonDescription:
      "This lesson explores how instructors can integrate assessment into lesson planning. Assessment should not be treated as a separate activity that happens only at the end of a lesson.",
    sections: [
    {
      heading: "The Role of Assessment in Lesson Planning",
      blocks: [
        {
          type: "text",
          text: "Effective lesson planning includes opportunities to evaluate student understanding throughout the learning process.",
        },
        {
          type: "text",
          text: "Assessments help instructors determine whether students are achieving the learning objectives.",
        },
        {
          type: "text",
          text: "When planning lessons, teachers often ask:\n• How will I know if students understood the concept?\n• What evidence will show that learning has occurred?",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher assessing student understanding in a classroom",
        },
        {
          type: "text",
          text: "Including assessment strategies during planning helps instructors monitor progress and adjust instruction when necessary.",
        },
      ],
    },
    {
      heading: "Types of Assessment in Lesson Planning",
      blocks: [
        {
          type: "text",
          text: "Informal Assessment\nThese occur naturally during the lesson.",
        },
        {
          type: "text",
          text: "Examples include:\n• asking questions\n• observing student participation\n• quick polls or quizzes",
        },
        {
          type: "text",
          text: "Formal Assessment\nThese are structured evaluations designed to measure learning outcomes.",
        },
        {
          type: "text",
          text: "Examples include:\n• quizzes\n• written assignments\n• presentations",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "When assessment is integrated into lesson planning, instructors gain valuable insights into student learning.",
        },
        {
          type: "text",
          text: "This allows instructors to adjust instruction and better support student improvement.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Assessment should be integrated throughout the lesson, not only at the end.",
    "Both informal and formal assessments provide insight into learning.",
    "Assessment helps instructors adjust teaching and support student progress.",
  ],
  },

  // =========================
  // Effective Communication
  // =========================
  {
    _id: effectiveCommunicationLesson1Id,
    courseId: effectiveCommunicationCourseId,
    skillId: explanationClaritySkillId,
    order: 1,
    title: "Communicating Clearly with Students",
    lessonDescription:
      "This lesson focuses on how instructors can communicate ideas clearly to students. Clear communication ensures that students understand instructions, expectations, and concepts without confusion.",
    sections: [
    {
      heading: "Why Clear Communication Matters",
      blocks: [
        {
          type: "text",
          text: "Clear communication ensures that students understand instructions, expectations, and concepts without confusion.",
        },
        {
          type: "text",
          text: "Clear communication is essential because it helps students:\n• understand instructions accurately\n• stay focused on learning objectives\n• reduce mistakes and confusion\n• feel more confident in their learning",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher explaining concepts clearly to students",
        },
        {
          type: "text",
          text: "Poor communication often leads to:\n• repeated questions\n• frustration\n• disengagement",
        },
      ],
    },
    {
      heading: "Strategies for Clear Communication",
      blocks: [
        {
          type: "text",
          text: "Use Simple and Direct Language\nAvoid unnecessary complexity. Use words that are easy to understand.",
        },
        {
          type: "text",
          text: "Example:\nInstead of saying\n“Utilize the provided resources,”\nsay\n“Use the materials provided.”",
        },
        {
          type: "text",
          text: "Break Information into Steps\nPresent information in smaller, manageable parts.",
        },
        {
          type: "text",
          text: "Example:\n• Read the instructions\n• Complete the activity\n• Submit your work",
        },
        {
          type: "text",
          text: "Check for Understanding\nAsk students if they understand before moving forward.",
        },
        {
          type: "text",
          text: "Example:\n“Can someone explain this in their own words?”",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Clear communication reduces confusion and helps students focus on learning.",
        },
        {
          type: "text",
          text: "When instructors communicate effectively, students can engage more confidently with the material.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Clear communication helps students understand instructions and stay focused.",
    "Simple language and step-by-step explanations improve clarity.",
    "Checking for understanding ensures students are following the lesson.",
  ],
  },
  {
  _id: effectiveCommunicationLesson2Id,
  courseId: effectiveCommunicationCourseId,
  skillId: studentEngagementSkillId,
  order: 2,
  title: "Active Listening in Teaching",
  lessonDescription:
    "This lesson focuses on active listening, a key communication skill that helps instructors understand student needs and respond effectively. Active listening goes beyond hearing—it requires attention, understanding, and thoughtful responses.",
  sections: [
    {
      heading: "Why Active Listening Matters",
      blocks: [
        {
          type: "text",
          text: "Active listening helps instructors better understand students and respond appropriately during learning.",
        },
        {
          type: "text",
          text: "Active listening helps instructors:\n• understand student questions clearly\n• identify misunderstandings\n• build trust with students\n• create a supportive learning environment",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher listening attentively to students in a classroom",
        },
        {
          type: "text",
          text: "Without active listening:\n• students may feel ignored\n• misunderstandings increase\n• communication becomes ineffective",
        },
      ],
    },
    {
      heading: "Strategies for Active Listening",
      blocks: [
        {
          type: "text",
          text: "Maintain Eye Contact\nShows attention and respect.",
        },
        {
          type: "text",
          text: "Ask Follow-up Questions\nEncourages deeper understanding.",
        },
        {
          type: "text",
          text: "Example:\n“Can you explain what part was confusing?”",
        },
        {
          type: "text",
          text: "Paraphrase Student Responses\nRepeat what the student said in your own words.",
        },
        {
          type: "text",
          text: "Example:\n“So you're saying that this concept is unclear, right?”",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Active listening strengthens communication and helps instructors respond more effectively to student needs.",
        },
        {
          type: "text",
          text: "When students feel heard, they are more likely to engage and participate in learning.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Active listening helps instructors understand student needs and misunderstandings.",
    "Eye contact, follow-up questions, and paraphrasing improve listening skills.",
    "Students engage more when they feel heard and understood.",
  ],
  },
  {
    _id: effectiveCommunicationLesson3Id,
    courseId: effectiveCommunicationCourseId,
    skillId: assessmentSkillId,
    order: 3,
    title: "Giving Constructive Feedback",
    lessonDescription:
      "This lesson focuses on how instructors provide feedback that supports learning and improvement. Constructive feedback helps students understand what they did well and how they can improve.",
    sections: [
    {
      heading: "Why Feedback Matters",
      blocks: [
        {
          type: "text",
          text: "Constructive feedback helps students understand their performance and improve their learning.",
        },
        {
          type: "text",
          text: "Constructive feedback is important because it helps students:\n• identify strengths\n• recognize mistakes\n• improve performance\n• stay motivated",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher giving feedback to a student",
        },
        {
          type: "text",
          text: "Without effective feedback:\n• students may repeat errors\n• progress may be unclear\n• motivation may decrease\n• learning opportunities may be missed",
        },
      ],
    },
    {
      heading: "Strategies for Constructive Feedback",
      blocks: [
        {
          type: "text",
          text: "Be Specific\nFeedback should clearly describe what the student did well or what needs improvement.",
        },
        {
          type: "text",
          text: "Example:\nInstead of saying\n“Good job,”\nsay\n“Your answer is clear and organized.”",
        },
        {
          type: "text",
          text: "Focus on Improvement\nFeedback should guide students toward the next step.",
        },
        {
          type: "text",
          text: "Example:\n“You explained the idea well. Now try adding one more example.”",
        },
        {
          type: "text",
          text: "Be Supportive\nFeedback should encourage students rather than discourage them.",
        },
        {
          type: "text",
          text: "Example:\n“You are on the right track. Let’s make the conclusion stronger.”",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Constructive feedback helps students learn from their work and improve with confidence.",
        },
        {
          type: "text",
          text: "When feedback is clear, specific, and supportive, students are more likely to stay motivated and make progress.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Constructive feedback helps students understand strengths and areas for improvement.",
    "Specific and actionable feedback guides better performance.",
    "Supportive feedback increases motivation and confidence.",
  ],
  },
  {
    _id: effectiveCommunicationLesson4Id,
    courseId: effectiveCommunicationCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Encouraging Two-Way Communication",
    lessonDescription:
      "This lesson focuses on two-way communication in teaching. Effective communication is not only about instructors delivering information, but also about creating opportunities for students to participate and share ideas.",
    sections: [
    {
      heading: "Why Two-Way Communication Matters",
      blocks: [
        {
          type: "text",
          text: "Two-way communication creates a more interactive and engaging learning environment.",
        },
        {
          type: "text",
          text: "Two-way communication helps students:\n• participate actively in learning\n• ask questions when confused\n• share ideas and perspectives\n• feel more involved in the lesson",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Students participating in a classroom discussion",
        },
        {
          type: "text",
          text: "Without two-way communication:\n• students may become passive\n• misunderstandings may go unnoticed\n• participation may decrease\n• engagement may be limited",
        },
      ],
    },
    {
      heading: "Strategies for Encouraging Two-Way Communication",
      blocks: [
        {
          type: "text",
          text: "Ask Open-Ended Questions\nQuestions with more than one possible answer encourage discussion.",
        },
        {
          type: "text",
          text: "Example:\n“How would you apply this idea in real life?”",
        },
        {
          type: "text",
          text: "Invite Student Participation\nCreate regular opportunities for students to respond, ask, or reflect.",
        },
        {
          type: "text",
          text: "Example:\n“What do you think about this example?”",
        },
        {
          type: "text",
          text: "Respond Respectfully\nStudents are more likely to participate when they feel their ideas are respected.",
        },
        {
          type: "text",
          text: "Example:\n“That’s an interesting point. Let’s explore it further.”",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Two-way communication makes learning more interactive and meaningful.",
        },
        {
          type: "text",
          text: "When students are encouraged to participate, they become more engaged and confident in expressing their ideas.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Two-way communication increases participation and engagement.",
    "Open-ended questions and respectful responses encourage interaction.",
    "Students learn more effectively when they actively contribute.",
  ],
  },
  {
    _id: effectiveCommunicationLesson5Id,
    courseId: effectiveCommunicationCourseId,
    skillId: explanationClaritySkillId,
    order: 5,
    title: "Using Nonverbal Communication Effectively",
    lessonDescription:
      "This lesson focuses on nonverbal communication, including facial expressions, gestures, eye contact, posture, and tone of voice. Nonverbal signals influence how students understand messages and how comfortable they feel in the classroom.",
    sections: [
    {
      heading: "Why Nonverbal Communication Matters",
      blocks: [
        {
          type: "text",
          text: "Nonverbal communication plays a key role in how students interpret messages and respond in a classroom.",
        },
        {
          type: "text",
          text: "Nonverbal communication helps instructors:\n• reinforce spoken messages\n• show confidence and clarity\n• create a welcoming environment\n• keep students attentive and engaged",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher using gestures and eye contact while teaching",
        },
        {
          type: "text",
          text: "Poor nonverbal communication may lead to:\n• mixed messages\n• student discomfort\n• reduced attention\n• misunderstandings",
        },
      ],
    },
    {
      heading: "Strategies for Effective Nonverbal Communication",
      blocks: [
        {
          type: "text",
          text: "Maintain Eye Contact\nEye contact shows attention, confidence, and connection with students.",
        },
        {
          type: "text",
          text: "Use Positive Facial Expressions\nA calm and approachable expression helps students feel comfortable.",
        },
        {
          type: "text",
          text: "Use Gestures and Tone Purposefully\nGestures can emphasize important points, and tone can make explanations clearer.",
        },
        {
          type: "text",
          text: "Example:\nUsing a calm tone when giving directions helps students focus and understand expectations.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Nonverbal communication supports and strengthens verbal communication.",
        },
        {
          type: "text",
          text: "When instructors use eye contact, tone, posture, and gestures effectively, students are more likely to feel engaged, respected, and clear about the message.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Nonverbal communication reinforces and clarifies verbal messages.",
    "Eye contact, facial expressions, and gestures improve engagement.",
    "Effective nonverbal cues help students feel comfortable and focused.",
  ],
  },

  // =========================
  // Fundamentals of Teaching
  // =========================
  {
    _id: fundamentalsTeachingLesson1Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: lessonStructureSkillId,
    order: 1,
    title: "Understanding Learning Objectives and Outcomes",
    lessonDescription:
      "This lesson focuses on how instructors define and use learning objectives to guide instruction. Learning objectives clarify what students should know or be able to do by the end of a lesson.",
    sections: [
    {
      heading: "Why Learning Objectives Matter",
      blocks: [
        {
          type: "text",
          text: "Effective teaching begins with clear outcomes. Without them, instruction can become unfocused, and students may not understand what they are expected to achieve.",
        },
        {
          type: "text",
          text: "Learning objectives help instructors:\n• define the purpose of the lesson\n• align activities with goals\n• measure student understanding\n• maintain instructional focus",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher explaining lesson objectives to students",
        },
        {
          type: "text",
          text: "Without clear objectives:\n• lessons may lack direction\n• activities may feel disconnected\n• assessment becomes ineffective\n• students may feel confused",
        },
      ],
    },
    {
      heading: "Strategies for Effective Objectives",
      blocks: [
        {
          type: "text",
          text: "Make Objectives Specific and Measurable\nObjectives should describe observable outcomes.",
        },
        {
          type: "text",
          text: "Example:\nInstead of\n“Understand the concept,”\nuse\n“Explain the concept using an example.”",
        },
        {
          type: "text",
          text: "Align Activities with Objectives\nEvery activity should support the intended outcome.",
        },
        {
          type: "text",
          text: "Communicate Objectives Clearly\nStudents should know what they are working toward.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Clear objectives guide both teaching and learning.",
        },
        {
          type: "text",
          text: "When objectives are specific and aligned with instruction, students are more likely to achieve meaningful learning outcomes.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Learning objectives define the purpose and direction of a lesson.",
    "Specific and measurable objectives improve clarity and outcomes.",
    "Aligned objectives help students achieve meaningful learning.",
  ],
  },
  {
    _id: fundamentalsTeachingLesson2Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: pacingSkillId,
    order: 2,
    title: "Managing Cognitive Load in Instruction",
    lessonDescription:
      "This lesson focuses on how instructors manage cognitive load—the amount of mental effort required to learn new information. When lessons are too complex or too fast, students may feel overwhelmed and struggle to process information.",
    sections: [
    {
      heading: "Why Cognitive Load Matters",
      blocks: [
        {
          type: "text",
          text: "Effective instructors balance information, pacing, and support to ensure learning remains manageable.",
        },
        {
          type: "text",
          text: "Managing cognitive load helps:\n• prevent student overload\n• improve comprehension\n• support long-term retention\n• maintain engagement",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Students concentrating while learning new material",
        },
        {
          type: "text",
          text: "Poor cognitive load management leads to:\n• confusion\n• frustration\n• reduced learning\n• disengagement",
        },
      ],
    },
    {
      heading: "Strategies for Managing Cognitive Load",
      blocks: [
        {
          type: "text",
          text: "Break Content into Chunks\nPresent information in smaller, manageable parts.",
        },
        {
          type: "text",
          text: "Use Examples Before Practice\nModel thinking before expecting students to apply it.",
        },
        {
          type: "text",
          text: "Control the Pace\nAllow time for processing and questions.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Learning is more effective when information is presented in manageable amounts.",
        },
        {
          type: "text",
          text: "Balancing complexity and pacing supports deeper understanding.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Cognitive load affects comprehension, retention, and engagement.",
    "Breaking content into chunks and pacing instruction improves learning.",
    "Managing cognitive load helps prevent confusion and frustration.",
  ],
  },
  {
    _id: fundamentalsTeachingLesson3Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: studentEngagementSkillId,
    order: 3,
    title: "Differentiating Instruction for Diverse Learners",
    lessonDescription:
      "This lesson explores how instructors adapt instruction to meet the needs of diverse learners. Effective teaching requires recognizing differences in ability, pace, and learning preferences, and adjusting instruction accordingly.",
    sections: [
    {
      heading: "Why Differentiation Matters",
      blocks: [
        {
          type: "text",
          text: "In any classroom, students vary in prior knowledge, learning pace, confidence, and preferred ways of learning.",
        },
        {
          type: "text",
          text: "Differentiation helps instructors:\n• support learners with different ability levels\n• increase student engagement\n• reduce frustration and confusion\n• ensure all students can participate meaningfully",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Diverse group of students learning together in a classroom",
        },
        {
          type: "text",
          text: "Without differentiation:\n• some students may fall behind\n• others may lose interest due to lack of challenge\n• participation may decrease\n• learning gaps may widen",
        },
      ],
    },
    {
      heading: "Strategies for Differentiation",
      blocks: [
        {
          type: "text",
          text: "Provide Multiple Examples\nExplain concepts using different contexts and formats.",
        },
        {
          type: "text",
          text: "Example:\nUse both real-world examples and visual explanations.",
        },
        {
          type: "text",
          text: "Adjust Task Difficulty\nOffer optional challenges or scaffolding.",
        },
        {
          type: "text",
          text: "Example:\nProvide guided steps for beginners and extension tasks for advanced learners.",
        },
        {
          type: "text",
          text: "Use Varied Instructional Methods\nCombine explanation, discussion, visuals, and hands-on practice.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Effective instruction is flexible.",
        },
        {
          type: "text",
          text: "When instructors adapt their teaching to meet diverse needs, more students can engage and succeed.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Differentiation supports diverse learners and improves engagement.",
    "Flexible instruction helps reduce frustration and learning gaps.",
    "Adapting teaching methods allows more students to succeed.",
  ],
  },
  {
    _id: fundamentalsTeachingLesson4Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: assessmentSkillId,
    order: 4,
    title: "Monitoring and Adjusting Instruction in Real Time",
    lessonDescription:
      "This lesson focuses on how instructors monitor student understanding during a lesson and adjust instruction accordingly. Teaching requires continuous observation and responsive decision-making.",
    sections: [
    {
      heading: "Why Monitoring Matters",
      blocks: [
        {
          type: "text",
          text: "Effective instructors pay attention to student responses, body language, and participation levels to determine whether learning is taking place.",
        },
        {
          type: "text",
          text: "Monitoring helps instructors:\n• identify misunderstandings early\n• adjust instruction effectively\n• maintain student engagement\n• improve learning outcomes",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher observing students and adjusting instruction during class",
        },
        {
          type: "text",
          text: "Without monitoring:\n• confusion may go unnoticed\n• instruction may continue at the wrong level\n• students may disengage\n• learning gaps may increase",
        },
      ],
    },
    {
      heading: "Strategies for Monitoring and Adjustment",
      blocks: [
        {
          type: "text",
          text: "Ask Checking-for-Understanding Questions\nUse short questions to assess comprehension.",
        },
        {
          type: "text",
          text: "Example:\n“Can someone summarize this idea?”",
        },
        {
          type: "text",
          text: "Observe Student Behavior\nLook for signs such as confusion, hesitation, or disengagement.",
        },
        {
          type: "text",
          text: "Adjust Instruction Immediately\nClarify, slow down, or provide examples when needed.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Effective teaching is responsive.",
        },
        {
          type: "text",
          text: "Instructors who monitor and adjust in real time can better support student learning.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Monitoring helps detect misunderstandings early.",
    "Real-time adjustments improve engagement and learning outcomes.",
    "Responsive teaching supports student success.",
  ],
  },
  {
    _id: fundamentalsTeachingLesson5Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: lessonStructureSkillId,
    order: 5,
    title: "Building a Positive and Productive Learning Environment",
    lessonDescription:
      "This lesson focuses on creating a learning environment that supports student engagement, respect, and participation. A positive classroom environment helps students feel safe, valued, and motivated to learn.",
    sections: [
    {
      heading: "Why Learning Environment Matters",
      blocks: [
        {
          type: "text",
          text: "The learning environment directly affects student behavior and overall success.",
        },
        {
          type: "text",
          text: "A positive environment helps:\n• increase student participation\n• build trust and respect\n• reduce disruptive behavior\n• support consistent learning",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Positive and engaging classroom environment with students participating",
        },
        {
          type: "text",
          text: "A negative environment may lead to:\n• disengagement\n• conflict\n• lack of focus\n• reduced motivation",
        },
      ],
    },
    {
      heading: "Strategies for Building a Positive Environment",
      blocks: [
        {
          type: "text",
          text: "Set Clear Expectations\nExplain rules and expectations early.",
        },
        {
          type: "text",
          text: "Be Consistent\nApply rules fairly and consistently.",
        },
        {
          type: "text",
          text: "Build Respectful Relationships\nShow respect and support toward students.",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "A strong learning environment supports both behavior and learning.",
        },
        {
          type: "text",
          text: "When students feel respected and supported, they are more likely to engage and succeed.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "A positive environment increases engagement and participation.",
    "Clear expectations and consistency improve classroom management.",
    "Respectful relationships support student success.",
  ],
  },

  // =========================
  // Assessment and Feedback
  // =========================
  {
    _id: assessmentFeedbackLesson1Id,
    courseId: assessmentFeedbackCourseId,
    skillId: studentEngagementSkillId,
    order: 1,
    title: "Encouraging Student Participation in Assessment",
    lessonDescription:
      "This lesson explores how instructors can increase student engagement during assessment and feedback processes. When students actively participate, assessment becomes a learning tool rather than just a grading mechanism.",
    sections: [
    {
      heading: "Why Engagement Matters in Assessment",
      blocks: [
        {
          type: "text",
          text: "Traditional assessment often places students in a passive role where they simply receive grades. Active engagement transforms assessment into a collaborative learning experience.",
        },
        {
          type: "text",
          text: "When students are involved in assessment, they:\n• develop stronger critical thinking skills\n• reflect on their own learning progress\n• better understand evaluation criteria\n• become more motivated to improve",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Students reviewing and discussing work together",
        },
        {
          type: "text",
          text: "Engagement turns assessment into an opportunity for learning rather than judgment.",
        },
      ],
    },
    {
      heading: "Strategies to Increase Engagement",
      blocks: [
        {
          type: "text",
          text: "Self-assessment\nStudents evaluate their own work using a rubric or checklist.",
        },
        {
          type: "text",
          text: "Example:\nBefore submitting an assignment, students review their work and identify one strength and one area for improvement.",
        },
        {
          type: "text",
          text: "Peer assessment\nStudents review and provide feedback on each other's work.",
        },
        {
          type: "text",
          text: "Benefits include:\n• exposure to different perspectives\n• stronger analytical skills\n• improved understanding of evaluation criteria",
        },
        {
          type: "text",
          text: "Reflection activities\nShort reflection questions help students process feedback.",
        },
        {
          type: "text",
          text: "Example questions:\n• What did you do well in this task?\n• What would you change next time?",
        },
      ],
    },
    {
      heading: "Key Insight",
      blocks: [
        {
          type: "text",
          text: "Assessment becomes more effective when students actively participate in understanding their performance.",
        },
        {
          type: "text",
          text: "When students are involved, assessment supports learning rather than just measuring it.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Active participation turns assessment into a learning process.",
    "Self and peer assessment improve reflection and understanding.",
    "Engaged students are more motivated to improve their work.",
  ],
  },
  {
    _id: assessmentFeedbackLesson2Id,
    courseId: assessmentFeedbackCourseId,
    skillId: explanationClaritySkillId,
    order: 2,
    title: "Giving Clear Explanations in Feedback",
    lessonDescription:
      "This lesson focuses on how instructors can provide clear, constructive, and meaningful feedback. Clear explanations help students understand their performance and guide them toward improvement.",
    sections: [
    {
      heading: "What Clear Feedback Looks Like",
      blocks: [
        {
          type: "text",
          text: "Without clear feedback, students may know their result, but not understand how to improve.",
        },
        {
          type: "text",
          text: "Effective feedback should answer three key questions:\n• What was done well?\n• What needs improvement?\n• How can the student improve it?",
        },
        {
          type: "text",
          text: "Instead of vague comments, feedback should provide specific guidance.",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher reviewing student work and providing written feedback",
        },
        {
          type: "text",
          text: "Example\n❌ Vague feedback\n“Good work.”\nStudents may feel encouraged, but they do not know what was successful.",
        },
        {
          type: "text",
          text: "✅ Clear feedback\n“Your argument is well structured, but adding supporting examples would make your explanation stronger.”\nThis type of feedback provides actionable information.",
        },
      ],
    },
    {
      heading: "Common Feedback Mistakes",
      blocks: [
        {
          type: "text",
          text: "Instructors sometimes unintentionally provide feedback that is difficult to interpret.",
        },
        {
          type: "text",
          text: "Examples include:\n• overly general comments\n• excessive criticism without guidance\n• feedback that focuses only on mistakes",
        },
        {
          type: "text",
          text: "These approaches can reduce student motivation.",
        },
      ],
    },
    {
      heading: "Best Practices for Clear Feedback",
      blocks: [
        {
          type: "text",
          text: "Effective instructors often follow these principles:\n• focus on specific aspects of the work\n• balance positive feedback and improvement suggestions\n• use simple and precise language\n• provide examples when possible",
        },
        {
          type: "text",
          text: "Clear feedback helps students understand how to improve their learning strategies.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Clear feedback explains strengths, areas for improvement, and next steps.",
    "Vague or overly critical feedback can reduce motivation.",
    "Specific, balanced, and simple feedback is easier for students to apply.",
  ],
  },
  {
    _id: assessmentFeedbackLesson3Id,
    courseId: assessmentFeedbackCourseId,
    skillId: pacingSkillId,
    order: 3,
    title: "Managing the Timing of Feedback",
    lessonDescription:
      "This lesson examines the role of timing in feedback delivery. Feedback is most effective when it is delivered at the right moment in the learning process.",
    sections: [
    {
      heading: "Why Timing Matters",
      blocks: [
        {
          type: "text",
          text: "When feedback is delayed too long, students may lose the connection between their actions and the feedback they receive.",
        },
        {
          type: "text",
          text: "Timely feedback helps students:\n• remember their reasoning during a task\n• identify mistakes while the material is still fresh\n• apply corrections in future activities",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher giving feedback to students during a lesson",
        },
        {
          type: "text",
          text: "When feedback is provided quickly, learning becomes more continuous and responsive.",
        },
      ],
    },
    {
      heading: "Types of Feedback Timing",
      blocks: [
        {
          type: "text",
          text: "Immediate Feedback\nGiven during an activity or shortly after completion.",
        },
        {
          type: "text",
          text: "Example:\nA teacher corrects misconceptions during a class discussion.",
        },
        {
          type: "text",
          text: "Benefits:\n• prevents misunderstandings from spreading\n• reinforces correct thinking",
        },
        {
          type: "text",
          text: "Delayed Feedback\nProvided after students have completed a task and had time to reflect.",
        },
        {
          type: "text",
          text: "Example:\nWritten feedback on an essay returned the following week.",
        },
        {
          type: "text",
          text: "Benefits:\n• encourages deeper reflection\n• allows for more detailed analysis",
        },
      ],
    },
    {
      heading: "Balancing Feedback Timing",
      blocks: [
        {
          type: "text",
          text: "Professional instructors often combine both approaches:\n• immediate feedback for skill practice\n• delayed feedback for complex assignments",
        },
        {
          type: "text",
          text: "This balance helps maintain learning momentum while supporting deeper understanding.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Timely feedback helps students connect actions with results.",
    "Immediate feedback prevents misunderstandings and reinforces learning.",
    "Delayed feedback supports deeper reflection and analysis.",
    "Balancing both types improves overall learning effectiveness.",
  ],
  },
  {
    _id: assessmentFeedbackLesson4Id,
    courseId: assessmentFeedbackCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Structuring Assessments and Feedback",
    lessonDescription:
      "This lesson explores how clear structure in assessments and feedback improves student understanding and fairness in evaluation. Organized and transparent assessment helps students understand expectations and evaluation criteria.",
    sections: [
    {
      heading: "Elements of Well-Structured Assessment",
      blocks: [
        {
          type: "text",
          text: "When assessments are organized and transparent, students know what is expected and how their work will be evaluated.",
        },
        {
          type: "text",
          text: "Effective assessments typically include:\n• clear learning objectives\n• transparent evaluation criteria\n• structured feedback processes",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher reviewing structured assessment materials with rubric",
        },
        {
          type: "text",
          text: "These elements help create predictable and fair evaluation environments.",
        },
      ],
    },
    {
      heading: "The Role of Rubrics",
      blocks: [
        {
          type: "text",
          text: "Rubrics are commonly used tools that define levels of performance for specific criteria.",
        },
        {
          type: "text",
          text: "Example rubric criteria might include:\n• clarity of explanation\n• use of supporting evidence\n• organization of ideas",
        },
        {
          type: "text",
          text: "Rubrics help students understand:\n• what high-quality work looks like\n• how their performance will be measured",
        },
      ],
    },
    {
      heading: "Why Structure Improves Learning",
      blocks: [
        {
          type: "text",
          text: "When students clearly understand expectations, they can:\n• focus on developing relevant skills\n• monitor their progress\n• apply feedback more effectively",
        },
        {
          type: "text",
          text: "Structured assessments make learning goals visible and achievable.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Structured assessments improve clarity and fairness.",
    "Rubrics help students understand expectations and performance levels.",
    "Clear structure supports better learning and application of feedback.",
  ],
  },
  {
    _id: assessmentFeedbackLesson5Id,
    courseId: assessmentFeedbackCourseId,
    skillId: assessmentSkillId,
    order: 5,
    title: "Using Assessment to Improve Learning",
    lessonDescription:
      "This lesson focuses on how assessment can support continuous learning improvement rather than simply measuring performance. Assessment guides both student learning and instructional decisions.",
    sections: [
    {
      heading: "Assessment as a Learning Tool",
      blocks: [
        {
          type: "text",
          text: "Effective instructors analyze assessment results to understand how students are learning.",
        },
        {
          type: "text",
          text: "Assessment data can help teachers:\n• identify common misunderstandings\n• adjust teaching strategies\n• provide targeted feedback",
        },
        {
          type: "image",
          imgUrl: "https://images.unsplash.com/photo-1584697964403-6f5d2d3c4f6b?auto=format&fit=crop&w=1200&q=80",
          imgAlt: "Teacher reviewing student performance and adjusting instruction",
        },
        {
          type: "text",
          text: "In this way, assessment becomes a diagnostic tool for learning.",
        },
      ],
    },
    {
      heading: "Formative vs Summative Assessment",
      blocks: [
        {
          type: "text",
          text: "Formative Assessment\nOccurs during the learning process.",
        },
        {
          type: "text",
          text: "Examples:\n• quizzes\n• discussions\n• draft submissions",
        },
        {
          type: "text",
          text: "Purpose:\n• monitor progress\n• guide improvement",
        },
        {
          type: "text",
          text: "Summative Assessment\nOccurs at the end of a learning unit.",
        },
        {
          type: "text",
          text: "Examples:\n• final exams\n• final projects\n• certification tests",
        },
        {
          type: "text",
          text: "Purpose:\n• evaluate overall achievement",
        },
      ],
    },
    {
      heading: "The Learning Cycle",
      blocks: [
        {
          type: "text",
          text: "Effective assessment and feedback create a continuous cycle:",
        },
        {
          type: "text",
          text: "• Students complete a task\n• Teachers evaluate performance\n• Feedback identifies strengths and improvements\n• Students apply feedback in future work",
        },
        {
          type: "text",
          text: "This cycle supports ongoing skill development and deeper learning.",
        },
      ],
    },
  ],
  keyTakeaways: [
    "Assessment can guide learning, not just measure it.",
    "Formative assessment supports progress, while summative evaluates outcomes.",
    "Using assessment data helps instructors improve teaching strategies.",
    "Continuous feedback cycles lead to deeper learning and improvement.",
  ],
  },
]);

    await quizzes.insertMany([
      // Empathy - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "During a lesson, several learners become quiet, avoid eye contact, and stop responding to questions. The overall energy in the room drops.",
        questionType: "multiple-choice",
        question:
          "Which response BEST supports engagement while maintaining instructional flow?",
        option: [
          "Continue delivering the content to stay on schedule and avoid losing time.",
          "Pause briefly to acknowledge possible confusion, then restate the key idea more clearly before continuing.",
          "Call on specific disengaged students to answer questions and increase accountability.",
          "Skip the current explanation and move to a more interactive activity immediately.",
        ],
        answer:
          "Pause briefly to acknowledge possible confusion, then restate the key idea more clearly before continuing.",
        review:
          "Effective instructors balance empathy with structure. Briefly acknowledging confusion helps re-engage learners without disrupting lesson flow. Simply continuing ignores the signal, while calling out students or abruptly changing activities may increase discomfort or confusion.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "After explaining a concept, one learner shows visible frustration and says, “I still don’t get it.” Other students begin to lose focus.",
        questionType: "multiple-choice",
        question:
          "Which response BEST demonstrates empathy while improving explanation clarity?",
        option: [
          "Repeat the explanation more slowly using the same approach.",
          "Acknowledge the difficulty, then reframe the concept using simpler language or a different example.",
          "Ask the learner to review the material independently after class.",
          "Move on to keep the lesson on schedule and avoid slowing down others.",
        ],
        answer:
          "Acknowledge the difficulty, then reframe the concept using simpler language or a different example.",
        review:
          "Empathy involves recognizing learner frustration and adjusting instruction accordingly. Reframing the concept using simpler language or a different example improves clarity while maintaining engagement. Simply repeating or moving on ignores the underlying issue.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "You ask a question during the lesson, and the room becomes quiet. Several learners avoid eye contact while thinking.",
        questionType: "multiple-choice",
        question:
          "Which response BEST supports appropriate pacing while maintaining a supportive learning environment?",
        option: [
          "Call on a specific learner immediately to keep the lesson moving.",
          "Move on to the next point to avoid losing time.",
          "Pause briefly to allow processing time before prompting or rephrasing the question.",
          "Show visible frustration to encourage quicker responses.",
        ],
        answer:
          "Pause briefly to allow processing time before prompting or rephrasing the question.",
        review:
          "Silence often indicates cognitive processing rather than disengagement. Allowing brief wait time supports comprehension and reduces pressure. Effective instructors balance pacing with learner needs by giving time before intervening.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson1Id,
        scenario:
          "During an activity, a learner questions your instructions and expresses concern about their relevance. Other students begin to pay attention to the exchange.",
        questionType: "multiple-choice",
        question:
          "Which response BEST maintains lesson structure while demonstrating empathy?",
        option: [
          "Ignore the comment and continue the activity to avoid disruption.",
          "Respond firmly to reassert authority and keep students on task.",
          "Acknowledge the concern, then clarify the purpose of the activity and restate the learning objective.",
          "Pause the activity entirely to address the concern in detail before continuing.",
          ],
          answer:
            "Acknowledge the concern, then clarify the purpose of the activity and restate the learning objective.",
          review:
            "Effective instructors balance empathy with structure. Acknowledging the concern shows respect, while restating the objective maintains focus. Ignoring or reacting defensively can reduce engagement, and over-extending the discussion may disrupt lesson flow.",
        },
        {
          _id: new ObjectId(),
          lessonId: empathyLesson1Id,
          scenario:
            "After completing an activity, several learners appear uncertain and hesitant, but no one asks questions.",
          questionType: "multiple-choice",
          question:
            "Which action BEST supports effective assessment while remaining responsive to learners?",
          option: [
            "Assume understanding since no questions were asked and continue the lesson.",
            "Move on quickly to stay on schedule.",
            "Ask a brief checking-for-understanding question to confirm learning before proceeding.",
            "Assign follow-up work to address any confusion independently.",
          ],
          answer:
            "Ask a brief checking-for-understanding question to confirm learning before proceeding.",
          review:
            "Empathy involves recognizing that silence does not always indicate understanding. Checking for understanding allows instructors to assess learning in real time and adjust instruction if needed.",
        },

      // Empathy - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
        scenario:
          "During a discussion, several learners stop contributing, avoid eye contact, and remain silent when prompted.",
        questionType: "multiple-choice",
        question:
          "What is the MOST appropriate initial interpretation of this behavior?",
        option: [
          "The learners are losing interest in the topic.",
          "The learners are intentionally disengaging from the activity.",
          "The learners may be experiencing confusion or uncertainty about the content.",
          "The learners are challenging the instructor’s authority.",
        ],
        answer:
          "The learners may be experiencing confusion or uncertainty about the content.",
        review:
          "Learner behavior should be interpreted as a signal rather than a personal challenge. Silence and disengagement often indicate confusion, uncertainty, or cognitive overload rather than lack of interest or respect.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
        scenario:
          "After explaining instructions, one learner shows visible frustration and hesitates to begin the task, while others appear uncertain.",
        questionType: "multiple-choice",
        question:
          "Which response is MOST likely to address the underlying issue effectively?",
        option: [
          "Repeat the same instructions more quickly to keep the lesson moving.",
          "Clarify expectations, check for understanding, and adjust the explanation if needed.",
          "Direct the learner to review the syllabus independently.",
          "Ignore the reaction and allow learners to figure it out themselves.",
        ],
        answer:
          "Clarify expectations, check for understanding, and adjust the explanation if needed.",
        review:
          "Frustration often signals unclear instructions or misunderstanding. Effective instructors respond by clarifying expectations and checking understanding, rather than repeating or ignoring the issue.",
      },
      {
        id: new ObjectId(),
        lessonId: empathyLesson2Id,
        scenario:
          "During a fast-paced explanation, you notice that learners become quieter, stop volunteering responses, and seem hesitant to continue.",
        questionType: "multiple-choice",
        question:
          "Which response is MOST appropriate based on this change in learner behavior?",
        option: [
          "Maintain the current pace to preserve momentum and complete the explanation.",
          "Slow the pace, clarify the key point, and check whether learners are following.",
          "Shift immediately to independent work so learners can process on their own.",
          "Call on a learner right away to keep participation active.",
        ],
        answer:
          "Slow the pace, clarify the key point, and check whether learners are following.",
        review:
          "A sudden drop in participation during a fast explanation often signals confusion or cognitive overload. Effective instructors respond by adjusting pacing and checking comprehension rather than assuming disengagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
        scenario:
          "A learner questions the value of an activity and asks why it is necessary for the lesson.",
        questionType: "multiple-choice",
        question:
          "What is the MOST productive interpretation of this behavior?",
        option: [
          "The learner is resisting the instructor’s authority.",
          "The learner may be uncertain about the purpose or relevance of the activity.",
          "The learner is attempting to disrupt the lesson.",
          "The learner is showing disrespect toward the class.",
        ],
        answer:
          "The learner may be uncertain about the purpose or relevance of the activity.",
        review:
          "Questions about relevance often reflect uncertainty about lesson goals rather than disrespect. Interpreting the behavior accurately helps instructors respond with clarity instead of defensiveness.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson2Id,
        scenario:
          "After completing an activity, several learners remain silent when asked whether they understood the task outcomes.",
        questionType: "multiple-choice",
        question:
          "Which action is MOST effective at this point?",
        option: [
          "Assume understanding because no learner raised a concern.",
          "Move on to the next part of the lesson to stay on schedule.",
          "Use a brief checking-for-understanding prompt to confirm what learners understood.",
          "End the activity and return to the topic later.",
        ],
        answer:
          "Use a brief checking-for-understanding prompt to confirm what learners understood.",
        review:
          "Silence does not necessarily indicate understanding. A short formative check helps instructors identify hidden confusion and make timely adjustments before moving forward.",
      },

      // Empathy - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
        scenario:
          "During a lesson, a learner challenges your explanation with a sharp tone in front of the class, and other students begin to watch closely.",
        questionType: "multiple-choice",
        question:
          "Which response BEST maintains engagement while preserving professional authority?",
        option: [
          "Respond firmly to reassert authority and prevent further challenge.",
          "Ignore the comment and continue the explanation without acknowledging it.",
          "Acknowledge the concern calmly, then respond constructively while keeping focus on the lesson.",
          "Stop the discussion immediately to avoid disruption.",
        ],
        answer:
          "Acknowledge the concern calmly, then respond constructively while keeping focus on the lesson.",
        review:
          "Professional instructors regulate their reactions and respond intentionally. A calm acknowledgment reduces tension, maintains engagement, and preserves authority without escalating the situation.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
        scenario:
          "After giving instructions multiple times, several learners still misunderstand the task, and you begin to feel frustrated.",
        questionType: "multiple-choice",
        question:
          "What is the MOST effective professional response in this situation?",
        option: [
          "Repeat the same instructions more loudly to ensure attention.",
          "Pause briefly, then clarify and reframe the instructions calmly using a different approach.",
          "Express your frustration to encourage learners to focus more carefully.",
          "Move on to avoid losing more time on the explanation.",
        ],
        answer:
          "Pause briefly, then clarify and reframe the instructions calmly using a different approach.",
        review:
          "Recognizing emotional reactions and choosing a measured response is key to professional teaching. Reframing instructions improves clarity, while staying calm maintains authority and supports learner understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
        scenario:
          "After asking a question, the room becomes quiet. Several learners look down or pause to think, and you begin to feel uncomfortable with the silence.",
        questionType: "multiple-choice",
        question:
          "Which response BEST supports effective pacing while maintaining a supportive environment?",
        option: [
          "Call on a learner immediately to reduce silence.",
          "Pause briefly to allow processing time before prompting or rephrasing.",
          "Move on to the next point to avoid losing momentum.",
          "Express impatience to encourage quicker responses.",
        ],
        answer:
          "Pause briefly to allow processing time before prompting or rephrasing.",
        review:
          "Silence often reflects cognitive processing rather than disengagement. Allowing wait time supports understanding and reduces pressure, while premature intervention can interrupt thinking.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
        scenario:
          "A learner questions the purpose of an activity, and you feel a sense of irritation in response.",
        questionType: "multiple-choice",
        question:
          "What should guide your response in this moment?",
        option: [
          "Respond emotionally to reinforce authority.",
          "Restate the learning objective clearly and connect it to the activity.",
          "Cancel the activity to avoid further challenge.",
          "Ignore the learner and continue the lesson.",
        ],
        answer:
          "Restate the learning objective clearly and connect it to the activity.",
        review:
          "Professional responses are guided by clarity rather than emotion. Reconnecting the activity to its objective maintains structure while addressing the learner’s concern.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson3Id,
        scenario:
          "After a tense interaction with a learner, you notice the class atmosphere feels unsettled and participation decreases.",
        questionType: "multiple-choice",
        question:
          "What is the MOST effective next step to restore engagement?",
        option: [
          "Continue the lesson without addressing the shift in atmosphere.",
          "Use a brief checking-for-understanding prompt to refocus attention on learning.",
          "End the lesson early to avoid further tension.",
          "Address the learner’s behavior in front of the class.",
        ],
        answer:
          "Use a brief checking-for-understanding prompt to refocus attention on learning.",
        review:
          "After emotional moments, effective instructors redirect focus back to learning. A quick check for understanding helps stabilize the classroom and re-engage learners.",
      },

      // Empathy - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario:
          "During instruction, one learner appears distracted and stops following along, while nearby students begin noticing the behavior.",
        questionType: "multiple-choice",
        question:
          "Which response BEST maintains engagement without increasing defensiveness?",
        option: [
          "Ask, “Why are you not paying attention?” so the learner refocuses immediately.",
          "Use neutral language to redirect attention, such as, “Let’s focus on this part together.”",
          "Ignore the behavior unless the learner becomes disruptive.",
          "Publicly point out the distraction to reinforce expectations.",
        ],
        answer:
          "Use neutral language to redirect attention, such as, “Let’s focus on this part together.”",
        review:
          "Empathy-based communication reduces defensiveness while maintaining engagement. Neutral redirection helps the learner rejoin the activity without embarrassment or escalation.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario:
          "After giving instructions, several learners hesitate and appear unsure about what to do next.",
        questionType: "multiple-choice",
        question:
          "Which communication response is MOST effective in this situation?",
        option: [
          "Repeat the instructions exactly as before so learners hear them again.",
          "Simplify the wording, clarify the expectations, and restate the next step clearly.",
          "Move on quickly so learners can figure it out during the activity.",
          "Remind learners that they should have listened more carefully.",
        ],
        answer:
          "Simplify the wording, clarify the expectations, and restate the next step clearly.",
        review:
          "When learners appear confused, clarity matters more than repetition. Reframing instructions in simpler language supports understanding and keeps the lesson moving productively.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario:
          "While explaining a concept, a learner asks for clarification before you finish the explanation.",
        questionType: "multiple-choice",
        question:
          "What is the MOST effective response if you want to support understanding while maintaining lesson flow?",
        option: [
          "Ignore the question and continue so the explanation is not interrupted.",
          "Pause briefly, respond to the clarification need, and then return to the explanation.",
          "Tell the learner to wait until the end regardless of the level of confusion.",
          "Show frustration to discourage further interruptions.",
        ],
        answer:
          "Pause briefly, respond to the clarification need, and then return to the explanation.",
        review:
          "Brief clarification can prevent confusion from building. Effective instructors adjust communication pacing when needed while still maintaining the overall structure of the lesson.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario: "A discussion begins drifting off-topic.",
        questionType: "multiple-choice",
        question: "Which response best redirects the discussion while preserving learner participation and maintaining alignment with the lesson goal?",
        option: [
          "This is not relevant right now, so let's stop this line of discussion.",
          "Let's connect that idea back to today's objective and see how it supports our main topic.",
          "That's an interesting point, but we need to move on without discussing it further.",
          "We'll leave that aside for now and return to the original material immediately.",
        ],
        answer: "Let's connect that idea back to today's objective and see how it supports our main topic.",
        review:
          "The strongest response redirects the conversation without shutting learners down. It preserves participation while re-establishing alignment with the lesson objective.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson4Id,
        scenario: "You are unsure if learners understand instructions.",
        questionType: "multiple-choice",
        question: "Which prompt most effectively checks learner understanding while encouraging active processing rather than passive agreement?",
        option: [
          "Does everyone understand what to do next?",
          "Can someone summarize the next step in their own words?",
          "This should be clear, so let's continue.",
          "If there are no questions, I will assume everyone understands.",
        ],
        answer: "Can someone summarize the next step in their own words?",
        review:
          "Having a learner restate the next step provides stronger evidence of understanding than yes/no checking, which can hide confusion.",
      },

      // Empathy - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
        scenario:
          "During group work, one learner begins making sarcastic comments that distract others.",
        questionType: "multiple-choice",
        question: "Which response most effectively addresses the disruptive behavior while preserving group engagement and minimizing escalation?",
        option: [
          "Call out the learner's behavior in front of the group to discourage further disruption.",
          "Ignore the comments so the learner does not receive attention.",
          "Calmly redirect the learner's focus back to the task while maintaining a neutral tone.",
          "Pause the activity and address the issue with the entire group immediately.",
        ],
        answer: "Calmly redirect the learner's focus back to the task while maintaining a neutral tone.",
        review:
          "The most effective response minimizes disruption without escalating tension or drawing unnecessary attention, while keeping the group focused on the task.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
        scenario: "A learner challenges the purpose of an assignment.",
        questionType: "multiple-choice",
        question: "Which response best reduces resistance while reinforcing the instructional purpose of the task?",
        option: [
          "Reassert your authority and explain that the assignment must be completed.",
          "Restate the learning objective and explain how the assignment supports it.",
          "Acknowledge the concern but move forward without addressing it in detail.",
          "Offer to skip the assignment if multiple learners seem unsure.",
        ],
        answer: "Restate the learning objective and explain how the assignment supports it.",
        review:
          "Connecting the task to clear learning goals increases student buy-in and reduces resistance more effectively than authority or avoidance.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
        scenario: "A tense exchange slows down the lesson significantly.",
        questionType: "multiple-choice",
        question: "What is the most effective next step to restore instructional flow without ignoring the classroom climate?",
        option: [
          "Continue addressing the disagreement until it is fully resolved before moving on.",
          "Pause briefly, acknowledge the situation, and transition calmly back to the lesson.",
          "End the lesson early to avoid further disruption.",
          "Assign additional work to regain control of the class.",
        ],
        answer: "Pause briefly, acknowledge the situation, and transition calmly back to the lesson.",
        review:
          "A brief reset acknowledges the tension while preventing it from dominating the lesson, allowing instruction to continue effectively.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
        scenario:
          "A learner repeatedly interrupts the lesson with unrelated comments.",
        questionType: "multiple-choice",
        question: "Which response best maintains lesson structure while respecting the learner's participation?",
        option: [
          "Directly tell the learner to stop interrupting so the lesson can continue.",
          "Ignore the interruptions to avoid reinforcing the behavior.",
          "Briefly acknowledge the comment and guide the discussion back to the lesson objective.",
          "Allow the learner to finish speaking each time before continuing the lesson.",
        ],
        answer:
          "Briefly acknowledge the comment and guide the discussion back to the lesson objective.",
        review:
          "Acknowledging the learner maintains respect, while redirecting ensures the lesson remains structured and focused.",
      },
      {
        _id: new ObjectId(),
        lessonId: empathyLesson5Id,
        scenario:
          "After a difficult interaction, you are unsure whether learners are still focused.",
        questionType: "multiple-choice",
        question: "What strategy most effectively re-establishes learner focus and confirms understanding without disrupting lesson flow?",
        option: [
          "Continue the lesson as planned to maintain pacing.",
          "Ask a quick, targeted question that requires learners to demonstrate understanding.",
          "Re-explain the entire instruction from the beginning.",
          "Move to a different activity to reset the class.",
        ],
        answer: "Ask a quick, targeted question that requires learners to demonstrate understanding.",
        review:
          "Targeted checks provide immediate insight into learner focus and understanding while maintaining momentum in the lesson.",
      },

      // Lesson Planning - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "An instructor plans a lesson that consists mainly of a 60-minute lecture. Students begin checking their phones.",
        questionType: "multiple-choice",
        question: "Which modification would most effectively increase engagement without reducing instructional depth?",
        option: [
          "Extend the lecture to ensure all content is fully covered",
          "Integrate structured interactive activities such as guided discussions or brief problem-solving tasks",
          "Reduce the amount of content to make the lecture shorter",
          "Avoid interruptions to maintain a smooth lecture flow",
        ],
        answer: "Integrate structured interactive activities such as guided discussions or brief problem-solving tasks",
        review:
          "Embedding interaction within instruction increases engagement while preserving depth, unlike simply shortening or extending lectures.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "A teacher wants students to apply a concept instead of memorizing it.",
        questionType: "multiple-choice",
        question: "Which activity best promotes transfer of knowledge to new contexts rather than simple recall?",
        option: [
          "A case study requiring students to analyze and solve a realistic problem",
          "A detailed lecture explaining the concept step by step",
          "Independent reading followed by note-taking",
          "Repetition of key definitions to reinforce memory",
        ],
        answer: "A case study requiring students to analyze and solve a realistic problem",
        review:
          "Application-based tasks require learners to use knowledge in context, supporting deeper understanding and transfer.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "A teacher includes discussion questions throughout the lesson.",
        questionType: "multiple-choice",
        question: "What is the primary instructional benefit of embedding discussion questions during the lesson rather than at the end?",
        option: [
          "It allows the teacher to reduce preparation time",
          "It keeps learners cognitively engaged and encourages continuous processing of information",
          "It minimizes the need for structured lesson planning",
          "It shortens the overall lesson duration",
        ],
        answer: "It keeps learners cognitively engaged and encourages continuous processing of information",
        review:
          "Ongoing questioning promotes active thinking throughout the lesson, rather than delayed or passive engagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "Students work in small groups to solve a problem.",
        questionType: "multiple-choice",
        question: "Which instructional approach does this strategy most strongly represent in terms of promoting engagement and learning?",
        option: [
          "Collaborative learning that supports peer interaction and shared problem-solving",
          "Direct instruction focused on teacher-led explanation",
          "Independent practice emphasizing individual accountability only",
          "Passive learning through observation of others",
        ],
        answer: "Collaborative learning that supports peer interaction and shared problem-solving",
        review:
          "Collaborative learning promotes interaction, communication, and deeper understanding through shared thinking.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson1Id,
        scenario:
          "An instructor wants students to connect the lesson to real life.",
        questionType: "multiple-choice",
        question: "Which strategy most effectively supports meaningful learning by helping students relate content to real-world contexts?",
        option: [
          "Incorporate real-world examples and scenarios that require students to apply concepts",
          "Focus primarily on abstract theory to ensure conceptual clarity",
          "Limit discussion to avoid digression from core content",
          "Provide additional definitions to reinforce terminology",
        ],
        answer: "Incorporate real-world examples and scenarios that require students to apply concepts",
        review:
          "Real-world connections increase relevance and help learners apply knowledge beyond the classroom.",
      },

      // Lesson Planning - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "Students appear confused about what they should learn.",
        questionType: "multiple-choice",
        question: "Which instructional element would most effectively reduce confusion by clarifying the intended learning outcomes?",
        option: [
          "Provide detailed grading criteria for each task",
          "Clearly state specific and measurable learning objectives at the beginning of the lesson",
          "Expand lecture content to cover more information",
          "Limit explanations to allow students to figure out expectations independently",
        ],
        answer: "Clearly state specific and measurable learning objectives at the beginning of the lesson",
        review:
          "Clear learning objectives define what students are expected to learn, reducing ambiguity and guiding both instruction and learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "An instructor uses complex terminology that students do not understand.",
        questionType: "multiple-choice",
        question: "Which strategy most effectively improves clarity without oversimplifying the content?",
        option: [
          "Introduce additional technical terms to build familiarity",
          "Use simpler language and support it with clear explanations or examples",
          "Avoid elaborating on difficult concepts to maintain pacing",
          "Move to the next topic to avoid confusion",
        ],
        answer: "Use simpler language and support it with clear explanations or examples",
        review:
          "Clarity comes from making ideas accessible while still preserving meaning, often through simplified language supported by examples.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "The instructor connects the lesson to previous topics.",
        questionType: "multiple-choice",
        question: "What is the primary instructional advantage of linking new content to previously learned material?",
        option: [
          "It reduces the need for detailed explanations",
          "It helps students build connections and understand the broader context of the content",
          "It allows the lesson to progress more quickly",
          "It minimizes the need for student participation",
        ],
        answer: "It helps students build connections and understand the broader context of the content",
        review:
          "Connecting prior knowledge with new information supports deeper understanding and helps learners organize concepts meaningfully.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "The instructor demonstrates a process step-by-step.",
        questionType: "multiple-choice",
        question: "Why is a step-by-step demonstration particularly effective for teaching processes or procedures?",
        option: [
          "It removes the need for learners to ask questions",
          "It breaks down complex tasks into manageable steps, making them easier to follow and replicate",
          "It reduces the amount of preparation required for the lesson",
          "It replaces the need for student practice",
        ],
        answer: "It breaks down complex tasks into manageable steps, making them easier to follow and replicate",
        review:
          "Step-by-step modeling helps learners understand both the sequence and reasoning behind a process.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson2Id,
        scenario:
          "Students misunderstand assignment instructions.",
        questionType: "multiple-choice",
        question: "Which planning approach most effectively prevents misunderstandings while supporting independent task completion?",
        option: [
          "Provide clear, structured instructions supported by examples or models",
          "Deliver instructions once to maintain efficiency",
          "Simplify instructions by removing detailed explanations",
          "Avoid written instructions and rely only on verbal explanation",
        ],
        answer: "Provide clear, structured instructions supported by examples or models",
        review:
          "Clear instructions combined with examples reduce ambiguity and help learners understand expectations more accurately.",
      },

      // Lesson Planning - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The instructor explains a concept then immediately moves on.",
        questionType: "multiple-choice",
        question: "What pacing issue is most likely occurring, and how does it impact learning?",
        option: [
          "The lesson is overly structured, limiting flexibility in instruction",
          "The lesson is progressing too quickly, reducing time for processing and understanding",
          "The lesson includes too many examples, leading to cognitive overload",
          "The lesson is overly interactive, distracting from core content",
        ],
        answer: "The lesson is progressing too quickly, reducing time for processing and understanding",
        review:
          "Moving too quickly prevents learners from processing information, which can reduce comprehension and retention.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "Students finish an activity earlier than expected.",
        questionType: "multiple-choice",
        question: "Which instructional response best maintains engagement while preserving lesson momentum?",
        option: [
          "End the lesson early to match the adjusted timing",
          "Provide additional structured or extension activities that deepen understanding",
          "Move directly to the next topic without transition",
          "Allow unstructured free time until the next planned segment",
        ],
        answer: "Provide additional structured or extension activities that deepen understanding",
        review:
          "Extension activities keep learners engaged and can reinforce or deepen understanding rather than wasting instructional time.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The lesson includes introduction, activities, and conclusion.",
        questionType: "multiple-choice",
        question: "What aspect of lesson planning does this structure most directly support?",
        option: [
          "Randomized instruction that allows spontaneous teaching decisions",
          "Effective pacing through organized phases that guide time allocation",
          "Passive learning by minimizing student interaction",
          "Independent assessment without instructional guidance",
        ],
        answer: "Effective pacing through organized phases that guide time allocation",
        review:
          "Structured lesson phases help manage time effectively and ensure a logical flow of instruction.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "Students need more time for discussion.",
        questionType: "multiple-choice",
        question: "What is the most appropriate instructional decision to support deeper learning in this situation?",
        option: [
          "Stop the discussion to maintain the original lesson schedule",
          "Adjust the pacing to allow additional time while maintaining lesson focus",
          "Skip remaining questions to compensate for lost time",
          "End the lesson early to avoid time pressure",
        ],
        answer: "Adjust the pacing to allow additional time while maintaining lesson focus",
        review:
          "Flexible pacing allows instructors to respond to learner needs and support deeper understanding without losing structure.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson3Id,
        scenario:
          "The lesson includes long explanations but little practice.",
        questionType: "multiple-choice",
        question: "What instructional improvement would most effectively enhance learning outcomes in this situation?",
        option: [
          "Extend the explanations to ensure full content coverage",
          "Balance instructional explanation with opportunities for guided and independent practice",
          "Reduce interaction to maintain lesson efficiency",
          "Remove exercises to simplify lesson delivery",
        ],
        answer: "Balance instructional explanation with opportunities for guided and independent practice",
        review:
          "Practice allows learners to apply and reinforce knowledge, which is essential for deeper understanding and retention.",
      },

      // Lesson Planning - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "A teacher begins without introducing the topic.",
        questionType: "multiple-choice",
        question: "Which essential component of lesson structure is missing, and what is its primary instructional purpose?",
        option: [
          "Lesson introduction, which activates prior knowledge and sets expectations for learning",
          "Assessment, which measures student understanding at the end of the lesson",
          "Discussion, which promotes student interaction throughout the lesson",
          "Evaluation, which determines overall student performance",
        ],
        answer: "Lesson introduction, which activates prior knowledge and sets expectations for learning",
        review:
          "An effective introduction prepares learners by providing context, activating prior knowledge, and clarifying expectations.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "Students practice after a demonstration.",
        questionType: "multiple-choice",
        question: "Which phase of the lesson cycle does this most accurately represent in terms of instructional design?",
        option: [
          "Instruction and practice, where learners apply demonstrated concepts",
          "Lesson closure, where key ideas are summarized and reinforced",
          "Lesson introduction, where objectives and context are presented",
          "Evaluation, where student performance is formally assessed",
        ],
        answer: "Instruction and practice, where learners apply demonstrated concepts",
        review:
          "After modeling, practice allows learners to apply and reinforce their understanding of the concept.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "The instructor summarizes the lesson.",
        questionType: "multiple-choice",
        question: "Which stage of lesson structure does this action represent, and why is it important?",
        option: [
          "Lesson closure, which consolidates learning and reinforces key concepts",
          "Introduction, which establishes context for new material",
          "Evaluation, which formally measures student achievement",
          "Instruction, which delivers new content",
        ],
        answer: "Lesson closure, which consolidates learning and reinforces key concepts",
        review:
          "Closure helps learners organize and retain key ideas, strengthening overall understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "The lesson follows clear phases.",
        questionType: "multiple-choice",
        question: "What is the most significant benefit of organizing a lesson into clearly defined phases?",
        option: [
          "It reduces the amount of preparation required for the instructor",
          "It helps students follow the progression of ideas and understand how concepts are connected",
          "It minimizes opportunities for interaction during the lesson",
          "It simplifies grading by standardizing lesson delivery",
        ],
        answer: "It helps students follow the progression of ideas and understand how concepts are connected",
        review:
          "Clear structure supports cognitive organization, making it easier for learners to understand and retain information.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson4Id,
        scenario:
          "Students feel activities are unrelated.",
        questionType: "multiple-choice",
        question: "Which underlying planning issue is most likely causing this perception?",
        option: [
          "A lack of clear structure connecting activities to objectives",
          "An excessive number of learning objectives within the lesson",
          "Too much student participation disrupting lesson flow",
          "Overuse of feedback that distracts from core content",
        ],
        answer: "A lack of clear structure connecting activities to objectives",
        review:
          "When activities are not clearly aligned with objectives, learners may struggle to see connections, reducing coherence and meaning.",
      },

      // Lesson Planning - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "An instructor asks how they will know if students understood.",
        questionType: "multiple-choice",
        question: "Which aspect of lesson planning is the instructor most directly considering in this situation?",
        option: [
          "Assessment strategy used to gather evidence of student learning",
          "Lesson pacing to ensure all content is covered efficiently",
          "Classroom management techniques to maintain student behavior",
          "Content difficulty to match student ability levels",
        ],
        answer: "Assessment strategy used to gather evidence of student learning",
        review:
          "Assessment focuses on collecting evidence of whether learning objectives have been achieved.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "The instructor asks quick questions during the lesson.",
        questionType: "multiple-choice",
        question: "What type of assessment is being used, and what is its primary purpose?",
        option: [
          "Informal formative assessment used to monitor understanding during instruction",
          "Summative assessment used to assign final grades",
          "Diagnostic assessment used before instruction begins",
          "Standardized testing used for external evaluation",
        ],
        answer: "Informal formative assessment used to monitor understanding during instruction",
        review:
          "Formative assessment provides immediate insight into student understanding and helps guide instruction in real time.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "Students take a short quiz at the end of the lesson.",
        questionType: "multiple-choice",
        question: "What is the primary instructional purpose of this assessment within the lesson context?",
        option: [
          "To measure the extent to which students achieved the intended learning outcomes",
          "To replace instructional activities with evaluation",
          "To reduce overall lesson time by summarizing content quickly",
          "To eliminate the need for feedback by assigning a score",
        ],
        answer: "To measure the extent to which students achieved the intended learning outcomes",
        review:
          "End-of-lesson assessments evaluate how well students have met the learning objectives.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "The instructor notices a misunderstanding.",
        questionType: "multiple-choice",
        question: "What is the most effective instructional response to support learning in this situation?",
        option: [
          "Clarify the concept immediately and adjust instruction if necessary",
          "Ignore the misunderstanding to maintain lesson pacing",
          "Continue the lesson and address the issue only in a later assessment",
          "Provide additional tasks without addressing the misconception directly",
        ],
        answer: "Clarify the concept immediately and adjust instruction if necessary",
        review:
          "Immediate clarification prevents misconceptions from developing and supports accurate understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: planningLesson5Id,
        scenario:
          "Activities and assessments align with objectives.",
        questionType: "multiple-choice",
        question: "Why is alignment between learning objectives, activities, and assessments critical in lesson design?",
        option: [
          "It ensures that assessments accurately measure the intended learning outcomes",
          "It reduces the amount of preparation required for the instructor",
          "It minimizes the need for student feedback during the lesson",
          "It simplifies grading by standardizing all activities",
        ],
        answer: "It ensures that assessments accurately measure the intended learning outcomes",
        review:
          "Alignment ensures that all parts of the lesson work together to support and evaluate the intended learning goals.",
      },

      // Effective Communication - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson1Id,
        scenario:
          "Students frequently misinterpret assignment instructions even though the instructor provides detailed explanations.",
        questionType: "multiple-choice",
        question: "Which adjustment would most effectively reduce misinterpretation while maintaining instructional efficiency?",
        option: [
          "Provide highly detailed written and verbal explanations to eliminate any ambiguity",
          "Use concise language and supplement it with examples that model the expected outcome",
          "Allow students to interpret instructions independently to encourage critical thinking",
          "Repeat the same explanation multiple times to reinforce understanding",
        ],
        answer: "Use concise language and supplement it with examples that model the expected outcome",
        review:
          "Excessive detail can increase cognitive load. The most effective approach balances clarity and efficiency by combining concise language with concrete examples.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson1Id,
        scenario:
          "An instructor presents a large amount of information, and students struggle to retain key points.",
        questionType: "multiple-choice",
        question: "Which strategy best manages cognitive load while preserving the completeness of the content?",
        option: [
          "Break content into smaller segments and sequence them logically while highlighting key ideas",
          "Reduce the amount of content to avoid overwhelming students",
          "Provide all information at once but allow more time for note-taking",
          "Remove examples to keep explanations concise",
        ],
        answer: "Break content into smaller segments and sequence them logically while highlighting key ideas",
        review:
          "Chunking and sequencing information supports processing without sacrificing content depth, unlike simply reducing or overloading content.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson1Id,
        scenario:
          "After an explanation, some students appear confused while others seem ready to proceed.",
        questionType: "multiple-choice",
        question: "What is the most effective next step to address diverse levels of understanding without disrupting lesson flow?",
        option: [
          "Re-explain the entire concept for all students to ensure consistency",
          "Ask targeted questions to assess understanding and adjust instruction accordingly",
          "Continue the lesson to maintain pacing and address confusion later",
          "Provide additional independent tasks for students who are confused",
        ],
        answer: "Ask targeted questions to assess understanding and adjust instruction accordingly",
        review:
          "Targeted checks allow the instructor to diagnose understanding efficiently and respond without unnecessarily slowing down the lesson.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson1Id,
        scenario:
          "An instructor uses technical terminology necessary for the subject, but students struggle to follow.",
        questionType: "multiple-choice",
        question: "Which approach best balances conceptual accuracy with accessibility?",
        option: [
          "Replace all technical terms with simpler language, even if precision is reduced",
          "Maintain technical terminology but provide clear explanations and contextual examples",
          "Increase exposure to technical terms so students become familiar through repetition",
          "Avoid explaining terminology to maintain lesson pacing",
        ],
        answer: "Maintain technical terminology but provide clear explanations and contextual examples",
        review:
          "Effective communication balances accuracy and clarity by retaining essential terminology while making it understandable through explanation and context.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson1Id,
        scenario:
          "Students consistently complete tasks accurately and with minimal clarification requests.",
        questionType: "multiple-choice",
        question: "Which underlying communication characteristic most likely contributed to this outcome?",
        option: [
          "Highly detailed explanations that cover all possible misunderstandings",
          "Clear, structured communication that reduces ambiguity while guiding expectations",
          "Minimal interaction to prevent distractions during instruction",
          "Increased task frequency to reinforce understanding through repetition",
        ],
        answer: "Clear, structured communication that reduces ambiguity while guiding expectations",
        review:
          "Effective communication is not about maximum detail but about clarity, structure, and alignment with expectations.",
      },

      // Effective Communication - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson2Id,
        scenario:
          "A student expresses confusion about a concept, but the instructor acknowledges it briefly and continues without exploring it further.",
        questionType: "multiple-choice",
        question: "Which communication component is most critically lacking in this interaction?",
        option: [
          "Active listening that involves fully attending to and exploring the student's concern",
          "Lesson planning to ensure content is delivered within time constraints",
          "Assessment strategies to measure understanding later in the lesson",
          "Time management to maintain instructional pacing",
        ],
        answer: "Active listening that involves fully attending to and exploring the student's concern",
        review:
          "Acknowledging without exploring reflects surface-level listening. Effective active listening requires engaging with the student's concern to understand and address it meaningfully.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson2Id,
        scenario: "An instructor asks follow-up questions after a student response.",
        questionType: "multiple-choice",
        question: "What is the primary purpose of this communication behavior in supporting student learning?",
        option: [
          "To evaluate the correctness of the student's answer for grading purposes",
          "To deepen understanding by exploring the student's thinking process",
          "To maintain lesson pacing by keeping the discussion focused",
          "To redirect the conversation toward the instructor's intended explanation",
        ],
        answer: "To deepen understanding by exploring the student's thinking process",
        review:
          "Follow-up questions are a key component of active listening, allowing instructors to probe student thinking rather than simply judging correctness.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson2Id,
        scenario: "Instructor restates a student's idea in their own words before responding.",
        questionType: "multiple-choice",
        question: "Which description best captures the instructional value of this technique?",
        option: [
          "It allows the instructor to simplify the student's idea before correcting it",
          "It confirms understanding and provides an opportunity to clarify or refine meaning",
          "It reduces the need for further discussion by summarizing the response",
          "It helps transition quickly back to the instructor's explanation",
        ],
        answer: "It confirms understanding and provides an opportunity to clarify or refine meaning",
        review:
          "Paraphrasing is not just repetition; it validates the student's contribution and ensures accurate mutual understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson2Id,
        scenario: "Students consistently report feeling heard and understood during class interactions.",
        questionType: "multiple-choice",
        question: "Which underlying communication practice most likely contributes to this outcome?",
        option: [
          "Providing highly detailed explanations to minimize misunderstanding",
          "Demonstrating active listening through attention, acknowledgment, and responsive interaction",
          "Maintaining strict control of discussion to avoid off-topic contributions",
          "Reducing interaction to ensure clarity of instruction",
        ],
        answer: "Demonstrating active listening through attention, acknowledgment, and responsive interaction",
        review:
          "Feeling heard is strongly linked to active listening behaviors, including attention, validation, and meaningful response.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson2Id,
        scenario: "While students are speaking, the instructor avoids eye contact and focuses on their notes.",
        questionType: "multiple-choice",
        question: "What is the most significant impact of this behavior on communication and classroom dynamics?",
        option: [
          "It improves efficiency by allowing the instructor to prepare the next explanation",
          "It may signal a lack of attention, reducing student confidence and willingness to participate",
          "It helps maintain lesson pacing by minimizing prolonged interaction",
          "It encourages students to be more concise in their responses",
        ],
        answer: "It may signal a lack of attention, reducing student confidence and willingness to participate",
        review:
          "Nonverbal cues like eye contact are critical in communication. Lack of attention can negatively impact trust, engagement, and participation.",
      },

      // Effective Communication - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson3Id,
        scenario:
          "A student submits an answer, and the instructor responds only with, 'This is incorrect,' without further explanation.",
        questionType: "multiple-choice",
        question: "Which adjustment would most effectively transform this into constructive feedback that supports learning?",
        option: [
          "Provide a detailed explanation of the correct answer without referencing the student's attempt",
          "Explain specifically what was incorrect and guide the student toward how it can be improved",
          "Repeat that the answer is incorrect to reinforce accuracy",
          "Move on quickly to maintain lesson pacing",
        ],
        answer: "Explain specifically what was incorrect and guide the student toward how it can be improved",
        review:
          "Constructive feedback should be actionable. Identifying errors and providing guidance supports improvement more effectively than simply giving the correct answer.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson3Id,
        scenario:
          "An instructor tells a student, 'Your introduction is clear, but your conclusion needs more detail.'",
        questionType: "multiple-choice",
        question: "Which feature of this feedback most directly contributes to its effectiveness?",
        option: [
          "It balances strengths and areas for improvement with specific guidance",
          "It minimizes detail to maintain efficiency",
          "It focuses only on weaknesses to encourage improvement",
          "It avoids overwhelming the student with too much information",
        ],
        answer: "It balances strengths and areas for improvement with specific guidance",
        review:
          "Effective feedback acknowledges strengths while providing specific direction for improvement, supporting both motivation and clarity.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson3Id,
        scenario:
          "A student appears discouraged after receiving strongly critical feedback.",
        questionType: "multiple-choice",
        question: "What is the most effective response to maintain motivation while still supporting improvement?",
        option: [
          "Reduce all critical feedback and provide only positive comments",
          "Use supportive language while clearly identifying areas for improvement",
          "Avoid giving further feedback to prevent additional discouragement",
          "Focus on correcting all errors in detail to ensure accuracy",
        ],
        answer: "Use supportive language while clearly identifying areas for improvement",
        review:
          "Effective feedback balances emotional support with actionable guidance, maintaining motivation while promoting learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson3Id,
        scenario:
          "A teacher wants feedback to improve students' future performance, not just evaluate past work.",
        questionType: "multiple-choice",
        question: "Which element is most essential for feedback to serve this forward-looking purpose?",
        option: [
          "Detailed evaluation of all mistakes in the current work",
          "Clear, actionable suggestions that guide how to improve in future tasks",
          "A numerical grade that reflects overall performance",
          "General praise to maintain student confidence",
        ],
        answer: "Clear, actionable suggestions that guide how to improve in future tasks",
        review:
          "Feedback is most effective when it is forward-focused, providing clear guidance that students can apply to future work.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson3Id,
        scenario:
          "Students consistently demonstrate understanding of both their strengths and areas for improvement after receiving feedback.",
        questionType: "multiple-choice",
        question: "Which characteristic of the feedback most likely contributed to this outcome?",
        option: [
          "It provided comprehensive explanations of all content covered in the lesson",
          "It clearly identified strengths and areas for improvement with specific, actionable guidance",
          "It minimized critical comments to maintain a positive learning environment",
          "It focused primarily on grading to communicate performance levels",
        ],
        answer: "It clearly identified strengths and areas for improvement with specific, actionable guidance",
        review:
          "Effective feedback is clear, specific, and balanced, enabling students to understand both what they did well and how to improve.",
      },

      // Effective Communication - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson4Id,
        scenario:
          "An instructor delivers content continuously throughout the lesson without inviting student input or questions.",
        questionType: "multiple-choice",
        question: "Which communication issue most directly limits student learning in this situation?",
        option: [
          "An overemphasis on content coverage at the expense of student processing and interaction",
          "Excessive feedback that may overwhelm students",
          "Strong listening skills that reduce the need for student participation",
          "Highly structured delivery that ensures clarity of instruction",
        ],
        answer: "An overemphasis on content coverage at the expense of student processing and interaction",
        review:
          "One-way communication limits engagement and processing. Without opportunities for interaction, students remain passive rather than actively constructing understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson4Id,
        scenario:
          "A teacher asks, 'What do you think is the main idea here?'",
        questionType: "multiple-choice",
        question: "What is the primary instructional purpose of using this type of question?",
        option: [
          "To check for a single correct answer efficiently",
          "To encourage students to articulate their thinking and engage in deeper processing",
          "To maintain lesson pacing by prompting quick responses",
          "To guide students toward a predetermined explanation without discussion",
        ],
        answer: "To encourage students to articulate their thinking and engage in deeper processing",
        review:
          "Open-ended questions promote higher-order thinking and active engagement by requiring students to construct and express their understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson4Id,
        scenario:
          "Students consistently feel comfortable asking questions and sharing ideas during class.",
        questionType: "multiple-choice",
        question: "Which underlying classroom communication dynamic most likely contributes to this outcome?",
        option: [
          "A structured environment focused primarily on efficient content delivery",
          "A classroom climate that encourages participation and values student contributions",
          "A reduced number of activities to minimize distractions",
          "Strict control of discussion to maintain focus on key concepts",
        ],
        answer: "A classroom climate that encourages participation and values student contributions",
        review:
          "A supportive communication climate fosters psychological safety, making students more willing to participate and ask questions.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson4Id,
        scenario:
          "A student shares an idea, and the instructor responds respectfully while acknowledging the contribution.",
        questionType: "multiple-choice",
        question: "What is the most significant impact of this response on classroom interaction?",
        option: [
          "It reinforces correct answers and limits further discussion",
          "It encourages continued participation by validating student contributions",
          "It improves lesson pacing by quickly addressing responses",
          "It reduces the need for additional questioning",
        ],
        answer: "It encourages continued participation by validating student contributions",
        review:
          "Respectful acknowledgment builds trust and increases willingness to participate, strengthening two-way communication.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson4Id,
        scenario:
          "Students remain silent during discussions because they feel their opinions are not valued.",
        questionType: "multiple-choice",
        question: "Which instructional adjustment would most effectively address this issue while maintaining meaningful interaction?",
        option: [
          "Increase the number of written assessments to evaluate understanding",
          "Encourage respectful, two-way communication and actively validate student contributions",
          "Extend lecture time to ensure clarity before discussion",
          "Limit discussion opportunities to avoid discomfort",
        ],
        answer: "Encourage respectful, two-way communication and actively validate student contributions",
        review:
          "Participation depends on psychological safety. Students engage more when they feel their input is respected and valued.",
      },

      // Effective Communication - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson5Id,
        scenario:
          "An instructor provides clear and accurate verbal instructions but avoids eye contact and speaks in a monotone voice throughout the lesson.",
        questionType: "multiple-choice",
        question: "What is the most significant impact of this communication pattern on student learning?",
        option: [
          "Students may understand the content but experience reduced engagement and attention",
          "Students will achieve higher comprehension due to the clarity of instructions",
          "Student participation will increase due to fewer distractions",
          "The lesson will become more efficient and time-effective",
        ],
        answer: "Students may understand the content but experience reduced engagement and attention",
        review:
          "Clear verbal communication alone is not sufficient. Nonverbal cues strongly influence attention, motivation, and overall engagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson5Id,
        scenario:
          "A teacher uses eye contact, facial expressions, and gestures while explaining a concept.",
        questionType: "multiple-choice",
        question: "Which explanation best accounts for the effectiveness of these nonverbal behaviors?",
        option: [
          "They replace the need for detailed verbal explanations",
          "They enhance engagement and support understanding by reinforcing key ideas",
          "They primarily improve lesson pacing by maintaining attention",
          "They reduce the need for student participation",
        ],
        answer: "They enhance engagement and support understanding by reinforcing key ideas",
        review:
          "Nonverbal communication complements verbal instruction by emphasizing meaning and sustaining attention.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson5Id,
        scenario:
          "An instructor uses supportive language, but their tone sounds impatient or frustrated.",
        questionType: "multiple-choice",
        question: "What is the most likely consequence of this mismatch between verbal and nonverbal communication?",
        option: [
          "Students will rely more on the verbal message and ignore tone",
          "Students may perceive inconsistency, leading to reduced trust and engagement",
          "Communication becomes more efficient due to emotional clarity",
          "Students will feel more motivated due to the supportive wording",
        ],
        answer: "Students may perceive inconsistency, leading to reduced trust and engagement",
        review:
          "When verbal and nonverbal signals conflict, students tend to interpret the nonverbal cues more strongly, which can undermine trust.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson5Id,
        scenario:
          "A teacher intentionally uses gestures to highlight key points during instruction.",
        questionType: "multiple-choice",
        question: "What is the primary instructional benefit of this strategy beyond simple emphasis?",
        option: [
          "It eliminates the need for verbal explanation of key ideas",
          "It supports cognitive processing by helping students organize and retain information",
          "It primarily improves classroom management by directing attention",
          "It reduces the need for student interaction during the lesson",
        ],
        answer: "It supports cognitive processing by helping students organize and retain information",
        review:
          "Gestures do more than emphasize—they support understanding by structuring information and aiding memory.",
      },
      {
        _id: new ObjectId(),
        lessonId: effectiveCommunicationLesson5Id,
        scenario:
          "Students appear attentive, comfortable, and willing to participate during a lesson.",
        questionType: "multiple-choice",
        question: "Which underlying factor related to communication most likely contributes to this classroom environment?",
        option: [
          "Reduced instructor presence to allow student independence",
          "Effective alignment of verbal and nonverbal communication that supports a positive classroom climate",
          "Minimal interaction to maintain focus on content delivery",
          "Frequent assessment to ensure accountability",
        ],
        answer: "Effective alignment of verbal and nonverbal communication that supports a positive classroom climate",
        review:
          "Consistent and positive verbal and nonverbal communication fosters psychological safety, engagement, and participation.",
      },

      // Fundamentals of Teaching - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson1Id,
        scenario:
          "An instructor plans multiple engaging activities, but there is no clear statement of what students are expected to learn.",
        questionType: "multiple-choice",
        question: "Which issue most fundamentally limits the effectiveness of this lesson design?",
        option: [
          "A lack of clearly defined learning objectives, resulting in unclear instructional direction",
          "An overemphasis on student engagement at the expense of content coverage",
          "Insufficient assessment strategies to measure learning outcomes",
          "Excessive flexibility that reduces lesson structure",
        ],
        answer: "A lack of clearly defined learning objectives, resulting in unclear instructional direction",
        review:
          "Without clear objectives, even well-designed activities lack purpose and cannot be aligned with outcomes or assessment.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson1Id,
        scenario:
          "A lesson objective states, 'Students will understand communication.'",
        questionType: "multiple-choice",
        question: "What is the most critical limitation of this objective in terms of instructional design?",
        option: [
          "It lacks measurable and observable criteria for evaluating student learning",
          "It is too broad, which may reduce lesson focus but still allows flexibility",
          "It is insufficiently detailed to guide instructional activities effectively",
          "It limits creativity by constraining how the lesson is delivered",
        ],
        answer: "It lacks measurable and observable criteria for evaluating student learning",
        review:
          "Objectives must be measurable to guide both instruction and assessment; 'understand' is too vague to evaluate effectively.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson1Id,
        scenario:
          "Activities in a lesson are engaging but do not directly support the stated objective.",
        questionType: "multiple-choice",
        question: "What is the most significant instructional consequence of this issue?",
        option: [
          "Students may be engaged but fail to achieve the intended learning outcomes",
          "The lesson may become less structured but more flexible",
          "Students may develop broader knowledge beyond the objective",
          "Instruction may become more efficient due to varied activities",
        ],
        answer: "Students may be engaged but fail to achieve the intended learning outcomes",
        review:
          "Engagement alone is not sufficient; alignment ensures that activities contribute directly to achieving learning goals.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson1Id,
        scenario:
          "An instructor clearly communicates what students will achieve by the end of the lesson.",
        questionType: "multiple-choice",
        question: "What is the primary instructional advantage of this practice?",
        option: [
          "It enables students to direct their attention and effort toward specific learning goals",
          "It reduces the need for interaction during the lesson",
          "It simplifies assessment by limiting possible outcomes",
          "It allows the instructor to reduce the number of activities",
        ],
        answer: "It enables students to direct their attention and effort toward specific learning goals",
        review:
          "Clear objectives guide student focus, helping them prioritize and engage with relevant learning tasks.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson1Id,
        scenario:
          "Students complete all assigned tasks but cannot clearly explain what they have learned.",
        questionType: "multiple-choice",
        question: "Which underlying design issue most likely explains this outcome?",
        option: [
          "A lack of clearly defined and communicated learning objectives guiding the lesson",
          "An insufficient number of practice activities during the lesson",
          "An imbalance between instruction and assessment",
          "A pacing issue that limits time for reflection",
        ],
        answer: "A lack of clearly defined and communicated learning objectives guiding the lesson",
        review:
          "Without clear objectives, students may complete tasks without understanding their purpose or the intended learning outcomes.",
      },

      // Fundamentals of Teaching - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson2Id,
        scenario:
          "An instructor presents multiple complex concepts in rapid succession with minimal transition or processing time.",
        questionType: "multiple-choice",
        question: "What is the most significant cognitive consequence of this instructional approach?",
        option: [
          "Cognitive overload that limits students' ability to process and retain information",
          "Increased retention due to exposure to a wider range of content",
          "Higher engagement resulting from a fast-paced delivery style",
          "More efficient learning due to condensed instruction",
        ],
        answer: "Cognitive overload that limits students' ability to process and retain information",
        review:
          "When too much information is presented too quickly, working memory becomes overloaded, reducing comprehension and retention.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson2Id,
        scenario:
          "Students struggle to follow a complex explanation that includes multiple steps and concepts.",
        questionType: "multiple-choice",
        question: "Which instructional adjustment would most effectively improve understanding without reducing content rigor?",
        option: [
          "Break the explanation into smaller, sequenced parts and present them progressively",
          "Provide more detailed explanations to ensure completeness",
          "Increase the pace to maintain student attention",
          "Remove examples to simplify the explanation",
        ],
        answer: "Break the explanation into smaller, sequenced parts and present them progressively",
        review:
          "Chunking and sequencing reduce cognitive load while preserving complexity, allowing students to process each component effectively.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson2Id,
        scenario:
          "An instructor demonstrates a process step-by-step before asking students to perform it independently.",
        questionType: "multiple-choice",
        question: "Which explanation best describes the cognitive benefit of this instructional strategy?",
        option: [
          "It reduces cognitive load by providing a model that supports understanding before application",
          "It increases task difficulty by exposing students to complete procedures",
          "It minimizes the need for student engagement during practice",
          "It replaces the need for independent problem-solving",
        ],
        answer: "It reduces cognitive load by providing a model that supports understanding before application",
        review:
          "Worked examples and demonstrations provide cognitive support, allowing learners to build understanding before applying knowledge independently.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson2Id,
        scenario:
          "Students are given time to think before responding to a question.",
        questionType: "multiple-choice",
        question: "What is the most significant learning benefit of incorporating this pause?",
        option: [
          "It allows for deeper cognitive processing, improving comprehension and response quality",
          "It slows down the lesson, reducing overall instructional efficiency",
          "It limits spontaneous interaction among students",
          "It reduces the need for follow-up questioning",
        ],
        answer: "It allows for deeper cognitive processing, improving comprehension and response quality",
        review:
          "Providing wait time supports processing, enabling students to organize thoughts and produce more accurate and meaningful responses.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson2Id,
        scenario:
          "Students become frustrated and disengaged during a fast-paced lesson with minimal explanation and limited processing time.",
        questionType: "multiple-choice",
        question: "Which underlying instructional issue most accurately explains this outcome?",
        option: [
          "Poor pacing that increases cognitive load beyond students' processing capacity",
          "Excessive clarity that reduces the need for active thinking",
          "Too many clearly defined objectives that overwhelm students",
          "Overly structured instruction that limits flexibility",
        ],
        answer: "Poor pacing that increases cognitive load beyond students' processing capacity",
        review:
          "When pacing does not align with learners' processing needs, cognitive overload occurs, leading to frustration and disengagement.",
      },

      // Fundamentals of Teaching - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson3Id,
        scenario:
          "Some students complete tasks quickly while others struggle to keep up during the same activity.",
        questionType: "multiple-choice",
        question: "Which instructional response most effectively addresses this situation while maintaining both engagement and learning progression?",
        option: [
          "Provide tiered tasks with varying levels of difficulty to match different readiness levels",
          "Assign the same task to all students to ensure fairness and consistency",
          "Reduce the overall lesson difficulty so all students can complete the task",
          "Allow advanced students to wait while others finish to maintain pacing",
        ],
        answer: "Provide tiered tasks with varying levels of difficulty to match different readiness levels",
        review:
          "Differentiation supports both struggling and advanced learners by adjusting task complexity while maintaining learning goals.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson3Id,
        scenario:
          "Students struggle to understand a concept that has been explained using only one method.",
        questionType: "multiple-choice",
        question: "Which instructional adjustment best supports diverse learning needs without lowering conceptual rigor?",
        option: [
          "Present the concept using multiple representations and examples",
          "Repeat the same explanation more slowly to reinforce understanding",
          "Move on to maintain lesson pacing and revisit later if needed",
          "Simplify the concept by removing complex elements",
        ],
        answer: "Present the concept using multiple representations and examples",
        review:
          "Using varied representations supports different ways of understanding while preserving the depth of the concept.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson3Id,
        scenario:
          "An instructor relies exclusively on lectures for delivering content.",
        questionType: "multiple-choice",
        question: "Which change would most effectively improve differentiation while maintaining instructional effectiveness?",
        option: [
          "Incorporate varied instructional methods such as discussion, practice, and visual supports",
          "Extend lecture time to ensure all content is fully explained",
          "Reduce interaction to maintain focus on content delivery",
          "Provide more detailed verbal explanations within the lecture format",
        ],
        answer: "Incorporate varied instructional methods such as discussion, practice, and visual supports",
        review:
          "Different instructional approaches address diverse learning preferences and improve accessibility without sacrificing content.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson3Id,
        scenario:
          "Some students report that tasks are too easy and lose interest during the lesson.",
        questionType: "multiple-choice",
        question: "What is the most effective instructional response to maintain engagement and promote continued learning?",
        option: [
          "Provide more challenging extension tasks that deepen understanding",
          "Reduce task difficulty to ensure all students can complete them easily",
          "Skip activities to maintain lesson pacing",
          "Ignore feedback to maintain consistency across the class",
        ],
        answer: "Provide more challenging extension tasks that deepen understanding",
        review:
          "Appropriate challenge is essential for engagement; extension tasks support advanced learners without disrupting others.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson3Id,
        scenario:
          "All students are able to participate meaningfully and demonstrate understanding during a lesson.",
        questionType: "multiple-choice",
        question: "Which underlying instructional practice most likely contributed to this outcome?",
        option: [
          "Differentiated instruction that adapts content, process, or support based on learner needs",
          "Reduced interaction to maintain focus on content delivery",
          "Faster pacing to ensure lesson efficiency",
          "A uniform approach to tasks to maintain consistency",
        ],
        answer: "Differentiated instruction that adapts content, process, or support based on learner needs",
        review:
          "Differentiation ensures accessibility and challenge for a wide range of learners, supporting inclusive participation and understanding.",
      },

      // Fundamentals of Teaching - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson4Id,
        scenario:
          "Students display visible confusion through facial expressions and lack of response, but the instructor continues the lesson without addressing it.",
        questionType: "multiple-choice",
        question: "Which instructional weakness most directly explains the reduced effectiveness of the lesson?",
        option: [
          "A lack of ongoing monitoring of student understanding to inform instructional decisions",
          "An overemphasis on maintaining lesson pacing at the expense of interaction",
          "Insufficient assessment strategies to evaluate learning at the end of the lesson",
          "Excessive flexibility that disrupts lesson structure",
        ],
        answer: "A lack of ongoing monitoring of student understanding to inform instructional decisions",
        review:
          "Effective teaching requires continuous monitoring. Ignoring learner cues prevents timely adjustment and reduces comprehension.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson4Id,
        scenario:
          "An instructor asks, 'Can someone explain this in their own words?' during the lesson.",
        questionType: "multiple-choice",
        question: "What is the primary instructional purpose of this strategy beyond simple recall?",
        option: [
          "To check understanding by requiring students to process and restate the concept",
          "To evaluate student performance for grading purposes",
          "To maintain pacing by encouraging quick responses",
          "To reinforce memorization of key terminology",
        ],
        answer: "To check understanding by requiring students to process and restate the concept",
        review:
          "Restating in one's own words requires deeper processing, providing stronger evidence of understanding than simple recall.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson4Id,
        scenario:
          "Students struggle with a concept during an activity, showing hesitation and incorrect responses.",
        questionType: "multiple-choice",
        question: "Which response best supports learning while maintaining instructional flow?",
        option: [
          "Clarify the concept and provide an additional example or scaffolded support",
          "Move on to maintain pacing and revisit the concept later",
          "End the activity to prevent further confusion",
          "Allow students to continue without intervention to encourage independence",
        ],
        answer: "Clarify the concept and provide an additional example or scaffolded support",
        review:
          "Timely support prevents misconceptions from solidifying while maintaining momentum in the lesson.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson4Id,
        scenario:
          "An instructor notices that students are disengaged during an activity.",
        questionType: "multiple-choice",
        question: "What is the most effective instructional response in this situation?",
        option: [
          "Adjust the activity or instructional approach to better align with student needs",
          "Continue as planned to maintain consistency in lesson delivery",
          "Reduce interaction to regain control of the class",
          "End the discussion to move to the next part of the lesson",
        ],
        answer: "Adjust the activity or instructional approach to better align with student needs",
        review:
          "Responsive adjustment helps re-engage students by aligning instruction with their current level and needs.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson4Id,
        scenario:
          "An instructor continuously modifies explanations and strategies based on student responses during the lesson.",
        questionType: "multiple-choice",
        question: "Which instructional quality does this behavior most strongly demonstrate?",
        option: [
          "Responsive teaching that adapts instruction based on real-time student understanding",
          "Passive instruction focused on delivering planned content",
          "Fixed lesson planning that ensures consistency",
          "Minimal engagement to maintain efficiency",
        ],
        answer: "Responsive teaching that adapts instruction based on real-time student understanding",
        review:
          "Responsive teaching relies on ongoing monitoring and adjustment, leading to more effective and adaptive instruction.",
      },

      // Fundamentals of Teaching - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson5Id,
        scenario:
          "At the end of a lesson, students leave immediately without reviewing what they learned or connecting it to previous knowledge.",
        questionType: "multiple-choice",
        question: "Which instructional component is most critically missing in this lesson design?",
        option: [
          "Insufficient assessment strategies to evaluate learning at the end of the lesson",
          "Structured reflection or closure that consolidates learning and reinforces key concepts",
          "Additional content delivery to ensure full coverage of the topic",
          "Summative assessment to evaluate final understanding",
          "Extended practice activities to increase repetition",
        ],
        answer: "Structured reflection or closure that consolidates learning and reinforces key concepts",
        review:
          "Lesson closure supports consolidation by helping students organize and connect what they have learned, improving retention and understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson5Id,
        scenario:
          "An instructor asks students to write down the most important concept they learned and how it connects to previous lessons.",
        questionType: "multiple-choice",
        question: "What is the primary learning benefit of this activity?",
        option: [
          "It promotes metacognitive reflection and helps students connect new knowledge to prior learning",
          "It serves as a summative assessment of overall performance",
          "It reduces cognitive load by limiting new information",
          "It replaces the need for further instruction",
        ],
        answer: "It promotes metacognitive reflection and helps students connect new knowledge to prior learning",
        review:
          "Reflection activities support metacognition, allowing students to monitor their understanding and integrate new knowledge with existing concepts.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson5Id,
        scenario:
          "Students complete activities successfully but struggle to apply the same concepts in a new context.",
        questionType: "multiple-choice",
        question: "What instructional element is most likely insufficient in this lesson?",
        option: [
          "Opportunities for transfer that require applying knowledge in varied contexts",
          "Content coverage to ensure all concepts are introduced",
          "Assessment to measure performance at the end of the lesson",
          "Pacing adjustments to maintain lesson flow",
        ],
        answer: "Opportunities for transfer that require applying knowledge in varied contexts",
        review:
          "Transfer requires practice in applying knowledge beyond the original context. Without this, learning remains surface-level.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson5Id,
        scenario:
          "An instructor includes a brief summary at the end of each lesson highlighting key points and common misunderstandings.",
        questionType: "multiple-choice",
        question: "What is the most significant instructional benefit of this practice?",
        option: [
          "It reinforces key concepts and helps students organize and retain information",
          "It reduces the need for formative assessment during the lesson",
          "It replaces the need for student reflection activities",
          "It ensures that all students achieve the same level of understanding",
        ],
        answer: "It reinforces key concepts and helps students organize and retain information",
        review:
          "Summarizing key ideas supports consolidation and helps learners structure their understanding.",
      },
      {
        _id: new ObjectId(),
        lessonId: fundamentalsTeachingLesson5Id,
        scenario:
          "Students are asked to set a goal for what they will improve in the next assignment based on their current performance.",
        questionType: "multiple-choice",
        question: "Which learning process is most directly supported by this strategy?",
        option: [
          "Metacognitive regulation, where students plan and monitor their own learning",
          "Summative evaluation of final performance outcomes",
          "Reduction of cognitive load through simplified expectations",
          "Passive reception of feedback without active engagement",
        ],
        answer: "Metacognitive regulation, where students plan and monitor their own learning",
        review:
          "Goal-setting based on feedback supports metacognition by encouraging students to take control of their learning process and apply improvements.",
      },

      // Assessment and Feedback - Lesson 1
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson1Id,
        scenario:
          "During a class activity, students receive graded assignments, but most glance only at the score and set the work aside without engaging with the written comments.",
        questionType: "multiple-choice",
        question: "Which strategy would most effectively increase the likelihood that students actively process and use the feedback for future improvement?",
        option: [
          "Move directly to the next topic so students do not dwell on their performance",
          "Require students to write a brief reflection identifying key feedback points and how they will respond to them",
          "Remove written comments and provide only numerical grades to simplify the process",
          "Delay all feedback discussions until the end of the unit",
        ],
        answer: "Require students to write a brief reflection identifying key feedback points and how they will respond to them",
        review:
          "Reflection promotes active engagement with feedback by requiring students to interpret comments and connect them to future action, rather than passively noticing a grade.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson1Id,
        scenario:
          "An instructor wants students to better understand how their projects will be judged, but many seem unclear about the standards and expectations being used.",
        questionType: "multiple-choice",
        question: "Which approach most effectively involves students in the assessment process while improving transparency and understanding?",
        option: [
          "Share the grading rubric and discuss how each criterion applies to the task before assessment",
          "Keep the criteria private so students focus on the task rather than the grade",
          "Grade the projects first and explain the criteria only after scores are released",
          "Provide final marks without discussing how performance was evaluated",
        ],
        answer: "Share the grading rubric and discuss how each criterion applies to the task before assessment",
        review:
          "Assessment is more meaningful when students understand the criteria in advance. Reviewing the rubric helps them interpret expectations and use them to guide their work.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson1Id,
        scenario:
          "During a peer review activity, students evaluate one another's work using a set of criteria and provide suggestions for revision.",
        questionType: "multiple-choice",
        question: "What is the most significant learning benefit of this assessment practice?",
        option: [
          "It replaces the need for instructor feedback by shifting responsibility entirely to students",
          "It develops students' ability to analyze quality, apply criteria, and make informed judgments about improvement",
          "It reduces the amount of grading required, making assessment more efficient",
          "It allows students to complete assignments without needing to reflect on their own work",
        ],
        answer: "It develops students' ability to analyze quality, apply criteria, and make informed judgments about improvement",
        review:
          "Peer assessment strengthens evaluative judgment by asking students to interpret criteria and identify strengths and weaknesses in work, which also supports their own learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson1Id,
        scenario:
          "After returning quizzes, an instructor asks students to identify one error they made, explain why it was incorrect, and describe how they would improve next time.",
        questionType: "multiple-choice",
        question: "Which learning process is the instructor most directly promoting through this activity?",
        option: [
          "Self-assessment that encourages students to evaluate their own understanding and identify next steps",
          "Summative grading that measures final achievement without influencing future learning",
          "Passive evaluation in which students simply receive performance information",
          "Random testing designed to check memory under pressure",
        ],
        answer: "Self-assessment that encourages students to evaluate their own understanding and identify next steps",
        review:
          "This strategy goes beyond noticing errors. It requires students to analyze their own performance and generate improvement-oriented responses, which is central to self-assessment.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson1Id,
        scenario:
          "Students receive detailed comments on a writing assignment, yet many repeat similar mistakes in their next submission.",
        questionType: "multiple-choice",
        question: "Which instructional adjustment would most effectively improve students' ability to transfer feedback into future performance?",
        option: [
          "Provide all feedback at the end of the course so students can review it at once",
          "Require students to revise their work using the feedback and explain the changes they made",
          "Remove written comments and rely on final grades to motivate greater effort",
          "Increase grading strictness so students take feedback more seriously",
        ],
        answer: "Require students to revise their work using the feedback and explain the changes they made",
        review:
          "Feedback is most effective when students must act on it. Revision paired with explanation supports application, transfer, and deeper understanding of how to improve.",
      },

      // Assessment and Feedback - Lesson 2
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson2Id,
        scenario:
          "A student receives the comment 'Needs improvement' on an assignment but is unsure what specifically should be improved or how to proceed.",
        questionType: "multiple-choice",
        question: "What is the most critical limitation of this feedback in supporting student learning?",
        option: [
          "It lacks specific and actionable guidance that would enable the student to improve",
          "It is overly negative, which may reduce student motivation",
          "It is too brief to fully evaluate the student's performance",
          "It does not include a numerical grade to indicate achievement level",
        ],
        answer: "It lacks specific and actionable guidance that would enable the student to improve",
        review:
          "Effective feedback must be actionable. Without clear direction, students cannot translate feedback into improvement.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson2Id,
        scenario:
          "An instructor writes: 'Your argument is clear, but adding supporting evidence would strengthen your analysis.'",
        questionType: "multiple-choice",
        question: "Which feature most directly contributes to the effectiveness of this feedback?",
        option: [
          "It balances recognition of strengths with specific guidance for improvement",
          "It minimizes detail to maintain efficiency in grading",
          "It focuses primarily on evaluating the final product",
          "It avoids overwhelming the student with too many comments",
        ],
        answer: "It balances recognition of strengths with specific guidance for improvement",
        review:
          "Effective feedback supports both motivation and improvement by identifying what works and what needs to be developed further.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson2Id,
        scenario:
          "Students continue to misunderstand assignment expectations even after receiving written feedback.",
        questionType: "multiple-choice",
        question: "Which adjustment would most effectively improve students' ability to interpret and apply feedback?",
        option: [
          "Provide annotated examples or models of strong responses aligned with criteria",
          "Reduce the amount of feedback to focus only on key points",
          "Avoid explaining errors in detail to maintain efficiency",
          "Emphasize final grades to increase student motivation",
        ],
        answer: "Provide annotated examples or models of strong responses aligned with criteria",
        review:
          "Examples make expectations visible and help students connect feedback to concrete performance standards.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson2Id,
        scenario:
          "An instructor provides extensive written feedback using complex academic language that students find difficult to interpret.",
        questionType: "multiple-choice",
        question: "Which aspect of feedback design most needs improvement in this case?",
        option: [
          "The clarity and accessibility of language to ensure students can interpret and use the feedback",
          "The level of detail, which should be increased to improve accuracy",
          "The grading scale to better reflect student performance",
          "The frequency of assignments to reinforce learning",
        ],
        answer: "The clarity and accessibility of language to ensure students can interpret and use the feedback",
        review:
          "Feedback is only effective if students can understand it. Accessibility is essential for usability and impact.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson2Id,
        scenario:
          "A teacher wants students to better understand why their quiz answers were incorrect and how to improve in the future.",
        questionType: "multiple-choice",
        question: "Which feedback approach most effectively supports conceptual understanding and future performance?",
        option: [
          "Provide explanations for both correct and incorrect answers, highlighting reasoning and misconceptions",
          "Only show the final score to emphasize overall performance",
          "Remove written feedback to reduce cognitive load",
          "Repeat the same questions to reinforce memorization",
        ],
        answer: "Provide explanations for both correct and incorrect answers, highlighting reasoning and misconceptions",
        review:
          "Explaining reasoning helps students understand not just what is correct, but why, supporting deeper learning and transfer.",
      },

      // Assessment and Feedback - Lesson 3
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson3Id,
        scenario:
          "Students complete a quiz, but the instructor returns the results three weeks later, after the class has already moved on to new content.",
        questionType: "multiple-choice",
        question: "What is the most significant risk of this delay in terms of learning effectiveness?",
        option: [
          "Students may no longer remember their reasoning, reducing the usefulness of the feedback",
          "Students may become overly focused on grades rather than learning",
          "Students may rely too heavily on instructor feedback instead of self-assessment",
          "Students may lose interest in the subject due to lack of challenge",
        ],
        answer: "Students may no longer remember their reasoning, reducing the usefulness of the feedback",
        review:
          "Feedback is most effective when it is timely. Delays reduce its impact because students cannot easily connect it to their original thinking.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson3Id,
        scenario:
          "During a class activity, a teacher immediately addresses a student's misunderstanding before allowing them to continue.",
        questionType: "multiple-choice",
        question: "Which feature of this feedback most directly supports learning?",
        option: [
          "Its immediacy allows misconceptions to be corrected before they are reinforced",
          "It provides a final evaluation of student understanding",
          "It reduces the need for future assessment",
          "It ensures that all students receive identical explanations",
        ],
        answer: "Its immediacy allows misconceptions to be corrected before they are reinforced",
        review:
          "Immediate feedback prevents incorrect thinking from becoming established, supporting more accurate understanding during the learning process.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson3Id,
        scenario:
          "An instructor provides brief comments during group discussions to guide students' thinking as they work.",
        questionType: "multiple-choice",
        question: "What is the primary instructional advantage of this approach?",
        option: [
          "It supports real-time adjustment of thinking while students are actively engaged",
          "It replaces the need for more formal assessment later",
          "It ensures that all errors are fully corrected immediately",
          "It reduces the need for student participation in discussion",
        ],
        answer: "It supports real-time adjustment of thinking while students are actively engaged",
        review:
          "Real-time feedback helps students refine their understanding during the task, making learning more immediate and effective.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson3Id,
        scenario:
          "Students receive feedback on their essays one week after submission, including detailed comments and suggestions for improvement.",
        questionType: "multiple-choice",
        question: "Which benefit most directly justifies this delay despite reduced immediacy?",
        option: [
          "It allows for more detailed, thoughtful, and higher-quality feedback",
          "It increases student motivation by building anticipation",
          "It reduces the need for revision by clarifying expectations later",
          "It ensures students rely less on instructor support",
        ],
        answer: "It allows for more detailed, thoughtful, and higher-quality feedback",
        review:
          "While immediate feedback is valuable, delayed feedback can provide deeper analysis, especially for complex tasks that require careful evaluation.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson3Id,
        scenario:
          "An instructor aims to provide quick guidance during learning activities while also offering in-depth evaluation for major assignments.",
        questionType: "multiple-choice",
        question: "Which approach most effectively balances these competing goals?",
        option: [
          "Combine immediate feedback during learning with delayed, detailed feedback for complex tasks",
          "Provide all feedback only at the end of the course to ensure completeness",
          "Focus exclusively on immediate feedback to maximize engagement",
          "Limit feedback to final grades to simplify assessment",
        ],
        answer: "Combine immediate feedback during learning with delayed, detailed feedback for complex tasks",
        review:
          "Effective feedback design balances timing and depth: immediate feedback supports ongoing learning, while delayed feedback allows for richer evaluation.",
      },

      // Assessment and Feedback - Lesson 4
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson4Id,
        scenario:
          "At the beginning of a project, students ask many questions about grading because expectations and evaluation criteria have not been clearly communicated.",
        questionType: "multiple-choice",
        question: "Which instructional adjustment would most effectively reduce confusion while supporting student performance?",
        option: [
          "Provide a detailed rubric in advance and explicitly review how each criterion applies to the task",
          "Grade the assignment first and explain criteria after students receive their results",
          "Limit explanation of criteria so students focus on completing the task",
          "Allow students to infer expectations independently to promote critical thinking",
        ],
        answer: "Provide a detailed rubric in advance and explicitly review how each criterion applies to the task",
        review:
          "Transparency is most effective when criteria are both provided and explained before the task, enabling students to align their work with expectations.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson4Id,
        scenario:
          "An instructor assigns a project but does not explain how it connects to the course learning objectives.",
        questionType: "multiple-choice",
        question: "What is the most significant instructional consequence of this omission?",
        option: [
          "Students may complete the task without understanding its purpose or relevance to learning goals",
          "Students may focus more on creativity rather than structure",
          "The assignment may become easier to complete due to reduced constraints",
          "Students may rely less on instructor guidance",
        ],
        answer: "Students may complete the task without understanding its purpose or relevance to learning goals",
        review:
          "Alignment between tasks and objectives helps students understand why they are learning something, which supports motivation and meaningful engagement.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson4Id,
        scenario:
          "A teacher structures feedback using the same criteria that were presented in the assignment rubric.",
        questionType: "multiple-choice",
        question: "What is the most significant benefit of aligning feedback with rubric criteria?",
        option: [
          "It ensures consistency between expectations, assessment, and feedback, improving clarity and fairness",
          "It reduces the need for detailed feedback by relying on predefined criteria",
          "It simplifies grading by limiting evaluation to a fixed checklist",
          "It minimizes student questions by standardizing responses",
        ],
        answer: "It ensures consistency between expectations, assessment, and feedback, improving clarity and fairness",
        review:
          "Alignment across objectives, criteria, and feedback creates coherence, helping students understand how their performance is evaluated and how to improve.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson4Id,
        scenario:
          "Students receive only a final score on an assignment, with no explanation or comments.",
        questionType: "multiple-choice",
        question: "Which aspect of effective feedback design is most critically missing?",
        option: [
          "Explanation that makes performance interpretable and actionable for improvement",
          "Clear learning objectives to guide the task",
          "Opportunities for classroom discussion",
          "Additional assessment tasks to reinforce learning",
        ],
        answer: "Explanation that makes performance interpretable and actionable for improvement",
        review:
          "Scores alone do not support learning. Students need explanations to understand their performance and identify how to improve.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson4Id,
        scenario:
          "An instructor clearly explains learning objectives, grading criteria, and expected outcomes before students begin a project.",
        questionType: "multiple-choice",
        question: "Which principle of assessment design is most strongly demonstrated by this practice?",
        option: [
          "Transparent and aligned assessment design that clarifies expectations and supports fairness",
          "Summative evaluation focused on final performance outcomes",
          "Flexible assessment that allows interpretation of expectations",
          "Minimal guidance to encourage independent learning",
        ],
        answer: "Transparent and aligned assessment design that clarifies expectations and supports fairness",
        review:
          "Transparency ensures that students understand expectations, while alignment connects objectives, tasks, and evaluation into a coherent system.",
      },

      // Assessment and Feedback - Lesson 5
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson5Id,
        scenario:
          "After reviewing quiz results, an instructor notices that a large proportion of students struggled with the same concept, despite it being covered in the lesson.",
        questionType: "multiple-choice",
        question: "Which instructional response most effectively uses assessment data to support learning?",
        option: [
          "Adjust instruction to reteach or clarify the concept using a different approach",
          "Continue with the original lesson plan to maintain pacing and coverage",
          "Record the grades and address misunderstandings only in future assessments",
          "Increase the difficulty of future tests to encourage deeper study",
        ],
        answer: "Adjust instruction to reteach or clarify the concept using a different approach",
        review:
          "Assessment data should inform instruction. Identifying patterns of misunderstanding allows instructors to adapt teaching to better support learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson5Id,
        scenario:
          "An instructor gives short, low-stakes quizzes throughout the course to monitor student understanding and adjust teaching accordingly.",
        questionType: "multiple-choice",
        question: "Which feature most accurately characterizes this type of assessment?",
        option: [
          "It is formative because it provides ongoing information that can guide instructional decisions",
          "It is summative because it contributes to final evaluation of student performance",
          "It is diagnostic because it occurs before instruction begins",
          "It is informal because it does not influence learning outcomes",
        ],
        answer: "It is formative because it provides ongoing information that can guide instructional decisions",
        review:
          "Formative assessment is defined by its purpose: informing teaching and supporting learning during the process, not just measuring outcomes.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson5Id,
        scenario:
          "At the end of a course, students complete a comprehensive exam that evaluates their overall learning.",
        questionType: "multiple-choice",
        question: "What is the primary limitation of this type of assessment in supporting ongoing learning?",
        option: [
          "It occurs after instruction is complete, limiting opportunities to adjust learning during the process",
          "It provides too much detailed information for students to interpret",
          "It reduces student motivation by focusing on final performance",
          "It requires alignment with learning objectives to be effective",
        ],
        answer: "It occurs after instruction is complete, limiting opportunities to adjust learning during the process",
        review:
          "Summative assessments measure outcomes but typically do not support real-time learning adjustments.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson5Id,
        scenario:
          "A teacher asks students to review feedback from previous assignments before starting a new project.",
        questionType: "multiple-choice",
        question: "Which learning principle is most directly supported by this practice?",
        option: [
          "Transfer of learning through applying prior feedback to new tasks",
          "Reduction of cognitive load by minimizing new information",
          "Summative evaluation of past performance",
          "Independent learning without instructional guidance",
        ],
        answer: "Transfer of learning through applying prior feedback to new tasks",
        review:
          "Feedback is most effective when students use it to improve future performance, demonstrating transfer of learning.",
      },
      {
        _id: new ObjectId(),
        lessonId: assessmentFeedbackLesson5Id,
        scenario:
          "An instructor designs assessments that directly measure the skills and knowledge outlined in the course learning objectives.",
        questionType: "multiple-choice",
        question: "Why is this alignment critical in effective assessment design?",
        option: [
          "It ensures that assessments validly measure the intended learning outcomes",
          "It simplifies grading by standardizing evaluation criteria",
          "It reduces the need for feedback by clarifying expectations",
          "It increases efficiency by limiting the scope of assessment tasks",
        ],
        answer: "It ensures that assessments validly measure the intended learning outcomes",
        review:
          "Alignment ensures validity—assessments must measure what they are intended to assess in order to accurately reflect learning.",
      },
    ]);

    console.log("✅ Seed complete");
    console.log("Courses:", {
      empathyCourseId: empathyCourseId.toHexString(),
      planningCourseId: planningCourseId.toHexString(),
      effectiveCommunicationCourseId:
      effectiveCommunicationCourseId.toHexString(),
      fundamentalsTeachingCourseId:
      fundamentalsTeachingCourseId.toHexString(),
      assessmentFeedbackCourseId:
      assessmentFeedbackCourseId.toHexString(),
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