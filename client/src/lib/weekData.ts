import type { Week } from "@shared/schema";

export const weeksData: Week[] = [
  {
    id: "week1",
    number: 1,
    title: "Introduction",
    description: "Learn basic greetings and how to introduce yourself",
    topics: [
      {
        id: "w1t1",
        title: "Hello vs Hi",
        description: "Learn when to use formal and informal greetings",
        messages: [
          { id: "m1", speaker: "Amit", text: "Hello, good morning!", isUser: false },
          { id: "m2", speaker: "Priya", text: "Good morning, Amit! How are you?", isUser: false },
          { id: "m3", speaker: "Amit", text: "I am fine, thank you. And you?", isUser: false },
          { id: "m4", speaker: "Priya", text: "I am good too!", isUser: false },
          { id: "m5", speaker: "Amit", text: "Hi Priya! This is my friend Rahul.", isUser: false },
          { id: "m6", speaker: "Priya", text: "Hi Rahul! Nice to meet you.", isUser: false },
          { id: "m7", speaker: "Rahul", text: "Nice to meet you too!", isUser: false },
        ],
      },
      {
        id: "w1t2",
        title: "Where are you from?",
        description: "Learn to talk about where you are from",
        messages: [
          { id: "m1", speaker: "Priya", text: "Hi! I am Priya. What is your name?", isUser: false },
          { id: "m2", speaker: "You", text: "Hello! My name is...", isUser: true },
          { id: "m3", speaker: "Priya", text: "Nice to meet you! Where are you from?", isUser: false },
          { id: "m4", speaker: "You", text: "I am from India.", isUser: true },
          { id: "m5", speaker: "Priya", text: "Which city are you from?", isUser: false },
          { id: "m6", speaker: "You", text: "I am from Kolkata.", isUser: true },
          { id: "m7", speaker: "Priya", text: "Oh nice! Kolkata is a beautiful city.", isUser: false },
        ],
      },
    ],
    practices: [
      {
        id: "w1p1",
        title: "Introduce Yourself",
        targetPhrases: [
          "My name is Amit",
          "I am from India",
          "Nice to meet you",
          "Good morning",
          "How are you",
        ],
      },
      {
        id: "w1p2",
        title: "Greetings Practice",
        targetPhrases: [
          "Hello, good morning",
          "I am fine, thank you",
          "Nice to meet you too",
          "Good afternoon",
          "Good evening",
        ],
      },
    ],
    grammar: [
      {
        id: "w1g1",
        title: "Am / Is / Are",
        explanation: "We use 'am' with I, 'is' with he/she/it, and 'are' with you/we/they.",
        examples: [
          "I am a student.",
          "He is my friend.",
          "She is from Delhi.",
          "We are happy.",
          "They are teachers.",
          "You are kind.",
        ],
      },
    ],
    quizzes: [
      {
        id: "w1q1",
        question: "Complete: I ___ from India.",
        options: ["am", "is", "are"],
        correctAnswer: 0,
      },
      {
        id: "w1q2",
        question: "Complete: She ___ my sister.",
        options: ["am", "is", "are"],
        correctAnswer: 1,
      },
      {
        id: "w1q3",
        question: "Complete: They ___ students.",
        options: ["am", "is", "are"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "week2",
    number: 2,
    title: "My World",
    description: "Talk about your family and things around you",
    topics: [
      {
        id: "w2t1",
        title: "My Family",
        description: "Learn to talk about your family members",
        messages: [
          { id: "m1", speaker: "Amit", text: "This is my family photo.", isUser: false },
          { id: "m2", speaker: "Priya", text: "Who is this?", isUser: false },
          { id: "m3", speaker: "Amit", text: "This is my father. His name is Ramesh.", isUser: false },
          { id: "m4", speaker: "Priya", text: "And who is this?", isUser: false },
          { id: "m5", speaker: "Amit", text: "This is my mother. Her name is Sunita.", isUser: false },
          { id: "m6", speaker: "Priya", text: "Is this your brother?", isUser: false },
          { id: "m7", speaker: "Amit", text: "Yes, this is my brother Rohit. He is 10 years old.", isUser: false },
        ],
      },
      {
        id: "w2t2",
        title: "This and That",
        description: "Learn to describe things around you",
        messages: [
          { id: "m1", speaker: "Priya", text: "What is this?", isUser: false },
          { id: "m2", speaker: "You", text: "This is my phone.", isUser: true },
          { id: "m3", speaker: "Priya", text: "And what is that?", isUser: false },
          { id: "m4", speaker: "You", text: "That is my bag.", isUser: true },
          { id: "m5", speaker: "Priya", text: "Is this your book?", isUser: false },
          { id: "m6", speaker: "You", text: "Yes, this is my book.", isUser: true },
          { id: "m7", speaker: "Priya", text: "These are nice things!", isUser: false },
        ],
      },
    ],
    practices: [
      {
        id: "w2p1",
        title: "Family Members",
        targetPhrases: [
          "This is my father",
          "This is my mother",
          "He is my brother",
          "She is my sister",
          "They are my parents",
        ],
      },
      {
        id: "w2p2",
        title: "Things Around Me",
        targetPhrases: [
          "This is my phone",
          "That is my bag",
          "This is my book",
          "That is my pen",
          "These are my things",
        ],
      },
    ],
    grammar: [
      {
        id: "w2g1",
        title: "This / That / These / Those",
        explanation: "Use 'this' for singular things near you, 'that' for singular things far away, 'these' for plural near, and 'those' for plural far.",
        examples: [
          "This is my pen. (near, singular)",
          "That is your chair. (far, singular)",
          "These are my books. (near, plural)",
          "Those are their bags. (far, plural)",
        ],
      },
    ],
    quizzes: [
      {
        id: "w2q1",
        question: "Complete: ___ is my phone. (near)",
        options: ["This", "That", "These"],
        correctAnswer: 0,
      },
      {
        id: "w2q2",
        question: "Complete: ___ are my books. (near, plural)",
        options: ["This", "That", "These"],
        correctAnswer: 2,
      },
      {
        id: "w2q3",
        question: "Complete: ___ is my father.",
        options: ["This", "These", "Those"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "week3",
    number: 3,
    title: "Daily Routine",
    description: "Learn to talk about your daily activities",
    topics: [
      {
        id: "w3t1",
        title: "Morning Routine",
        description: "Learn to describe your morning activities",
        messages: [
          { id: "m1", speaker: "Amit", text: "What time do you wake up?", isUser: false },
          { id: "m2", speaker: "You", text: "I wake up at 6 o'clock.", isUser: true },
          { id: "m3", speaker: "Amit", text: "What do you do first?", isUser: false },
          { id: "m4", speaker: "You", text: "First, I brush my teeth.", isUser: true },
          { id: "m5", speaker: "Amit", text: "Do you drink tea in the morning?", isUser: false },
          { id: "m6", speaker: "You", text: "Yes, I drink tea every morning.", isUser: true },
          { id: "m7", speaker: "Amit", text: "Me too! I love chai.", isUser: false },
        ],
      },
      {
        id: "w3t2",
        title: "Going to Work/School",
        description: "Learn to talk about your commute",
        messages: [
          { id: "m1", speaker: "Priya", text: "How do you go to work?", isUser: false },
          { id: "m2", speaker: "You", text: "I go by bus.", isUser: true },
          { id: "m3", speaker: "Priya", text: "What time do you leave home?", isUser: false },
          { id: "m4", speaker: "You", text: "I leave home at 8 o'clock.", isUser: true },
          { id: "m5", speaker: "Priya", text: "How long does it take?", isUser: false },
          { id: "m6", speaker: "You", text: "It takes about 30 minutes.", isUser: true },
          { id: "m7", speaker: "Priya", text: "That's not too far!", isUser: false },
        ],
      },
    ],
    practices: [
      {
        id: "w3p1",
        title: "Morning Activities",
        targetPhrases: [
          "I wake up at 6 o'clock",
          "I brush my teeth",
          "I take a bath",
          "I drink tea",
          "I eat breakfast",
        ],
      },
      {
        id: "w3p2",
        title: "Commute Practice",
        targetPhrases: [
          "I go by bus",
          "I go by train",
          "I walk to school",
          "It takes 30 minutes",
          "I leave home at 8",
        ],
      },
    ],
    grammar: [
      {
        id: "w3g1",
        title: "Present Simple: S/ES Rules",
        explanation: "For he/she/it, add 's' or 'es' to the verb. Add 'es' after verbs ending in s, sh, ch, x, o.",
        examples: [
          "I go → He goes",
          "I watch → She watches",
          "I brush → He brushes",
          "I do → She does",
          "I play → He plays",
          "I eat → She eats",
        ],
      },
    ],
    quizzes: [
      {
        id: "w3q1",
        question: "Complete: She ___ to school. (go)",
        options: ["go", "goes", "going"],
        correctAnswer: 1,
      },
      {
        id: "w3q2",
        question: "Complete: He ___ TV every day. (watch)",
        options: ["watch", "watches", "watching"],
        correctAnswer: 1,
      },
      {
        id: "w3q3",
        question: "Complete: I ___ tea in the morning.",
        options: ["drink", "drinks", "drinking"],
        correctAnswer: 0,
      },
    ],
  },
];
