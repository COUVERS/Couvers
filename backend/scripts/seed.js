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
      // Effective Communication - Lesson 1
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson1Id,
  scenario: "Students often misunderstand assignment instructions.",
  questionType: "multiple-choice",
  question: "What is the best way to improve clarity?",
  option: [
    "Use simple and clear language",
    "Add more complex terms",
    "Speak faster",
    "Skip explanations",
  ],
  answer: "Use simple and clear language",
  review:
    "Simple language helps students understand instructions more easily.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson1Id,
  scenario: "An instructor gives too much information at once.",
  questionType: "multiple-choice",
  question: "What should they do?",
  option: [
    "Break information into steps",
    "Add more details",
    "Speak longer",
    "Remove examples",
  ],
  answer: "Break information into steps",
  review:
    "Breaking information into steps makes it easier to follow.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson1Id,
  scenario: "Students seem confused after an explanation.",
  questionType: "multiple-choice",
  question: "What should the instructor do next?",
  option: [
    "Check for understanding",
    "Continue the lesson",
    "Ignore confusion",
    "End the class",
  ],
  answer: "Check for understanding",
  review:
    "Checking understanding helps identify confusion early.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson1Id,
  scenario:
    "An instructor uses technical jargon that students do not understand.",
  questionType: "multiple-choice",
  question: "What is the best solution?",
  option: [
    "Use simpler language",
    "Add more jargon",
    "Remove explanation",
    "Skip content",
  ],
  answer: "Use simpler language",
  review: "Simple language improves comprehension.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson1Id,
  scenario:
    "Students follow instructions easily and complete tasks correctly.",
  questionType: "multiple-choice",
  question: "What is the likely reason?",
  option: [
    "Clear communication",
    "Longer lecture",
    "Less interaction",
    "More assignments",
  ],
  answer: "Clear communication",
  review: "Clear communication leads to better understanding.",
},

// Effective Communication - Lesson 2
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson2Id,
  scenario:
    "A student explains confusion, but the instructor ignores it.",
  questionType: "multiple-choice",
  question: "What is missing?",
  option: [
    "Active listening",
    "Lesson planning",
    "Assessment",
    "Time management",
  ],
  answer: "Active listening",
  review:
    "Active listening helps instructors understand student concerns and respond effectively.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson2Id,
  scenario: "An instructor asks follow-up questions.",
  questionType: "multiple-choice",
  question: "What skill is being used?",
  option: [
    "Active listening",
    "Lecture delivery",
    "Evaluation",
    "Assessment",
  ],
  answer: "Active listening",
  review:
    "Follow-up questions help instructors understand student thinking more deeply.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson2Id,
  scenario: "Instructor repeats a student’s statement in their own words.",
  questionType: "multiple-choice",
  question: "What technique is this?",
  option: [
    "Paraphrasing",
    "Ignoring",
    "Testing",
    "Grading",
  ],
  answer: "Paraphrasing",
  review:
    "Paraphrasing confirms understanding and shows students that they are being heard.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson2Id,
  scenario: "Students feel heard and understood.",
  questionType: "multiple-choice",
  question: "What caused this?",
  option: [
    "Active listening",
    "Long lecture",
    "Fast pacing",
    "Less interaction",
  ],
  answer: "Active listening",
  review:
    "Active listening builds trust and improves communication.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson2Id,
  scenario: "An instructor avoids eye contact while students are speaking.",
  questionType: "multiple-choice",
  question: "What is the likely impact?",
  option: [
    "Poor communication",
    "Better clarity",
    "Faster learning",
    "Higher engagement",
  ],
  answer: "Poor communication",
  review:
    "Avoiding eye contact can make students feel ignored or unsupported.",
},

// Effective Communication - Lesson 3
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson3Id,
  scenario:
    "A student submits an answer, and the instructor says only, 'This is wrong.'",
  questionType: "multiple-choice",
  question: "What would make the feedback more constructive?",
  option: [
    "Explain what needs improvement",
    "End the conversation",
    "Repeat 'wrong' again",
    "Ignore the student’s effort",
  ],
  answer: "Explain what needs improvement",
  review:
    "Constructive feedback should explain how the student can improve.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson3Id,
  scenario:
    "An instructor tells a student, 'Your introduction is clear, but your conclusion needs more detail.'",
  questionType: "multiple-choice",
  question: "What makes this feedback effective?",
  option: [
    "It is specific and helpful",
    "It is too short",
    "It avoids improvement",
    "It removes support",
  ],
  answer: "It is specific and helpful",
  review:
    "Specific feedback helps students understand both strengths and areas for improvement.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson3Id,
  scenario:
    "A student feels discouraged after receiving harsh comments.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Use supportive language",
    "Add more criticism",
    "Stop giving feedback",
    "Ignore the student",
  ],
  answer: "Use supportive language",
  review:
    "Supportive feedback encourages learning and maintains motivation.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson3Id,
  scenario:
    "A teacher wants feedback to help students improve future work.",
  questionType: "multiple-choice",
  question: "What should the feedback include?",
  option: [
    "Clear suggestions for improvement",
    "Only praise",
    "Only grades",
    "No explanation",
  ],
  answer: "Clear suggestions for improvement",
  review:
    "Improvement-focused feedback gives students a clear next step.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson3Id,
  scenario:
    "Students understand both what they did well and what to improve.",
  questionType: "multiple-choice",
  question: "What is the most likely reason?",
  option: [
    "They received constructive feedback",
    "They had less practice",
    "The lesson was shorter",
    "The teacher gave no comments",
  ],
  answer: "They received constructive feedback",
  review:
    "Constructive feedback helps students recognize strengths and improve weaknesses.",
},

// Effective Communication - Lesson 4
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson4Id,
  scenario:
    "An instructor talks for the entire class without asking students any questions.",
  questionType: "multiple-choice",
  question: "What communication problem is present?",
  option: [
    "Lack of two-way communication",
    "Too much feedback",
    "Strong listening skills",
    "Effective interaction",
  ],
  answer: "Lack of two-way communication",
  review:
    "Students need opportunities to participate for communication to be interactive.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson4Id,
  scenario:
    "A teacher asks, 'What do you think is the main idea here?'",
  questionType: "multiple-choice",
  question: "What strategy is being used?",
  option: [
    "Open-ended questioning",
    "Silent instruction",
    "Grading",
    "Repetition only",
  ],
  answer: "Open-ended questioning",
  review:
    "Open-ended questions encourage student thinking and discussion.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson4Id,
  scenario:
    "Students feel comfortable asking questions during class.",
  questionType: "multiple-choice",
  question: "What is the likely reason?",
  option: [
    "The instructor encourages two-way communication",
    "The lesson is shorter",
    "The instructor avoids discussion",
    "There are fewer activities",
  ],
  answer: "The instructor encourages two-way communication",
  review:
    "Supportive communication encourages students to speak and ask questions.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson4Id,
  scenario:
    "A student shares an idea, and the instructor responds respectfully.",
  questionType: "multiple-choice",
  question: "What is the benefit of this response?",
  option: [
    "It encourages participation",
    "It ends discussion",
    "It reduces interaction",
    "It creates confusion",
  ],
  answer: "It encourages participation",
  review:
    "Respectful responses help students feel safe and willing to contribute.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson4Id,
  scenario:
    "Students remain silent because they feel their opinions are not valued.",
  questionType: "multiple-choice",
  question: "What should the instructor improve?",
  option: [
    "Encourage respectful two-way communication",
    "Add more written tests",
    "Speak longer",
    "Reduce opportunities for discussion",
  ],
  answer: "Encourage respectful two-way communication",
  review:
    "Students participate more when they know their voices matter.",
},

// Effective Communication - Lesson 5
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson5Id,
  scenario:
    "An instructor gives clear instructions but avoids eye contact and speaks in a flat tone.",
  questionType: "multiple-choice",
  question: "What communication issue may result?",
  option: [
    "Students may lose attention",
    "Students will always understand better",
    "Participation will automatically increase",
    "The lesson will become shorter",
  ],
  answer: "Students may lose attention",
  review:
    "Nonverbal communication affects attention and engagement.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson5Id,
  scenario:
    "A teacher smiles, uses eye contact, and gestures while explaining a concept.",
  questionType: "multiple-choice",
  question: "What is the likely effect?",
  option: [
    "Students feel more engaged",
    "Students become more confused",
    "Communication becomes weaker",
    "Interaction decreases",
  ],
  answer: "Students feel more engaged",
  review:
    "Positive nonverbal signals help students stay focused and comfortable.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson5Id,
  scenario:
    "An instructor’s words are supportive, but their tone sounds impatient.",
  questionType: "multiple-choice",
  question: "What problem does this create?",
  option: [
    "Mixed messages",
    "Better clarity",
    "Stronger trust",
    "Higher motivation",
  ],
  answer: "Mixed messages",
  review:
    "When tone and words do not match, students may feel confused.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson5Id,
  scenario:
    "A teacher uses gestures to emphasize key ideas during instruction.",
  questionType: "multiple-choice",
  question: "Why is this helpful?",
  option: [
    "It reinforces important points",
    "It removes the need for explanation",
    "It reduces understanding",
    "It discourages participation",
  ],
  answer: "It reinforces important points",
  review:
    "Purposeful gestures make messages clearer and more memorable.",
},
{
  _id: new ObjectId(),
  lessonId: effectiveCommunicationLesson5Id,
  scenario:
    "Students feel comfortable and attentive during a lesson.",
  questionType: "multiple-choice",
  question: "Which factor may have contributed?",
  option: [
    "Effective nonverbal communication",
    "Less instructor presence",
    "No interaction",
    "Fewer explanations",
  ],
  answer: "Effective nonverbal communication",
  review:
    "Positive nonverbal communication supports a better learning environment.",
},

// Fundamentals of Teaching - Lesson 1
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson1Id,
  scenario:
    "An instructor plans several activities but does not define what students should learn.",
  questionType: "multiple-choice",
  question: "What is the main issue?",
  option: [
    "Lack of clear learning objectives",
    "Too much student interaction",
    "Overuse of assessment",
    "Excessive structure",
  ],
  answer: "Lack of clear learning objectives",
  review:
    "Without clear objectives, instruction lacks direction and purpose.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson1Id,
  scenario:
    "A lesson objective states, 'Students will understand communication.'",
  questionType: "multiple-choice",
  question: "Why is this ineffective?",
  option: [
    "It is not measurable",
    "It is too detailed",
    "It is too specific",
    "It is too short",
  ],
  answer: "It is not measurable",
  review:
    "Objectives must be observable and measurable to guide assessment.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson1Id,
  scenario:
    "Activities in a lesson do not relate to the stated objective.",
  questionType: "multiple-choice",
  question: "What problem does this create?",
  option: [
    "Misalignment between teaching and learning goals",
    "Too much clarity",
    "Excessive engagement",
    "Reduced flexibility",
  ],
  answer: "Misalignment between teaching and learning goals",
  review:
    "Alignment ensures that activities support learning outcomes.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson1Id,
  scenario:
    "An instructor clearly explains what students will achieve by the end of the lesson.",
  questionType: "multiple-choice",
  question: "What is the benefit?",
  option: [
    "Students can focus their efforts",
    "Students become passive",
    "Instruction becomes slower",
    "Engagement decreases",
  ],
  answer: "Students can focus their efforts",
  review:
    "Clear objectives help students understand expectations.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson1Id,
  scenario:
    "Students complete tasks but are unsure what they learned.",
  questionType: "multiple-choice",
  question: "What is likely missing?",
  option: [
    "Clearly defined objectives",
    "More assignments",
    "Faster pacing",
    "Less explanation",
  ],
  answer: "Clearly defined objectives",
  review:
    "Objectives clarify the purpose of learning activities.",
},

// Fundamentals of Teaching - Lesson 2
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson2Id,
  scenario:
    "An instructor presents too many concepts in a short time.",
  questionType: "multiple-choice",
  question: "What is the likely result?",
  option: [
    "Cognitive overload",
    "Increased retention",
    "Higher engagement",
    "Faster learning",
  ],
  answer: "Cognitive overload",
  review:
    "Too much information at once overwhelms learners.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson2Id,
  scenario:
    "Students struggle to follow a complex explanation.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Break the content into smaller parts",
    "Speak faster",
    "Add more detail",
    "Skip examples",
  ],
  answer: "Break the content into smaller parts",
  review:
    "Chunking information reduces cognitive load.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson2Id,
  scenario:
    "An instructor demonstrates a process before asking students to try it.",
  questionType: "multiple-choice",
  question: "What strategy is this?",
  option: [
    "Reducing cognitive load",
    "Increasing difficulty",
    "Removing structure",
    "Skipping instruction",
  ],
  answer: "Reducing cognitive load",
  review:
    "Examples help students understand before applying knowledge.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson2Id,
  scenario:
    "Students are given time to think before answering.",
  questionType: "multiple-choice",
  question: "What does this support?",
  option: [
    "Processing and comprehension",
    "Faster pacing",
    "Reduced engagement",
    "Less interaction",
  ],
  answer: "Processing and comprehension",
  review:
    "Processing time helps students understand information.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson2Id,
  scenario:
    "Students become frustrated during a fast-paced lesson.",
  questionType: "multiple-choice",
  question: "What is the likely issue?",
  option: [
    "Poor pacing and overload",
    "Too much clarity",
    "Too many objectives",
    "Excessive structure",
  ],
  answer: "Poor pacing and overload",
  review:
    "Poor pacing increases cognitive load and frustration.",
},

// Fundamentals of Teaching - Lesson 3
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson3Id,
  scenario:
    "Some students complete tasks quickly while others struggle to keep up.",
  questionType: "multiple-choice",
  question: "What is the best instructional approach?",
  option: [
    "Provide different levels of task difficulty",
    "Give the same task to everyone",
    "Reduce the lesson content",
    "Ignore differences",
  ],
  answer: "Provide different levels of task difficulty",
  review:
    "Adjusting task difficulty helps meet diverse learning needs.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson3Id,
  scenario:
    "Students struggle to understand a concept explained in only one way.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Provide multiple examples",
    "Repeat the same explanation",
    "Move to the next topic",
    "Remove the concept",
  ],
  answer: "Provide multiple examples",
  review:
    "Different explanations help reach more learners.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson3Id,
  scenario:
    "An instructor only uses lectures during class.",
  questionType: "multiple-choice",
  question: "What improvement supports differentiation?",
  option: [
    "Use varied instructional methods",
    "Extend lecture time",
    "Reduce interaction",
    "Remove examples",
  ],
  answer: "Use varied instructional methods",
  review:
    "Different teaching methods support different learning styles.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson3Id,
  scenario:
    "Some students feel bored because tasks are too easy.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Provide more challenging tasks",
    "Reduce difficulty further",
    "Skip activities",
    "Ignore feedback",
  ],
  answer: "Provide more challenging tasks",
  review:
    "Appropriate challenge maintains engagement.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson3Id,
  scenario:
    "All students are able to participate and understand the lesson.",
  questionType: "multiple-choice",
  question: "What likely contributed to this outcome?",
  option: [
    "Differentiated instruction",
    "Less interaction",
    "Faster pacing",
    "Fewer activities",
  ],
  answer: "Differentiated instruction",
  review:
    "Differentiation supports broader student success.",
},

// Fundamentals of Teaching - Lesson 4
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson4Id,
  scenario:
    "Students look confused, but the instructor continues without stopping.",
  questionType: "multiple-choice",
  question: "What is the issue?",
  option: [
    "Lack of monitoring",
    "Too much assessment",
    "Strong pacing",
    "Effective instruction",
  ],
  answer: "Lack of monitoring",
  review:
    "Ignoring student signals prevents effective teaching adjustments.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson4Id,
  scenario:
    "An instructor asks, 'Can someone explain this in their own words?'",
  questionType: "multiple-choice",
  question: "What is the purpose?",
  option: [
    "Check understanding",
    "End the lesson",
    "Reduce interaction",
    "Test memory only",
  ],
  answer: "Check understanding",
  review:
    "Checking understanding helps identify learning gaps.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson4Id,
  scenario:
    "Students struggle with a concept during an activity.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Clarify and provide another example",
    "Move on quickly",
    "End the lesson",
    "Ignore the issue",
  ],
  answer: "Clarify and provide another example",
  review:
    "Immediate adjustment improves understanding.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson4Id,
  scenario:
    "An instructor observes that students are disengaged.",
  questionType: "multiple-choice",
  question: "What is the best response?",
  option: [
    "Adjust the activity or approach",
    "Continue as planned",
    "Remove interaction",
    "End discussion",
  ],
  answer: "Adjust the activity or approach",
  review:
    "Adjusting instruction helps restore engagement.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson4Id,
  scenario:
    "An instructor continuously adapts explanations based on student responses.",
  questionType: "multiple-choice",
  question: "What teaching quality does this demonstrate?",
  option: [
    "Responsive teaching",
    "Passive instruction",
    "Fixed planning",
    "Minimal engagement",
  ],
  answer: "Responsive teaching",
  review:
    "Responsive teaching improves learning effectiveness.",
},

// Fundamentals of Teaching - Lesson 5
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson5Id,
  scenario:
    "Students are unsure about classroom rules.",
  questionType: "multiple-choice",
  question: "What should the instructor do?",
  option: [
    "Set clear expectations",
    "Ignore the issue",
    "Add more content",
    "Reduce interaction",
  ],
  answer: "Set clear expectations",
  review:
    "Clear expectations create structure and consistency.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson5Id,
  scenario:
    "Rules are applied differently to different students.",
  questionType: "multiple-choice",
  question: "What problem does this create?",
  option: [
    "Lack of consistency",
    "Strong engagement",
    "Better communication",
    "Faster learning",
  ],
  answer: "Lack of consistency",
  review:
    "Consistency is essential for fairness and trust.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson5Id,
  scenario:
    "Students feel respected and comfortable in class.",
  questionType: "multiple-choice",
  question: "What is the likely cause?",
  option: [
    "Positive learning environment",
    "Less structure",
    "Faster pacing",
    "Fewer activities",
  ],
  answer: "Positive learning environment",
  review:
    "Respectful environments encourage participation.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson5Id,
  scenario:
    "Disruptive behavior increases during lessons.",
  questionType: "multiple-choice",
  question: "What should the instructor improve?",
  option: [
    "Classroom management",
    "Reduce clarity",
    "Remove structure",
    "Avoid feedback",
  ],
  answer: "Classroom management",
  review:
    "Effective classroom management reduces disruptions.",
},
{
  _id: new ObjectId(),
  lessonId: fundamentalsTeachingLesson5Id,
  scenario:
    "Students actively participate and stay focused.",
  questionType: "multiple-choice",
  question: "What contributed to this?",
  option: [
    "Positive and structured environment",
    "Lack of rules",
    "Less communication",
    "Minimal interaction",
  ],
  answer: "Positive and structured environment",
  review:
    "A well-managed environment supports engagement and focus.",
},
// Assessment and Feedback - Lesson 1
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson1Id,
  scenario:
    "During a class activity, students receive their graded assignments. Most students quickly look at the grade and put the paper away without reviewing the comments provided by the instructor.",
  questionType: "multiple-choice",
  question: "What strategy could increase student engagement with the feedback?",
  option: [
    "Move on to the next topic immediately",
    "Ask students to write a short reflection about the feedback",
    "Remove written feedback from assignments",
    "Only provide final grades",
  ],
  answer: "Ask students to write a short reflection about the feedback",
  review:
    "Reflection activities encourage students to actively process feedback instead of ignoring it. When students analyze their own performance, they become more engaged in improving their learning.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson1Id,
  scenario:
    "An instructor wants students to better understand the evaluation criteria used for their projects. Many students seem unsure about how their work will be graded.",
  questionType: "multiple-choice",
  question: "What is the best way to involve students in the assessment process?",
  option: [
    "Share the grading rubric and review it with the class",
    "Keep the evaluation criteria private",
    "Grade the work without explanation",
    "Only announce final scores",
  ],
  answer: "Share the grading rubric and review it with the class",
  review:
    "Reviewing the rubric with students helps them understand expectations and encourages active participation in the assessment process.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson1Id,
  scenario:
    "During peer review activities, students are asked to evaluate each other's work and provide suggestions for improvement.",
  questionType: "multiple-choice",
  question: "What is the main benefit of peer assessment?",
  option: [
    "It replaces teacher feedback",
    "It helps students develop analytical and critical thinking skills",
    "It eliminates grading responsibilities",
    "It reduces the need for assignments",
  ],
  answer: "It helps students develop analytical and critical thinking skills",
  review:
    "Peer assessment encourages students to analyze work using evaluation criteria, which strengthens their critical thinking and understanding of quality work.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson1Id,
  scenario:
    "After returning quizzes, an instructor asks students to identify one mistake they made and explain how they would correct it.",
  questionType: "multiple-choice",
  question: "What learning strategy is the instructor using?",
  option: [
    "Self-assessment",
    "Summative grading",
    "Passive evaluation",
    "Random testing",
  ],
  answer: "Self-assessment",
  review:
    "Self-assessment encourages students to reflect on their own learning and take responsibility for improving their performance.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson1Id,
  scenario:
    "Students receive detailed feedback on a writing assignment, but many still repeat the same mistakes in the next task.",
  questionType: "multiple-choice",
  question: "What might help students apply feedback more effectively?",
  option: [
    "Giving feedback only at the end of the course",
    "Asking students to revise their work based on feedback",
    "Removing written comments",
    "Grading more strictly",
  ],
  answer: "Asking students to revise their work based on feedback",
  review:
    "Revision activities encourage students to apply feedback directly, reinforcing learning and improving future performance.",
},

// Assessment and Feedback - Lesson 2
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson2Id,
  scenario:
    "A student receives the comment 'Needs improvement' on an assignment but is unsure what specifically should be improved.",
  questionType: "multiple-choice",
  question: "What is the main issue with this feedback?",
  option: [
    "It is too positive",
    "It is too detailed",
    "It is too vague",
    "It is too long",
  ],
  answer: "It is too vague",
  review:
    "Vague feedback does not provide enough information for students to understand how to improve their work.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson2Id,
  scenario:
    "An instructor writes the following feedback on a student essay: 'Your argument is clear, but adding supporting evidence would strengthen your analysis.'",
  questionType: "multiple-choice",
  question: "Why is this feedback effective?",
  option: [
    "It only focuses on mistakes",
    "It balances strengths and improvement suggestions",
    "It avoids explanation",
    "It removes evaluation criteria",
  ],
  answer: "It balances strengths and improvement suggestions",
  review:
    "Effective feedback highlights both strengths and areas for improvement, helping students build on what they already do well.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson2Id,
  scenario:
    "Students often misunderstand assignment expectations, even after receiving feedback.",
  questionType: "multiple-choice",
  question: "What strategy could improve feedback clarity?",
  option: [
    "Provide examples of strong responses",
    "Reduce feedback detail",
    "Avoid explaining mistakes",
    "Only assign grades",
  ],
  answer: "Provide examples of strong responses",
  review:
    "Examples help students visualize expectations and understand how to improve their work.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson2Id,
  scenario:
    "An instructor gives extensive feedback using complex academic language that students struggle to understand.",
  questionType: "multiple-choice",
  question: "What should the instructor improve?",
  option: [
    "The length of the assignment",
    "The clarity and accessibility of the feedback language",
    "The grading scale",
    "The number of assignments",
  ],
  answer: "The clarity and accessibility of the feedback language",
  review:
    "Feedback should be clear and accessible so students can easily interpret and apply it.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson2Id,
  scenario:
    "A teacher wants students to better understand why their answers were incorrect in a quiz.",
  questionType: "multiple-choice",
  question: "What is the most effective feedback approach?",
  option: [
    "Provide explanations for correct and incorrect answers",
    "Only show the final score",
    "Remove written feedback",
    "Repeat the same questions",
  ],
  answer: "Provide explanations for correct and incorrect answers",
  review:
    "Explaining both correct and incorrect responses helps students understand concepts and avoid repeating mistakes.",
},

// Assessment and Feedback - Lesson 3
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson3Id,
  scenario:
    "Students complete a quiz, but the instructor waits three weeks to return the results.",
  questionType: "multiple-choice",
  question: "What is the main risk of delayed feedback?",
  option: [
    "Students may forget the context of their answers",
    "Students learn faster",
    "Students become more engaged",
    "Students stop asking questions",
  ],
  answer: "Students may forget the context of their answers",
  review:
    "Delayed feedback reduces learning impact because students may no longer remember their reasoning.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson3Id,
  scenario:
    "During a class activity, a teacher immediately corrects a misunderstanding before students continue working.",
  questionType: "multiple-choice",
  question: "What type of feedback is this?",
  option: [
    "Immediate feedback",
    "Summative feedback",
    "Final evaluation",
    "Delayed feedback",
  ],
  answer: "Immediate feedback",
  review:
    "Immediate feedback helps prevent misconceptions from continuing during the learning process.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson3Id,
  scenario:
    "An instructor provides short comments during group discussions to guide student thinking.",
  questionType: "multiple-choice",
  question: "What is the advantage of this feedback approach?",
  option: [
    "It supports learning in real time",
    "It replaces final evaluation",
    "It eliminates mistakes",
    "It reduces student participation",
  ],
  answer: "It supports learning in real time",
  review:
    "Real-time feedback helps students adjust their thinking while they are still engaged in the task.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson3Id,
  scenario:
    "Students receive feedback on their essays one week after submission, along with suggestions for improvement.",
  questionType: "multiple-choice",
  question: "Why can delayed feedback sometimes be beneficial?",
  option: [
    "It allows more detailed evaluation",
    "It removes grading effort",
    "It prevents student reflection",
    "It eliminates revisions",
  ],
  answer: "It allows more detailed evaluation",
  review:
    "Delayed feedback allows instructors to provide more thoughtful and detailed analysis of student work.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson3Id,
  scenario:
    "An instructor wants to balance quick feedback during classroom activities with more detailed evaluation of larger assignments.",
  questionType: "multiple-choice",
  question: "What is the best approach?",
  option: [
    "Combine immediate and delayed feedback strategies",
    "Only provide feedback at the end of the course",
    "Avoid giving feedback during lessons",
    "Focus only on final grades",
  ],
  answer: "Combine immediate and delayed feedback strategies",
  review:
    "Combining immediate and delayed feedback allows instructors to address misconceptions quickly while still providing thoughtful and detailed evaluation for complex assignments.",
},

// Assessment and Feedback - Lesson 4
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson4Id,
  scenario:
    "At the beginning of a project, students ask many questions about how their work will be graded because the expectations are not clearly explained.",
  questionType: "multiple-choice",
  question: "What could help prevent this confusion?",
  option: [
    "Providing a detailed rubric before students begin the assignment",
    "Grading the assignment without explaining criteria",
    "Only giving feedback after grading",
    "Letting students guess the expectations",
  ],
  answer: "Providing a detailed rubric before students begin the assignment",
  review:
    "Providing a rubric helps students understand evaluation criteria before completing the task, which reduces confusion and improves performance.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson4Id,
  scenario:
    "An instructor designs an assignment but does not explain how it connects to the course learning objectives.",
  questionType: "multiple-choice",
  question: "Why might this be problematic?",
  option: [
    "Students may not understand the purpose of the assignment",
    "Students will complete the task faster",
    "Students will automatically improve their grades",
    "The assignment will become easier",
  ],
  answer: "Students may not understand the purpose of the assignment",
  review:
    "When assignments are clearly connected to learning objectives, students understand the purpose of the task and how it supports their learning.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson4Id,
  scenario:
    "A teacher structures feedback using the same criteria that were presented in the assignment rubric.",
  questionType: "multiple-choice",
  question: "What is the benefit of this approach?",
  option: [
    "It creates consistency between expectations and evaluation",
    "It reduces the need for assessment",
    "It eliminates grading responsibilities",
    "It simplifies course content",
  ],
  answer: "It creates consistency between expectations and evaluation",
  review:
    "Aligning feedback with rubric criteria ensures transparency and helps students clearly understand how their work meets or falls short of expectations.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson4Id,
  scenario:
    "Students submit an assignment but receive only a final score without comments or explanation.",
  questionType: "multiple-choice",
  question: "What key component of structured feedback is missing?",
  option: [
    "Explanation of performance",
    "Clear learning objectives",
    "Assignment instructions",
    "Classroom discussion",
  ],
  answer: "Explanation of performance",
  review:
    "Structured feedback should include explanations that help students understand how their work was evaluated and what improvements are needed.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson4Id,
  scenario:
    "An instructor explains the learning objectives, grading criteria, and expected outcomes before students begin a project.",
  questionType: "multiple-choice",
  question: "What principle of assessment design is the instructor applying?",
  option: [
    "Transparent assessment structure",
    "Random evaluation",
    "Passive grading",
    "Delayed instruction",
  ],
  answer: "Transparent assessment structure",
  review:
    "Transparent assessment structures help students understand expectations and increase fairness and clarity in the evaluation process.",
},

// Assessment and Feedback - Lesson 5
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson5Id,
  scenario:
    "After reviewing quiz results, an instructor notices that many students struggled with the same concept.",
  questionType: "multiple-choice",
  question: "How can assessment results best support teaching in this situation?",
  option: [
    "Adjust instruction to address the misunderstanding",
    "Ignore the results and continue the lesson plan",
    "Only record the grades",
    "Increase the difficulty of future tests",
  ],
  answer: "Adjust instruction to address the misunderstanding",
  review:
    "Assessment results provide valuable insights into student understanding and can guide instructors in adjusting their teaching strategies.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson5Id,
  scenario:
    "An instructor gives students short quizzes throughout the course to monitor their understanding of key concepts.",
  questionType: "multiple-choice",
  question: "What type of assessment is being used?",
  option: [
    "Formative assessment",
    "Final evaluation",
    "Summative certification",
    "Random testing",
  ],
  answer: "Formative assessment",
  review:
    "Formative assessments are used during the learning process to monitor progress and provide opportunities for improvement.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson5Id,
  scenario:
    "At the end of a course, students complete a comprehensive exam that evaluates everything they have learned.",
  questionType: "multiple-choice",
  question: "What type of assessment is this?",
  option: [
    "Summative assessment",
    "Diagnostic assessment",
    "Informal feedback",
    "Self-reflection",
  ],
  answer: "Summative assessment",
  review:
    "Summative assessments measure overall learning outcomes at the end of an instructional period.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson5Id,
  scenario:
    "A teacher encourages students to review feedback from previous assignments before starting a new project.",
  questionType: "multiple-choice",
  question: "What is the main purpose of this practice?",
  option: [
    "To help students apply feedback to future work",
    "To reduce grading effort",
    "To shorten assignments",
    "To avoid assessment",
  ],
  answer: "To help students apply feedback to future work",
  review:
    "Reviewing feedback before starting new work encourages students to apply previous learning and improve their performance.",
},
{
  _id: new ObjectId(),
  lessonId: assessmentFeedbackLesson5Id,
  scenario:
    "An instructor designs assessments that measure the same skills outlined in the course learning objectives.",
  questionType: "multiple-choice",
  question: "Why is this alignment important?",
  option: [
    "It ensures that assessments measure the intended learning outcomes",
    "It simplifies grading",
    "It reduces student participation",
    "It eliminates feedback",
  ],
  answer: "It ensures that assessments measure the intended learning outcomes",
  review:
    "Aligning assessments with learning objectives ensures that evaluations accurately measure the skills and knowledge students are expected to develop.",
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