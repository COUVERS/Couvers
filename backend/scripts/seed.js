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
      "This lesson explores how instructors can design lessons that actively engage learners.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explores how instructors can design lessons that actively engage learners.",
          "Engagement is not only about keeping students busy; it is about creating meaningful opportunities for participation, thinking, and interaction.",
        ],
      },
      {
        heading: "Why Engagement Matters",
        content: [
          "A well-planned lesson encourages students to become active participants in the learning process rather than passive listeners.",
          "Student engagement is one of the strongest predictors of successful learning.",
          "When learners are actively involved, they are more likely to understand concepts, retain information, and apply knowledge.",
        ],
      },
      {
        heading: "Planning Strategies",
        content: [
          "Effective lesson plans often include interactive questions, collaborative learning, and application activities.",
          "These strategies help students connect ideas, participate more fully, and stay focused on learning goals.",
        ],
      },
    ],
    keyTakeaways: [
      "Engagement supports understanding, retention, and application.",
      "Active participation is more effective than passive listening.",
      "Discussion, collaboration, and application increase engagement.",
    ],
  },
  {
    _id: planningLesson2Id,
    courseId: planningCourseId,
    skillId: explanationClaritySkillId,
    order: 2,
    title: "Explaining Learning Objectives Clearly",
    lessonDescription:
      "This lesson focuses on communicating lesson goals clearly so students know what they are expected to learn.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on communicating lesson goals clearly.",
          "When students understand what they are expected to learn, they can focus their efforts more effectively.",
        ],
      },
      {
        heading: "What Learning Objectives Do",
        content: [
          "Learning objectives describe the knowledge or skills students should develop.",
          "Effective objectives are specific, measurable, and observable.",
        ],
      },
      {
        heading: "Why Clarity Matters",
        content: [
          "Clear objectives help students understand lesson goals, focus on important information, and monitor their progress.",
          "Instructors should present objectives at the start, use simple language, and connect objectives to real-world applications.",
        ],
      },
    ],
    keyTakeaways: [
      "Students learn better when goals are clear.",
      "Objectives should be specific, measurable, and understandable.",
      "Simple language helps students focus on what matters most.",
    ],
  },
  {
    _id: planningLesson3Id,
    courseId: planningCourseId,
    skillId: pacingSkillId,
    order: 3,
    title: "Managing Time Effectively in a Lesson",
    lessonDescription:
      "This lesson examines how instructors manage time effectively so lessons move at an appropriate pace.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explores how instructors manage time effectively during lessons.",
          "Pacing ensures lessons move smoothly while allowing time for understanding and practice.",
        ],
      },
      {
        heading: "Why Pacing Matters",
        content: [
          "Poor pacing can cause confusion when lessons move too fast, or boredom when they move too slowly.",
          "Balanced pacing keeps students engaged and supports deeper understanding.",
        ],
      },
      {
        heading: "Planning for Time",
        content: [
          "Effective lessons often include an introduction, learning activities, and a conclusion, with time distributed intentionally across each phase.",
          "Good pacing also includes flexibility so instructors can respond to student needs.",
        ],
      },
    ],
    keyTakeaways: [
      "Pacing supports both engagement and understanding.",
      "Too fast and too slow both reduce effectiveness.",
      "Intentional time distribution improves lesson flow.",
    ],
  },
  {
    _id: planningLesson4Id,
    courseId: planningCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Structuring an Effective Lesson",
    lessonDescription:
      "This lesson explains how instructors organize lessons into clear and logical stages.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explains how instructors organize lessons into clear and logical stages.",
          "A well-structured lesson usually includes an introduction, instruction and practice, and lesson closure.",
        ],
      },
      {
        heading: "Why Structure Matters",
        content: [
          "Clear structure helps students follow the progression of ideas and understand how different activities support the learning goals.",
          "It also helps instructors maintain focus and coherence throughout the lesson.",
        ],
      },
      {
        heading: "A Practical Framework",
        content: [
          "Structure provides a framework that guides both teaching and learning.",
          "When lessons are organized into predictable stages, students can engage more confidently and effectively.",
        ],
      },
    ],
    keyTakeaways: [
      "Strong structure helps students follow the lesson.",
      "Clear phases support clarity and focus.",
      "A framework improves both teaching and learning.",
    ],
  },
  {
    _id: planningLesson5Id,
    courseId: planningCourseId,
    skillId: assessmentSkillId,
    order: 5,
    title: "Planning Lessons with Assessment in Mind",
    lessonDescription:
      "This lesson focuses on integrating assessment into lesson planning to monitor student learning.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on integrating assessment into lesson planning to monitor student learning.",
          "Assessment helps instructors determine whether students are achieving the learning objectives.",
        ],
      },
      {
        heading: "Why Assessment Should Be Planned",
        content: [
          "Effective lesson planning includes opportunities to evaluate understanding throughout the learning process using both informal and formal assessment methods.",
          "When assessment is built into the lesson, instructors can identify misunderstandings earlier.",
        ],
      },
      {
        heading: "Instructional Benefits",
        content: [
          "When assessment is integrated into planning, instructors can adjust instruction more effectively.",
          "This helps lessons stay aligned with objectives and improves student success.",
        ],
      },
    ],
    keyTakeaways: [
      "Assessment should be part of planning, not an afterthought.",
      "Assessment helps monitor progress toward objectives.",
      "Integrated assessment supports instructional adjustment.",
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
      "This lesson focuses on how instructors can communicate ideas clearly to students.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors can communicate ideas clearly to students.",
          "Clear communication ensures that students understand instructions, expectations, and concepts without confusion.",
        ],
      },
      {
        heading: "Why Clear Communication Matters",
        content: [
          "When communication is unclear, students may struggle to follow directions or misunderstand key ideas.",
          "Clear communication helps students understand instructions accurately, stay focused on learning objectives, reduce mistakes and confusion, and feel more confident in their learning.",
        ],
      },
      {
        heading: "Strategies for Clarity",
        content: [
          "Instructors can improve clarity by using simple and direct language, breaking information into smaller steps, and checking for understanding before moving forward.",
          "Clear communication reduces confusion and helps students focus on learning.",
        ],
      },
    ],
    keyTakeaways: [
      "Clear communication improves understanding and confidence.",
      "Simple language and step-by-step explanation support clarity.",
      "Checking understanding helps prevent confusion early.",
    ],
  },
  {
    _id: effectiveCommunicationLesson2Id,
    courseId: effectiveCommunicationCourseId,
    skillId: studentEngagementSkillId,
    order: 2,
    title: "Active Listening in Teaching",
    lessonDescription:
      "This lesson focuses on active listening as a communication skill that helps instructors understand student needs.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on active listening, a key communication skill that helps instructors understand student needs and respond effectively.",
          "Active listening goes beyond hearing and requires attention, understanding, and thoughtful responses.",
        ],
      },
      {
        heading: "Why Active Listening Matters",
        content: [
          "Active listening helps instructors understand student questions clearly, identify misunderstandings, build trust with students, and create a supportive learning environment.",
          "Without active listening, students may feel ignored, misunderstandings may increase, and communication becomes ineffective.",
        ],
      },
      {
        heading: "Practical Listening Strategies",
        content: [
          "Instructors can improve active listening by maintaining eye contact, asking follow-up questions, and paraphrasing student responses.",
          "Active listening strengthens communication and helps instructors respond more effectively to student needs.",
        ],
      },
    ],
    keyTakeaways: [
      "Active listening strengthens trust and understanding.",
      "Follow-up questions and paraphrasing improve communication.",
      "Listening well helps instructors respond more effectively.",
    ],
  },
  {
    _id: effectiveCommunicationLesson3Id,
    courseId: effectiveCommunicationCourseId,
    skillId: assessmentSkillId,
    order: 3,
    title: "Giving Constructive Feedback",
    lessonDescription:
      "This lesson focuses on how instructors provide feedback that supports learning and improvement.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors provide feedback that supports learning and improvement.",
          "Constructive feedback helps students understand what they did well and how they can improve.",
        ],
      },
      {
        heading: "Why Feedback Matters",
        content: [
          "Instead of only pointing out mistakes, effective feedback guides students toward better performance.",
          "Constructive feedback helps students identify strengths, recognize mistakes, improve performance, and stay motivated.",
        ],
      },
      {
        heading: "How to Make Feedback Constructive",
        content: [
          "Instructors can improve feedback by being specific, focusing on improvement, and using supportive language.",
          "When feedback is clear, specific, and supportive, students are more likely to stay motivated and make progress.",
        ],
      },
    ],
    keyTakeaways: [
      "Constructive feedback guides improvement.",
      "Specific and supportive comments are more effective.",
      "Students benefit from knowing both strengths and next steps.",
    ],
  },
  {
    _id: effectiveCommunicationLesson4Id,
    courseId: effectiveCommunicationCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Encouraging Two-Way Communication",
    lessonDescription:
      "This lesson focuses on creating opportunities for interaction and discussion during teaching.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on two-way communication in teaching.",
          "Effective communication is not only about instructors delivering information. It also involves giving students opportunities to ask questions, share ideas, and participate in discussion.",
        ],
      },
      {
        heading: "Why Two-Way Communication Matters",
        content: [
          "Two-way communication creates a more interactive and engaging learning environment.",
          "It helps students participate actively in learning, ask questions when confused, share ideas and perspectives, and feel more involved in the lesson.",
        ],
      },
      {
        heading: "How to Encourage It",
        content: [
          "Instructors can encourage two-way communication by asking open-ended questions, inviting student participation, and responding respectfully to student ideas.",
          "When students are encouraged to participate, they become more engaged and confident in expressing their ideas.",
        ],
      },
    ],
    keyTakeaways: [
      "Communication should flow both ways in effective teaching.",
      "Questions and participation increase engagement.",
      "Respectful responses encourage student contribution.",
    ],
  },
  {
    _id: effectiveCommunicationLesson5Id,
    courseId: effectiveCommunicationCourseId,
    skillId: explanationClaritySkillId,
    order: 5,
    title: "Using Nonverbal Communication Effectively",
    lessonDescription:
      "This lesson focuses on how nonverbal communication supports verbal communication in teaching.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on nonverbal communication, including facial expressions, gestures, eye contact, posture, and tone of voice.",
          "In teaching, communication is not only about words. Nonverbal signals also influence how students understand messages and how comfortable they feel in the classroom.",
        ],
      },
      {
        heading: "Why Nonverbal Communication Matters",
        content: [
          "Nonverbal communication helps instructors reinforce spoken messages, show confidence and clarity, create a welcoming environment, and keep students attentive and engaged.",
          "Poor nonverbal communication may lead to mixed messages, student discomfort, reduced attention, and misunderstandings.",
        ],
      },
      {
        heading: "How to Use It Well",
        content: [
          "Instructors can strengthen nonverbal communication by maintaining eye contact, using positive facial expressions, and using gestures and tone purposefully.",
          "When instructors use eye contact, tone, posture, and gestures effectively, students are more likely to feel engaged, respected, and clear about the message.",
        ],
      },
    ],
    keyTakeaways: [
      "Nonverbal communication strengthens verbal messages.",
      "Eye contact, tone, and gestures affect engagement.",
      "Consistent nonverbal signals improve clarity and trust.",
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
      "This lesson focuses on how instructors define and use learning objectives to guide instruction.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors define and use learning objectives to guide instruction.",
          "Learning objectives clarify what students should know or be able to do by the end of a lesson.",
        ],
      },
      {
        heading: "Why Objectives Matter",
        content: [
          "Effective teaching begins with clear outcomes. Without them, instruction can become unfocused, and students may not understand what they are expected to achieve.",
          "Learning objectives help instructors define the purpose of the lesson, align activities with goals, measure student understanding, and maintain instructional focus.",
        ],
      },
      {
        heading: "Characteristics of Strong Objectives",
        content: [
          "Without clear objectives, lessons may lack direction, activities may feel disconnected, assessment becomes ineffective, and students may feel confused.",
          "Effective objectives are specific, measurable, aligned with instruction, and clearly communicated to students.",
        ],
      },
    ],
    keyTakeaways: [
      "Learning objectives guide teaching and assessment.",
      "Clear goals improve lesson focus.",
      "Strong objectives should be specific and measurable.",
    ],
  },
  {
    _id: fundamentalsTeachingLesson2Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: pacingSkillId,
    order: 2,
    title: "Managing Cognitive Load in Instruction",
    lessonDescription:
      "This lesson focuses on how instructors manage cognitive load during instruction.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors manage cognitive load, which is the amount of mental effort required to learn new information.",
          "When lessons are too complex or too fast, students may feel overwhelmed and struggle to process information.",
        ],
      },
      {
        heading: "Why Cognitive Load Matters",
        content: [
          "Managing cognitive load helps prevent student overload, improve comprehension, support long-term retention, and maintain engagement.",
          "Poor cognitive load management can lead to confusion, frustration, reduced learning, and disengagement.",
        ],
      },
      {
        heading: "Instructional Strategies",
        content: [
          "Instructors can manage cognitive load by breaking content into smaller chunks, using examples before independent practice, and controlling the pace of instruction to allow time for processing and questions.",
          "Learning is more effective when information is presented in manageable amounts.",
        ],
      },
    ],
    keyTakeaways: [
      "Too much information at once can overwhelm learners.",
      "Chunking and examples reduce overload.",
      "Pacing and processing time support comprehension.",
    ],
  },
  {
    _id: fundamentalsTeachingLesson3Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: studentEngagementSkillId,
    order: 3,
    title: "Differentiating Instruction for Diverse Learners",
    lessonDescription:
      "This lesson explores how instructors adapt instruction to meet the needs of diverse learners.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explores how instructors adapt instruction to meet the needs of diverse learners.",
          "In any classroom, students vary in prior knowledge, learning pace, confidence levels, and preferred ways of learning.",
        ],
      },
      {
        heading: "Why Differentiation Matters",
        content: [
          "Effective teaching requires instructors to recognize these differences and adjust instruction so that all learners can access the material.",
          "Differentiation helps support learners with different ability levels, increase student engagement, reduce frustration and confusion, and ensure all students can participate meaningfully.",
        ],
      },
      {
        heading: "How to Differentiate",
        content: [
          "Without differentiation, some students may fall behind, others may lose interest due to lack of challenge, participation may decrease, and learning gaps may widen.",
          "Instructors can differentiate by providing multiple examples, adjusting task difficulty, and using varied instructional methods.",
        ],
      },
    ],
    keyTakeaways: [
      "Learners have different needs and starting points.",
      "Differentiation improves access and engagement.",
      "Flexible instruction supports broader student success.",
    ],
  },
  {
    _id: fundamentalsTeachingLesson4Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: assessmentSkillId,
    order: 4,
    title: "Monitoring and Adjusting Instruction in Real Time",
    lessonDescription:
      "This lesson focuses on how instructors monitor student understanding during a lesson and adjust instruction accordingly.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors monitor student understanding during a lesson and adjust instruction accordingly.",
          "Teaching is not a fixed process; it requires continuous observation and decision-making.",
        ],
      },
      {
        heading: "Why Monitoring Matters",
        content: [
          "Effective instructors pay attention to student responses, body language, and participation levels to determine whether learning is taking place.",
          "Monitoring helps instructors identify misunderstandings early, adjust instruction effectively, maintain student engagement, and improve learning outcomes.",
        ],
      },
      {
        heading: "Responsive Teaching",
        content: [
          "Without monitoring, confusion may go unnoticed, instruction may continue at the wrong level, students may disengage, and learning gaps may increase.",
          "Instructors can monitor and adjust instruction by asking checking-for-understanding questions, observing student behavior, and clarifying or slowing down when needed.",
        ],
      },
    ],
    keyTakeaways: [
      "Teaching requires ongoing observation and adjustment.",
      "Monitoring helps detect misunderstanding early.",
      "Responsive instruction improves learning outcomes.",
    ],
  },
  {
    _id: fundamentalsTeachingLesson5Id,
    courseId: fundamentalsTeachingCourseId,
    skillId: lessonStructureSkillId,
    order: 5,
    title: "Building a Positive and Productive Learning Environment",
    lessonDescription:
      "This lesson focuses on creating a learning environment that supports engagement, respect, and participation.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on creating a learning environment that supports student engagement, respect, and participation.",
          "A positive classroom environment encourages students to feel safe, valued, and motivated to learn.",
        ],
      },
      {
        heading: "Why Environment Matters",
        content: [
          "Effective instructors establish clear expectations, maintain consistency, and build respectful relationships with students.",
          "A positive environment helps increase student participation, build trust and respect, reduce disruptive behavior, and support consistent learning.",
        ],
      },
      {
        heading: "How to Build It",
        content: [
          "A negative environment may lead to disengagement, conflict, lack of focus, and reduced motivation.",
          "Instructors can build a productive learning environment by setting clear expectations, being consistent, and building respectful relationships.",
        ],
      },
    ],
    keyTakeaways: [
      "A strong environment supports both behavior and learning.",
      "Respect and consistency increase participation.",
      "Students engage more when they feel safe and supported.",
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
      "This lesson explores how instructors can increase student engagement during assessment and feedback processes.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explores how instructors can increase student engagement during assessment and feedback processes.",
          "When students actively participate in evaluating their learning, assessment becomes a learning tool rather than just a grading mechanism.",
        ],
      },
      {
        heading: "Why Engagement Matters in Assessment",
        content: [
          "Students who participate in the assessment process are more likely to reflect on their progress and take responsibility for improving their work.",
          "Traditional assessment often places students in a passive role where they simply receive grades.",
          "However, active engagement can transform assessment into a collaborative learning experience.",
        ],
      },
      {
        heading: "Strategies for Participation",
        content: [
          "When students are involved in assessment, they develop stronger critical thinking skills, reflect on their own learning progress, better understand evaluation criteria, and become more motivated to improve.",
          "Teachers can increase participation in assessment by using strategies such as self-assessment, peer assessment, and reflection activities.",
        ],
      },
    ],
    keyTakeaways: [
      "Assessment is more effective when students participate actively.",
      "Reflection and peer review support deeper learning.",
      "Engagement turns assessment into a learning opportunity.",
    ],
  },
  {
    _id: assessmentFeedbackLesson2Id,
    courseId: assessmentFeedbackCourseId,
    skillId: explanationClaritySkillId,
    order: 2,
    title: "Giving Clear Explanations in Feedback",
    lessonDescription:
      "This lesson focuses on how instructors can provide clear, constructive, and meaningful feedback.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how instructors can provide clear, constructive, and meaningful feedback.",
          "Clear explanations help students understand their performance and guide them toward improvement.",
        ],
      },
      {
        heading: "What Clear Feedback Looks Like",
        content: [
          "Without clear feedback, students may know their result, but not understand how to improve.",
          "Effective feedback should answer three key questions: what was done well, what needs improvement, and how the student can improve it.",
        ],
      },
      {
        heading: "Best Practices",
        content: [
          "Instead of vague comments, feedback should provide specific guidance.",
          "Instructors should avoid overly general comments, excessive criticism without guidance, and feedback that focuses only on mistakes.",
          "Effective instructors focus on specific aspects of the work, balance positive feedback and improvement suggestions, use simple and precise language, and provide examples when possible.",
        ],
      },
    ],
    keyTakeaways: [
      "Clear feedback explains both performance and next steps.",
      "Specific guidance is more useful than vague comments.",
      "Balanced and precise language improves feedback quality.",
    ],
  },
  {
    _id: assessmentFeedbackLesson3Id,
    courseId: assessmentFeedbackCourseId,
    skillId: pacingSkillId,
    order: 3,
    title: "Managing the Timing of Feedback",
    lessonDescription:
      "This lesson examines the role of timing in feedback delivery.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson examines the role of timing in feedback delivery.",
          "Feedback is most effective when it is delivered at the right moment in the learning process.",
        ],
      },
      {
        heading: "Why Timing Matters",
        content: [
          "When feedback is delayed too long, students may lose the connection between their actions and the feedback they receive.",
          "Timely feedback helps students remember their reasoning during a task, identify mistakes while the material is still fresh, and apply corrections in future activities.",
        ],
      },
      {
        heading: "Immediate and Delayed Feedback",
        content: [
          "Immediate feedback is given during an activity or shortly after completion and helps prevent misunderstandings from spreading while reinforcing correct thinking.",
          "Delayed feedback is provided after students have completed a task and had time to reflect, which allows for more detailed analysis and deeper reflection.",
          "Professional instructors often combine both approaches: immediate feedback for skill practice and delayed feedback for complex assignments.",
        ],
      },
    ],
    keyTakeaways: [
      "Timing affects how useful feedback is.",
      "Immediate feedback supports real-time correction.",
      "Delayed feedback supports deeper reflection and analysis.",
    ],
  },
  {
    _id: assessmentFeedbackLesson4Id,
    courseId: assessmentFeedbackCourseId,
    skillId: lessonStructureSkillId,
    order: 4,
    title: "Structuring Assessments and Feedback",
    lessonDescription:
      "This lesson explores how clear structure in assessments and feedback improves student understanding and fairness.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson explores how clear structure in assessments and feedback improves student understanding and fairness in evaluation.",
          "When assessments are organized and transparent, students know what is expected and how their work will be evaluated.",
        ],
      },
      {
        heading: "Elements of Well-Structured Assessment",
        content: [
          "Effective assessments typically include clear learning objectives, transparent evaluation criteria, and structured feedback processes.",
          "These elements help create predictable and fair evaluation environments.",
        ],
      },
      {
        heading: "The Role of Rubrics",
        content: [
          "Rubrics are commonly used tools that define levels of performance for specific criteria such as clarity of explanation, use of supporting evidence, and organization of ideas.",
          "Rubrics help students understand what high-quality work looks like and how their performance will be measured.",
          "Structured assessments make learning goals visible and achievable.",
        ],
      },
    ],
    keyTakeaways: [
      "Structure improves transparency and fairness.",
      "Rubrics clarify expectations and performance standards.",
      "Well-structured feedback helps students apply improvement strategies.",
    ],
  },
  {
    _id: assessmentFeedbackLesson5Id,
    courseId: assessmentFeedbackCourseId,
    skillId: assessmentSkillId,
    order: 5,
    title: "Using Assessment to Improve Learning",
    lessonDescription:
      "This lesson focuses on how assessment can support continuous learning improvement rather than simply measuring performance.",
    sections: [
      {
        heading: "Lesson Description",
        content: [
          "This lesson focuses on how assessment can support continuous learning improvement rather than simply measuring performance.",
          "In professional education environments, assessment is used to guide both student learning and instructional decisions.",
        ],
      },
      {
        heading: "Assessment as a Learning Tool",
        content: [
          "Effective instructors analyze assessment results to understand how students are learning.",
          "Assessment data can help teachers identify common misunderstandings, adjust teaching strategies, and provide targeted feedback.",
          "In this way, assessment becomes a diagnostic tool for learning.",
        ],
      },
      {
        heading: "Formative and Summative Assessment",
        content: [
          "Formative assessment occurs during the learning process and includes quizzes, discussions, and draft submissions to monitor progress and guide improvement.",
          "Summative assessment occurs at the end of a learning unit and includes final exams, final projects, and certification tests to evaluate overall achievement.",
          "Effective assessment and feedback create a continuous cycle in which students complete a task, teachers evaluate performance, feedback identifies strengths and improvements, and students apply feedback in future work.",
        ],
      },
    ],
    keyTakeaways: [
      "Assessment should guide learning, not only measure it.",
      "Assessment results can improve instruction.",
      "Formative and summative assessment serve different but complementary purposes.",
    ],
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