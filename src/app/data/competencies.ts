export type Grade = 'C1' | 'C2' | 'C3' | 'C4';
export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Competency {
  id: string;
  name: string;
  description: string;
}

export interface CompetencyGroup {
  id: string;
  name: string;
  summary: string;
  components: Competency[];
}

export interface Role {
  id: string;
  title: string;
  grade: Grade;
  discipline: string;
  description: string;
  isUR?: boolean;
  disciplineCompetencies: Competency[];
  competencyGroups?: CompetencyGroup[];
}

export interface ProficiencyOption {
  value: ProficiencyLevel;
  label: string;
  description: string;
  dotClass: string;
  cellActiveClass: string;
  cellHoverClass: string;
  headerClass: string;
}

export const PROFICIENCY_OPTIONS: ProficiencyOption[] = [
  {
    value: 1,
    label: 'Beginner',
    description: 'Limited experience, requires guidance.',
    dotClass: 'bg-[#1DB8F2]',
    cellActiveClass: 'bg-[#1DB8F2]/10 ring-2 ring-[#1DB8F2]',
    cellHoverClass: 'hover:bg-[#1DB8F2]/5',
    headerClass: 'text-[#1DB8F2] bg-[#1DB8F2]/5 border-[#1DB8F2]/20',
  },
  {
    value: 2,
    label: 'Building',
    description: 'Some experience, can perform with support.',
    dotClass: 'bg-[#00D5D0]',
    cellActiveClass: 'bg-[#00D5D0]/10 ring-2 ring-[#00D5D0]',
    cellHoverClass: 'hover:bg-[#00D5D0]/5',
    headerClass: 'text-[#00D5D0] bg-[#00D5D0]/5 border-[#00D5D0]/20',
  },
  {
    value: 3,
    label: 'Proficient',
    description: 'Regularly performs independently.',
    dotClass: 'bg-[#FEB100]',
    cellActiveClass: 'bg-[#FEB100]/10 ring-2 ring-[#FEB100]',
    cellHoverClass: 'hover:bg-[#FEB100]/5',
    headerClass: 'text-[#FEB100] bg-[#FEB100]/5 border-[#FEB100]/20',
  },
  {
    value: 4,
    label: 'Expert',
    description: 'Strong capability, can mentor others.',
    dotClass: 'bg-[#FF816E]',
    cellActiveClass: 'bg-[#FF816E]/10 ring-2 ring-[#FF816E]',
    cellHoverClass: 'hover:bg-[#FF816E]/5',
    headerClass: 'text-[#FF816E] bg-[#FF816E]/5 border-[#FF816E]/20',
  },
  {
    value: 5,
    label: 'Mastery',
    description: 'Recognised expert, drives strategy and innovation.',
    dotClass: 'bg-[#71609E]',
    cellActiveClass: 'bg-[#71609E]/10 ring-2 ring-[#71609E]',
    cellHoverClass: 'hover:bg-[#71609E]/5',
    headerClass: 'text-[#71609E] bg-[#71609E]/5 border-[#71609E]/20',
  },
];

export const CORE_COMPETENCIES: Record<Grade, Competency[]> = {
  C1: [], // User Research uses competencyGroups instead of shared core UCD competencies
  C2: [
    {
      id: 'c2-accessibility',
      name: 'Accessibility',
      description:
        'Apply basic accessibility guidelines in research activities.',
    },
    {
      id: 'c2-agile',
      name: 'Agile ways of working',
      description:
        'Understands how to work in the context of design sprints and other agile frameworks; pushes to support regular feedback sessions between UCD and stakeholders.',
    },
    {
      id: 'c2-collaboration',
      name: 'Collaboration',
      description:
        'Collaborate with designers, PMs, and developers to support research delivery.',
    },
    {
      id: 'c2-facilitation',
      name: 'Facilitation',
      description:
        'Foster inclusive collaboration by guiding teams, users, and stakeholders through co-creation, ideation, and design activities. Manage engagement to support shared understanding and meaningful contribution.',
    },
    {
      id: 'c2-research',
      name: 'Research-backed design',
      description:
        'Familiar with the research-to-design dynamic, knows how to work between usability testing and qualitative user research sessions to show how designs can be iterated on. Can support User Researchers with setup and analysis.',
    },
    {
      id: 'c2-stakeholder',
      name: 'Stakeholder engagement',
      description:
        'Build relationships and connect teams by understanding and adjust to different stakeholder needs and perspectives. Communicate insights clearly to support informed decision-making.',
    },
    {
      id: 'c2-user-centricity',
      name: 'User-centricity advocacy',
      description:
        "Ensure that all designs and decisions prioritise the user's perspective and emphasise the importance of inclusivity and accessibility.",
    },
    {
      id: 'c2-ai',
      name: 'AI-Assisted Design & Research Foundation',
      description:
        'Use AI tools to support research and design activities by generating early ideas, spotting patterns, or summarising information. Ensure outputs are reviewed with human judgement and applied responsibly to improve the quality and pace of delivery.',
    },
  ],
  C3: [
    {
      id: 'c3-accessibility',
      name: 'Accessibility',
      description:
        'Ensure inclusive research, ensuring representation of diverse users. Encouraging the product team to adhere to WCAG 2.2 (through collaboration with the UCD team).',
    },
    {
      id: 'c3-cross-disciplinary',
      name: 'Cross-disciplinary awareness',
      description:
        'Demonstrates a strong working knowledge of adjacent UCD disciplines (e.g., Interaction Design, Content Design, User Research) and actively fosters collaboration across them.',
    },
    {
      id: 'c3-gov-standards',
      name: 'GOV Service Standards',
      description:
        'Can sell Government Digital Standards (GDS) and advocate to meet assessment requirements at each stage, factoring in accessibility, inclusivity and other requirements.',
    },
    {
      id: 'c3-leading',
      name: 'Leading design',
      description:
        'Lead and coordinate design work in the team, especially with other UCD members and support others. Advise others how to effectively plan and run design sessions with a team, users or stakeholders.',
    },
    {
      id: 'c3-research',
      name: 'Research-backed design',
      description:
        'Champions a solid research-to-design dynamic, ensuring appropriate user research activities are conducted alongside a User Researcher and can take initiative to conduct research in the absence of a User Researcher.',
    },
    {
      id: 'c3-stakeholder',
      name: 'Stakeholder engagement',
      description:
        'Lead stakeholder engagement strategy within projects or specific service areas. Build trust. Translate strategic direction into actionable engagement plan.',
    },
    {
      id: 'c3-user-centricity',
      name: 'User-centricity advocacy',
      description:
        "Ensure that all designs and decisions prioritise the user's perspective and emphasise the importance of inclusivity and accessibility.",
    },
    {
      id: 'c3-ai',
      name: 'AI-enabled Design leadership & responsible integration',
      description:
        'Actively integrate AI tools, methods, and insights into UCD processes. Guide teams to apply AI responsibly and strategically, improving quality, efficiency, and innovation in design outcomes.',
    },
  ],
  C4: [
    {
      id: 'c4-growth',
      name: 'Growth',
      description:
        'Actively identify and create new opportunities to grow design authority and headcount within project teams and accounts, providing strategic input next to adjacent leadership.',
    },
    {
      id: 'c4-gov-standards',
      name: 'GOV Service Standards',
      description:
        'Can sell Government Digital Standards (GDS) and advocate to meet assessment requirements at each stage, factoring in accessibility, inclusivity and other requirements.',
    },
    {
      id: 'c4-leading-cross-team',
      name: 'Leading cross-team design',
      description:
        'Lead the creation of service strategies across multiple products, journeys, or business areas, ensuring alignment with enterprise goals. Ensure different UCD squads are aligned with broader program objectives and facilitate cross collaboration.',
    },
    {
      id: 'c4-mentorship',
      name: 'Mentorship and support',
      description:
        'Offer continuous support and mentorship to team members, fostering a collaborative and innovative work environment. Provide design QA, critique, and feedback loops during delivery cycles.',
    },
    {
      id: 'c4-project-mgmt',
      name: 'Project management',
      description:
        'Ensure timely delivery of projects within scope, develop and maintain detailed project plans and risk management strategies and coordinate cross-functional teams and resources to achieve project milestones.',
    },
    {
      id: 'c4-stakeholder',
      name: 'Stakeholder engagement',
      description:
        'Lead stakeholder engagement strategy across programs, portfolios, or even entire service areas. Build trust. Engages and influences executive level stakeholders. Shape organisational approaches to service design.',
    },
    {
      id: 'c4-ucd-approach',
      name: 'UCD Approach',
      description:
        'Has established and embedded user-centred ways of working (UCD WoW) with teams and can champion the implementation of UCD WoW to less mature teams.',
    },
    {
      id: 'c4-ai',
      name: 'AI strategy, governance & Design transformation leadership',
      description:
        'Shape AI direction within programmes, accounts and/or projects. Ensure that AI is used ethically, strategically, and effectively to elevate UCD maturity and improve service outcomes across teams or portfolios.',
    },
  ],
};

export const ROLES: Role[] = [
  // ── C2 ──────────────────────────────────────────────────────────────────
  {
    id: 'sd-c2',
    title: 'Service Designer',
    grade: 'C2',
    discipline: 'Service Design',
    description:
      'As a C2 Service Designer at Capgemini Invent, you play a pivotal role in transforming digital services for our clients by leveraging user-centred design (UCD) principles and design thinking methodologies. You show an awareness of the value of evidence-based design, and that design is a process. You work across a service design process, autonomously with minimal support, and collaborate effectively within cross-functional teams.',
    disciplineCompetencies: [
      {
        id: 'sd-c2-holistic',
        name: 'Holistic thinking',
        description:
          'Look at service considering the whole ecosystem, the entire user journey, all touchpoints and relevant actors involved, including frontstage and backstage processes, to create a seamless and integrated experience.',
      },
      {
        id: 'sd-c2-insights',
        name: 'Insights analysis',
        description:
          'Perform qualitative and quantitative analysis of insights with collaborators and produce takeaways.',
      },
      {
        id: 'sd-c2-reporting',
        name: 'Reporting',
        description: 'Write clear, concise research summaries and reports.',
      },
      {
        id: 'sd-c2-prototyping',
        name: 'Prototyping',
        description:
          'Independently prototype complex ideas at an appropriate fidelity using Mural, Figma (or similar).',
      },
      {
        id: 'sd-c2-evidencing',
        name: 'Evidencing',
        description:
          'Can use appropriate tools like journey maps, service blueprints, user personas and prototypes to communicate ideas and concepts clearly and support decision making (internally and externally).',
      },
    ],
  },
  {
    id: 'ixd-c2',
    title: 'Interaction Designer',
    grade: 'C2',
    discipline: 'Interaction Design',
    description:
      'As a C2 Interaction Designer at Capgemini Invent, you can develop evidence-based designs that align with both user needs and organisational objectives. You contribute to the design of intuitive and accessible digital services that meet government service standards. You are trusted to make informed design decisions, recognise when to seek further guidance, and contribute to the development of design concepts.',
    disciplineCompetencies: [
      {
        id: 'ixd-c2-gov-standards',
        name: 'GOV service standards',
        description:
          'Knows what the Government Digital Standards (GDS) are and what is expected at the various stages of a service and how that may affect design outputs.',
      },
      {
        id: 'ixd-c2-gov-prototyping',
        name: 'GOV prototyping',
        description:
          'Familiar with Gov.uk design system components and other design pattern libraries and is proficient in using the Gov.uk prototyping kit with some support to create testable design outputs. Can use other design tools.',
      },
      {
        id: 'ixd-c2-business',
        name: 'Business acumen',
        description:
          'Can see where opportunities to improve the interaction design experience exist that add more value.',
      },
      {
        id: 'ixd-c2-technical',
        name: 'Technical acumen',
        description:
          "Is comfortable working with basic code or calling on the help of engineers; collaborate with the team to create detailed user stories that aid in building the intended design solution with more accuracy and confidence.",
      },
      {
        id: 'ixd-c2-visual',
        name: 'Visual design and branding',
        description:
          "Can produce attractive and functional visual layouts, with ability to understand a brand's visual identity and incorporate it into designs.",
      },
    ],
  },
  {
    id: 'cd-c2',
    title: 'Content Designer',
    grade: 'C2',
    discipline: 'Content Design',
    description:
      'As a C2 Content Designer at Capgemini Invent, you can develop evidence-based content that aligns with both user needs and organisational objectives. You contribute to the design of intuitive and accessible digital services that meet government service standards. You are trusted to make informed design decisions, recognise when to seek further guidance, and contribute to the development of design concepts.',
    disciplineCompetencies: [
      {
        id: 'cd-c2-gov-standards',
        name: 'GOV service standards',
        description:
          'Knows what the Government Digital Standards (GDS) are and what is expected at the various stages of a service and how that may affect content outputs.',
      },
      {
        id: 'cd-c2-content-prototyping',
        name: 'Content concepts and prototyping',
        description:
          'Familiar with Gov.uk design system components and other design pattern libraries and is proficient in using prototypes to visualise content in context.',
      },
      {
        id: 'cd-c2-content-strategy',
        name: 'Content strategy',
        description:
          'Contribute to content strategy and create content patterns or standards.',
      },
      {
        id: 'cd-c2-user-content',
        name: 'User-centred content design',
        description:
          'Translate user stories into content in the right format to meet needs. Use data, research and evidence to turn user insights into outcomes. Understand accessibility requirements and design content that works with assistive technologies. Translate complex information into plain English.',
      },
    ],
  },

  // ── C3 ──────────────────────────────────────────────────────────────────
  {
    id: 'ss-strategist-c3',
    title: 'Senior Service Design Strategist',
    grade: 'C3',
    discipline: 'Service Design',
    description:
      'As a C3 Service Design Strategist at Capgemini Invent, you will be supporting our client in identifying market opportunities and customer needs to inform service design, balancing user needs with business objectives and ethical aspects. You are expected to lead cross-functional teams to ensure cohesive service delivery. You are most likely to operate on the first diamond (Discover and Define).',
    disciplineCompetencies: [
      {
        id: 'ss-c3-prototyping',
        name: 'Prototyping',
        description:
          'Independently prototype complex ideas at an appropriate fidelity using Mural, Figma (or similar).',
      },
      {
        id: 'ss-c3-strategic-tools',
        name: 'Strategic tools and frameworks',
        description:
          'Can suggest and use best strategic design tools such as ecosystem maps, opportunity frameworks, service maturity models, and business model canvas.',
      },
      {
        id: 'ss-c3-strategic-planning',
        name: 'Strategic planning and development',
        description:
          'Work with team to translate insights into long-term service strategies and roadmaps that align with business objectives. Balance user needs with organisational goals to create impactful solutions that encompass broader design and business strategy.',
      },
      {
        id: 'ss-c3-evidencing',
        name: 'Evidencing',
        description:
          'Can suggest and use best visual tools like diagrams, maps, and prototypes to communicate ideas and concepts clearly and support decision making (internally and externally).',
      },
      {
        id: 'ss-c3-business',
        name: 'Business acumen',
        description:
          'Makes strategic decisions that balance user needs and feasibility with business objectives. Collaborate on business cases for new service concepts/ideas.',
      },
      {
        id: 'ss-c3-strategic-thinking',
        name: 'Strategic thinking',
        description:
          'Evaluate and advocate for design initiatives based on potential ROI, value creation and cost-effectiveness. Define UX metrics that align with business KPIs to evaluate strategic impact.',
      },
      {
        id: 'ss-c3-innovation',
        name: 'Innovation thinking',
        description:
          'Drive innovative thinking and explore novel design approaches and methodologies (Lean, HDD, etc.) with the team and stakeholders.',
      },
      {
        id: 'ss-c3-holistic',
        name: 'Holistic thinking',
        description:
          'Look at service considering the whole ecosystem, the entire user journey, all touchpoints and relevant actors, including frontstage and backstage processes, to create a seamless and integrated experience.',
      },
      {
        id: 'ss-c3-facilitation',
        name: 'Facilitation',
        description:
          'Conduct co-creation workshops with stakeholders and users, design sprints, ideation sessions, or similar activities. Actively keep participants involved and engaged.',
      },
      {
        id: 'ss-c3-technology',
        name: 'Technology stack',
        description:
          'Understand and assess technology stacks (e.g., SAP, Salesforce, Oracle) to shape service strategies that align with organisational goals and system capabilities. Identify opportunities for innovation within technical constraints.',
      },
    ],
  },
  {
    id: 'si-c3',
    title: 'Senior Service Implementation Designer',
    grade: 'C3',
    discipline: 'Service Design',
    description:
      'As a C3 Senior Service Implementation Designer at Capgemini Invent, you will be translating high-level service strategies into executable implementation plans and robust solutions. You are expected to lead cross-functional teams, ensuring alignment between business, technical, and design teams.',
    disciplineCompetencies: [
      {
        id: 'si-c3-cross-functional',
        name: 'Cross-functional collaboration',
        description:
          'Work closely with developers, business analysts, and delivery managers to ensure the feasibility of service components. Ensure alignment between business, technical, and design teams.',
      },
      {
        id: 'si-c3-prototyping',
        name: 'Prototyping',
        description:
          'Independently prototype complex ideas using Mural, Figma (or similar) at a fidelity suitable for testing and development handoff.',
      },
      {
        id: 'si-c3-implementation',
        name: 'Implementation Planning',
        description:
          'Translate strategic goals into executable implementation plans. Develop detailed workflows, service scripts, support materials, and operational handbooks. Define and monitor KPIs to assess service effectiveness post-launch.',
      },
      {
        id: 'si-c3-performance',
        name: 'Performance monitoring',
        description:
          'Define, track, and report on key performance indicators (KPIs) tied to user satisfaction, operational efficiency, and business impact. Ensure data analytics tools are used to inform service refinements.',
      },
      {
        id: 'si-c3-evidence',
        name: 'Evidence and communication',
        description:
          'Use journey maps, service blueprints, operational flows, and to clearly communicate design intent to designers, BAs, development and QA teams.',
      },
      {
        id: 'si-c3-technology',
        name: 'Technology stack',
        description:
          'Apply knowledge of technology stacks (e.g., SAP, Salesforce, Oracle) to translate service designs into feasible solutions. Collaborate with delivery teams to ensure integration, scalability, and alignment with existing systems.',
      },
      {
        id: 'si-c3-design-ops',
        name: 'Design Ops & governance',
        description:
          'Support implementation through design ops practices (e.g., managing design systems, documenting processes, and QA). Contribute to governance and change management to embed new services into operations.',
      },
      {
        id: 'si-c3-change',
        name: 'Change enablement & adoption',
        description:
          'Support teams through change, ensuring that new services are understood, adopted, and deliver value to users. Facilitate onboarding, training, and feedback loops post-launch.',
      },
      {
        id: 'si-c3-holistic',
        name: 'Holistic thinking',
        description:
          'Look at service considering the whole ecosystem, the entire user journey, all touchpoints and relevant actors, including frontstage and backstage processes, to create a seamless and integrated experience.',
      },
    ],
  },
  {
    id: 'ixd-c3',
    title: 'Senior Interaction Designer',
    grade: 'C3',
    discipline: 'Interaction Design',
    description:
      'As a C3 Senior Interaction Designer at Capgemini Invent, you are an experienced designer who works with minimal support and plays a key role in shaping digital services. You collaborate with service managers, programme directors, and multidisciplinary teams to develop user-centred, accessible, and scalable design solutions. You influence design strategy, mentor junior designers, and help teams embed best practices.',
    disciplineCompetencies: [
      {
        id: 'ixd-c3-gov-prototyping',
        name: 'GOV prototyping',
        description:
          'Comfortable with the Gov.uk design system, familiar with design pattern libraries and trends in government design. Pushes to improve the evolution of new design patterns, contributing to the gov design system. Can work with other design tools with proficiency.',
      },
      {
        id: 'ixd-c3-technical',
        name: 'Technical acumen',
        description:
          "Is comfortable working with basic code or calling on the help of engineers; collaborate with developers to refine feature build stories and epics that aid in building the intended design solution with more accuracy and confidence.",
      },
      {
        id: 'ixd-c3-mentorship',
        name: 'Mentorship and Leadership',
        description:
          'Mentors interaction designers and autonomously develops design plans that drive momentum in interaction design outputs both in and out of projects.',
      },
      {
        id: 'ixd-c3-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Demonstrates a strong working knowledge of adjacent UCD disciplines (e.g., Service Design, Content Design, User Research) and actively fosters collaboration across them.',
      },
      {
        id: 'ixd-c3-visual',
        name: 'Visual design and branding',
        description:
          'Can direct others to consistently apply brand identity into designs across mobile, web and content with mastery of software like Figma and Adobe XD.',
      },
    ],
  },
  {
    id: 'cd-c3',
    title: 'Senior Content Designer',
    grade: 'C3',
    discipline: 'Content Design',
    description:
      'As a C3 Senior Content Designer at Capgemini Invent, you are an experienced designer who works with minimal support and plays a key role in shaping digital services. You influence content design strategy, mentor junior designers, and help teams embed best practices in content design. You are responsible for complex services, making critical design decisions informed by research.',
    disciplineCompetencies: [
      {
        id: 'cd-c3-gov-prototyping',
        name: 'GOV prototyping',
        description:
          "Comfortable with the Gov.uk design system, familiar with design pattern libraries and trends in government design. Pushes to improve the evolution of new content patterns, contributing to the gov design system. Can build content prototypes.",
      },
      {
        id: 'cd-c3-content-strategy',
        name: 'Content strategy',
        description:
          'Lead and direct strategic content improvement projects, focusing effort in the areas of greatest priority and ensuring goals and objectives are met. Help lead the design and implementation of strategies, evaluating their impact and progress.',
      },
      {
        id: 'cd-c3-user-content',
        name: 'User-centred content design',
        description:
          'Put accessibility requirements at the heart of approaches to designing content, and encourage others to do the same. Guide others and make recommendations on the best tools and methods to use. Show a deep understanding of end-to-end journeys and how content is affected within these journeys.',
      },
      {
        id: 'cd-c3-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Demonstrates a strong working knowledge of adjacent UCD disciplines (e.g., Service Design, Content Design, User Research) and actively fosters collaboration across them.',
      },
      {
        id: 'cd-c3-mentorship',
        name: 'Mentorship and leadership',
        description:
          'Take responsibility for assuring the quality of content from more junior colleagues, and coaching and guiding them to improve. Encourage a continuous improvement mindset in teams and more junior content colleagues.',
      },
    ],
  },

  // ── C4 ──────────────────────────────────────────────────────────────────
  {
    id: 'ss-strategist-c4',
    title: 'Lead Service Design Strategist',
    grade: 'C4',
    discipline: 'Service Design',
    description:
      'As a C4 Service Design Strategist at Capgemini Invent, you will be guiding the design team, defining strategies, and ensuring the successful delivery of service design projects. Applying a holistic view, you will ensure the alignment of service design initiatives with business goals and customer needs, and advocate for service design at different organisational levels.',
    disciplineCompetencies: [
      {
        id: 'ss-c4-visioning',
        name: 'Visioning',
        description:
          'Support the client in identifying and support in strategic opportunities involving vision and mission at program level. Apply methods like horizon scanning, speculative design, or systems mapping to anticipate and respond to emerging user and market needs.',
      },
      {
        id: 'ss-c4-governance',
        name: 'Strategic governance',
        description:
          'Establish and maintain strategic design standards, frameworks, and rituals that guide consistent decision-making across teams. Including opportunities for shared infrastructure, reusable components, etc.',
      },
      {
        id: 'ss-c4-change',
        name: 'Change management',
        description:
          'Manage and address organisational change and ensuring smooth transitions during service redesigns. Addressing resistance and build stakeholder buy-in for new service initiatives.',
      },
      {
        id: 'ss-c4-business',
        name: 'Business and financial acumen',
        description:
          'Understand and evaluate the financial impact of service design initiatives including developing business cases and ROI analyses to support service design projects.',
      },
      {
        id: 'ss-c4-innovation',
        name: 'Innovation thinking',
        description:
          'Structure and lead innovation programs or service experiments to explore new models and validate strategic hypotheses.',
      },
      {
        id: 'ss-c4-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Possesses deep understanding of the full UCD landscape and leverages this to lead multi-disciplinary teams effectively and identify opportunities for growth.',
      },
    ],
  },
  {
    id: 'si-c4',
    title: 'Lead Service Implementation Designer',
    grade: 'C4',
    discipline: 'Service Design',
    description:
      'As a C4 Lead Service Implementation Designer, you will be at the forefront of transforming high-level service strategies into detailed, executable plans and robust solutions. Your role encompasses leading teams of designers, managing multiple squads, and ensuring cohesive and effective implementation of service designs.',
    disciplineCompetencies: [
      {
        id: 'si-c4-technology',
        name: 'Technology integration',
        description:
          'Lead alignment between service design and enterprise technology platforms like SAP, Salesforce, Oracle or bespoke stacks and orchestrate service adaptations accordingly.',
      },
      {
        id: 'si-c4-governance',
        name: 'Design-to-delivery governance',
        description:
          "Establish and enforce service quality standards, ensuring consistency across designers, developers, and third-parties. Create frameworks for design assurance, ensuring services are implemented with fidelity to user needs and design principles.",
      },
      {
        id: 'si-c4-performance',
        name: 'Performance management & iterations',
        description:
          'Define service KPIs and OKRs and ensure mechanisms are in place to capture data, analyse service effectiveness, and iterate post-launch. Coordinate post-implementation reviews.',
      },
      {
        id: 'si-c4-realisation',
        name: 'Service realisation',
        description:
          'Ensure that service blueprints are operationalised through user stories, technical specs, process flows, and support models. Maintain service architecture documents and artefacts throughout the delivery lifecycle.',
      },
      {
        id: 'si-c4-change',
        name: 'Change leadership',
        description:
          'Act as a champion for service transformation, aligning teams and stakeholders around vision and execution.',
      },
      {
        id: 'si-c4-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Possesses deep understanding of the full UCD landscape and leverages this to lead multi-disciplinary teams effectively and identify opportunities for growth.',
      },
    ],
  },
  {
    id: 'ixd-c4',
    title: 'Lead Interaction Designer',
    grade: 'C4',
    discipline: 'Interaction Design',
    description:
      'As a C4 Lead Interaction Designer at Capgemini Invent, you will own interaction design efforts and play a key role in account management and building teams with the right skill-sets. You direct design strategy and take accountability over other junior designers. You are accountable for complex services and own critical design decisions evidenced by research.',
    disciplineCompetencies: [
      {
        id: 'ixd-c4-research',
        name: 'Research-backed design',
        description:
          'Champions a solid research-to-design dynamic, ensuring appropriate user research activities are conducted alongside a User Researcher and can take initiative to conduct research in the absence of a User Researcher.',
      },
      {
        id: 'ixd-c4-gov-prototyping',
        name: 'GOV Prototyping',
        description:
          'Comfortable with the Gov.uk design system, familiar with design pattern libraries and trends in government design. Pushes for active contribution to the gov design system, and to improve ways of working with other design tools.',
      },
      {
        id: 'ixd-c4-business',
        name: 'Business acumen',
        description:
          'Actively creating new opportunities to grow interaction design authority and headcount within project teams and accounts, providing strategic input next to adjacent leadership.',
      },
      {
        id: 'ixd-c4-technical',
        name: 'Technical acumen',
        description:
          'Strong understanding of the degrees of technicalities required for certain interaction design outputs and can leverage UX engineers or tackle more technical builds with confidence themselves next to developers.',
      },
      {
        id: 'ixd-c4-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Possesses deep understanding of the full UCD landscape and leverages this to lead multi-disciplinary teams effectively and identify opportunities for growth.',
      },
      {
        id: 'ixd-c4-visual',
        name: 'Visual design and branding',
        description:
          'Takes responsibility for visual development of a brand, managing teams to develop design systems and components to ensure consistency across services and assets.',
      },
    ],
  },
  {
    id: 'cd-c4',
    title: 'Lead Content Designer',
    grade: 'C4',
    discipline: 'Content Design',
    description:
      'As a C4 Lead Content Designer at Capgemini Invent, you will own content design efforts and play a key role in account management and building teams with the right skill-sets. You direct content design strategy and take accountability over other content designers. You are accountable for complex services and own critical design decisions evidenced by research.',
    disciplineCompetencies: [
      {
        id: 'cd-c4-content-strategy',
        name: 'Content strategy',
        description:
          'Help lead the design and implementation of strategies, evaluating their impact and progress to ensure business objectives and the needs of users are being met. Lead and direct strategic content improvement projects.',
      },
      {
        id: 'cd-c4-user-content',
        name: 'User centred content design',
        description:
          "Give direction on which tools or methods are best for teams to use. Understand complex user journeys and can direct solutions to meet different needs. Bring insight and expertise in how user needs have changed over time. Demonstrate extensive experience in creating, iterating, managing and overseeing content across multiple channels.",
      },
      {
        id: 'cd-c4-content-mgmt',
        name: 'Content management',
        description:
          "Direct the approach to content life cycle management to ensure content is regularly reviewed and evaluated by teams. Oversee teams' work to ensure the right content is being produced. Be accountable for the production of high quality, user-focused content. Identify gaps in content design skills and capability, and help teams to grow and develop.",
      },
      {
        id: 'cd-c4-cross-disciplinary',
        name: 'Cross-disciplinary awareness',
        description:
          'Possesses deep understanding of the full UCD landscape and leverages this to lead multi-disciplinary teams effectively and identify opportunities for growth.',
      },
    ],
  },

  // ── User Research ─────────────────────────────────────────────────────────
  {
    id: 'ur-c1',
    title: 'User Researcher',
    grade: 'C1',
    discipline: 'User Research',
    description:
      'As a C1 User Researcher at Capgemini Invent, you contribute reliably to research programmes under the guidance of more senior researchers. You apply user research methods in familiar contexts, run sessions using agreed approaches, and support analysis and communication of findings. You work within established processes and actively develop your research practice across seven core competency areas.',
    isUR: true,
    disciplineCompetencies: [],
    competencyGroups: [
      {
        id: 'ur-c1-g1',
        name: 'Research Delivery (Methods & Sessions)',
        summary: 'Delivering user research activities to a good standard, using agreed approaches, and contributing reliably to a wider research programme.',
        components: [
          { id: 'ur-c1-g1-c1', name: 'Research method application', description: 'Applying qualitative and quantitative methods such as interviews, usability testing, or surveys in line with research goals. Able to explain why a method is being used and what kind of insight it is intended to produce (e.g. attitudinal vs behavioural, generative vs evaluative). Adjusting approach within sessions when needed.' },
          { id: 'ur-c1-g1-c2', name: 'Session moderation', description: 'Moderating interviews or usability tests independently using a provided discussion guide. Managing session flow, time, and transitions without intervention. Responding calmly and appropriately to unexpected issues during sessions.' },
          { id: 'ur-c1-g1-c3', name: 'Delivery standards & compliance', description: 'Applying consent, safeguarding, and recording processes consistently across sessions. Following agreed approaches to recruitment, data handling, and documentation without needing step-by-step instruction. Recognising when a situation falls outside agreed standards and flagging it.' },
          { id: 'ur-c1-g1-c4', name: 'Research logistics & preparation', description: 'Preparing research materials in advance and ensuring they are ready for use. Supporting scheduling and logistics for multiple sessions. Identifying practical delivery risks early and escalating appropriately.' },
          { id: 'ur-c1-g1-c5', name: 'Collaborative research delivery', description: 'Sharing clear and relevant observations with the research lead after sessions. Taking on responsibility for specific delivery tasks within a research programme. Incorporating feedback between sessions to improve delivery quality or consistency.' },
        ],
      },
      {
        id: 'ur-c1-g2',
        name: 'Analysis & Sense-Making',
        summary: 'Making sense of user research data, identifying meaningful patterns, and contributing to clear, evidence-based insights with guidance.',
        components: [
          { id: 'ur-c1-g2-c1', name: 'Data capture for analysis', description: 'Producing clear, structured notes from interviews or usability tests that reflect what participants said and did. Recording observations accurately and consistently. Distinguishing between participant behaviour, opinion, and researcher interpretation.' },
          { id: 'ur-c1-g2-c2', name: 'Collaborative analysis participation', description: 'Taking part in collaborative analysis sessions such as tagging notes, grouping observations, and affinity mapping. Identifying repeated issues, behaviours, or needs across sessions. Sense-checking understanding with others when patterns are unclear.' },
          { id: 'ur-c1-g2-c3', name: 'Developing insights with support', description: 'Suggesting possible themes or problem statements based on patterns in the data. Articulating why a finding matters to users or the service, not just what was observed. Testing early interpretations with more senior researchers to validate or refine them.' },
          { id: 'ur-c1-g2-c4', name: 'Evidence-based conclusions', description: 'Linking observations back to specific sessions or user quotes when discussing findings. Helping ensure insights are grounded in evidence rather than assumptions or personal opinion. Noticing when evidence is thin or inconsistent and flagging this to the team.' },
          { id: 'ur-c1-g2-c5', name: 'Shaping usable outputs', description: 'Drafting sections of findings summaries or insight slides for review. Helping refine wording so findings are clear, accurate, and focused. Responding constructively to feedback on analysis and applying it in later work.' },
        ],
      },
      {
        id: 'ur-c1-g3',
        name: 'Communication of Research',
        summary: 'Communicating research purpose, progress, and findings clearly and credibly so that teams can understand and use evidence in decision-making.',
        components: [
          { id: 'ur-c1-g3-c1', name: 'Explaining research to audiences', description: 'Explaining the purpose of research, methods used, and what was explored when speaking with non-researchers. Answering basic questions about research activity. Adjusting language to suit the audience and avoiding jargon where it is not helpful.' },
          { id: 'ur-c1-g3-c2', name: 'Sharing findings in team settings', description: 'Talking through key findings in show-and-tells, playbacks, or team meetings. Structuring updates so that key points are clear and easy to follow. Highlighting what is most important rather than listing everything learned.' },
          { id: 'ur-c1-g3-c3', name: 'Creating clear research outputs', description: 'Producing slides, summaries, or insight write-ups using agreed templates, including appropriate use of frameworks like personas. Writing findings that reflect the evidence and avoid over-interpretation. Incorporating feedback to improve clarity and structure.' },
          { id: 'ur-c1-g3-c4', name: 'Engaging teams with evidence', description: 'Referring back to user evidence when discussing design or delivery decisions. Clarifying what research does or does not show when questions arise. Helping teammates connect research findings to ongoing work or next steps.' },
          { id: 'ur-c1-g3-c5', name: 'Building credibility through communication', description: 'Speaking confidently about research they were involved in, even when findings are still developing. Acknowledging uncertainty or limitations in the research when appropriate. Responding constructively to questions or challenge, with support if needed.' },
        ],
      },
      {
        id: 'ur-c1-g4',
        name: 'Team Collaboration & Multidisciplinary Working',
        summary: 'Working effectively within multidisciplinary delivery teams, contributing research perspective, and supporting shared outcomes.',
        components: [
          { id: 'ur-c1-g4-c1', name: 'Cross-disciplinary collaboration', description: 'Working day-to-day with designers, developers, delivery managers, business analysts, performance analysts, or policy colleagues. Taking part in sprint events such as stand-ups, planning, and retrospectives. Adapting ways of working to fit different team contexts.' },
          { id: 'ur-c1-g4-c2', name: 'Bringing research into discussions', description: 'Sharing user observations or evidence at relevant points in conversations. Helping the team understand user needs or pain points based on recent research. Asking questions that help link design or delivery decisions back to user evidence.' },
          { id: 'ur-c1-g4-c3', name: 'Active participation in team activities', description: 'Supporting workshops or meetings by note-taking, time-keeping, or managing activities. Helping structure or run small breakout activities with guidance. Contributing ideas or reflections during collaborative sessions.' },
          { id: 'ur-c1-g4-c4', name: 'Contributing to team culture', description: 'Sharing ideas or concerns in a respectful and constructive way. Listening to different viewpoints and being open to challenge or feedback. Managing disagreements professionally, with support where needed.' },
          { id: 'ur-c1-g4-c5', name: 'Dependable ways of working', description: 'Taking responsibility for agreed actions and following through. Communicating clearly if work is at risk, blocked, or delayed. Adjusting priorities to support team needs under guidance.' },
        ],
      },
      {
        id: 'ur-c1-g5',
        name: 'Ethical & Inclusive Research Practice',
        summary: 'Conducting user research responsibly, inclusively, and in line with ethical, legal, and organisational standards.',
        components: [
          { id: 'ur-c1-g5-c1', name: 'Ethical research conduct', description: 'Using approved consent approaches and ensuring participants understand what they are taking part in. Being mindful of participant wellbeing during sessions and adjusting approach if someone becomes uncomfortable. Recognising when research activities involve sensitive topics, vulnerability, or potential risk.' },
          { id: 'ur-c1-g5-c2', name: 'Participant data management', description: 'Storing recordings, notes, and personal data in line with agreed data-handling guidance. Using only approved tools and locations for sharing or storing research outputs. Being careful about what participant information is shared, and with whom.' },
          { id: 'ur-c1-g5-c3', name: 'Inclusive research practice', description: 'Supporting inclusive recruitment approaches considering accessibility needs or participant circumstances. Adapting research materials or sessions with guidance. Raising accessibility or inclusion considerations during planning or delivery discussions.' },
          { id: 'ur-c1-g5-c4', name: 'Ethical awareness & action', description: 'Flagging concerns about consent, safeguarding, or data use to a more senior researcher. Checking before proceeding if a situation falls outside agreed processes. Pausing or adjusting research activity when ethical concerns arise.' },
          { id: 'ur-c1-g5-c5', name: 'Bias & assumptions awareness', description: 'Reflecting on how personal assumptions might influence interpretation or behaviour during sessions. Being open to challenge or alternative interpretations from others. Acknowledging limitations in research findings due to sample, method, or context.' },
        ],
      },
      {
        id: 'ur-c1-g6',
        name: 'Professionalism & Ways of Working',
        summary: "Working in a reliable, organised, and professional way within Capgemini or a client's delivery environment.",
        components: [
          { id: 'ur-c1-g6-c1', name: 'Day-to-day reliability', description: 'Managing own tasks and time to meet agreed deadlines. Communicating early if work is blocked, delayed, or at risk. Balancing multiple pieces of work with guidance and support when priorities shift.' },
          { id: 'ur-c1-g6-c2', name: 'Working within established processes', description: 'Using agreed templates and formats for research outputs and documentation. Following delivery, reporting, and approval processes without needing close oversight. Keeping work organised so others can easily find or pick it up.' },
          { id: 'ur-c1-g6-c3', name: 'Quality and accuracy', description: 'Checking work for errors or omissions before sharing. Responding to feedback to improve clarity, structure, or quality. Taking pride in producing work that reflects well on the team and organisation.' },
          { id: 'ur-c1-g6-c4', name: 'Sound professional judgement', description: 'Knowing when to proceed independently and when to ask for guidance. Recognising situations that could have delivery, reputational, or client impact and flagging them. Handling sensitive information or situations with discretion.' },
          { id: 'ur-c1-g6-c5', name: 'Responsible use of tools & AI', description: 'Using AI tools to support efficiency or quality while following organisational guidance. Being transparent about where tools have been used in their work. Checking outputs for accuracy, bias, or risk before sharing.' },
        ],
      },
      {
        id: 'ur-c1-g7',
        name: 'Commercial & Organisational Awareness',
        summary: 'Understanding the delivery, commercial, and organisational context of work, and contributing appropriately within a consulting environment.',
        components: [
          { id: 'ur-c1-g7-c1', name: 'Understanding project context', description: 'Understanding the overall goals of the project and how research contributes to them. Being aware of who the client stakeholders are and how the team interacts with them. Recognising differences between client, supplier, and internal perspectives.' },
          { id: 'ur-c1-g7-c2', name: 'Time, scope & delivery awareness', description: 'Being mindful of timelines and scope when planning or delivering research activity. Recognising when requests or changes may impact time or budget and flagging this to others. Prioritising work in line with agreed delivery expectations.' },
          { id: 'ur-c1-g7-c3', name: 'Internal contribution', description: 'Providing accurate and timely information to support internal processes such as CV updates and timesheets. Supporting internal reporting or assurance activities when asked. Building foundational knowledge of internal processes and taking part in internal initiatives.' },
          { id: 'ur-c1-g7-c4', name: 'Spotting issues & opportunities', description: 'Flagging delivery risks or dependencies that could impact research or project outcomes. Spotting opportunities to reuse learning, assets, or approaches across work. Raising potential follow-on work or unmet client needs to more senior colleagues.' },
          { id: 'ur-c1-g7-c5', name: 'Reflecting Capgemini values', description: 'Communicating professionally with clients and internal stakeholders. Following organisational policies, processes, and standards. Being mindful of how behaviour and outputs reflect on the team and organisation.' },
        ],
      },
    ],
  },
  {
    id: 'ur-c2',
    title: 'User Researcher',
    grade: 'C2',
    discipline: 'User Research',
    description:
      'As a C2 User Researcher at Capgemini Invent, you independently deliver research sessions to a high standard, tailoring plans to context and keeping research delivery on track across a small workstream or sprint cycle. You move confidently from data to defensible insights and communicate findings clearly to teams and stakeholders. You are assessed across seven core competency areas specific to user research.',
    isUR: true,
    disciplineCompetencies: [],
    competencyGroups: [
      {
        id: 'ur-c2-g1',
        name: 'Research Delivery (Methods & Sessions)',
        summary: 'Independently delivering research sessions to a high standard, tailoring plans to context, and helping keep research delivery on track across a small workstream or sprint cycle.',
        components: [
          { id: 'ur-c2-g1-c1', name: 'Method selection & rationale', description: "Recommending appropriate methods based on research goals (e.g. attitudinal vs behavioural, generative vs evaluative). Shaping a lightweight approach when time is limited. Explaining trade-offs in method choice and adjusting the plan with the lead's input." },
          { id: 'ur-c2-g1-c2', name: 'Discussion guide adaptation', description: 'Improving existing topic guides so questions are clearer, flow better, and map to research objectives. Tailoring tasks or prompts to match the prototype or service being tested. Piloting guides and making quick refinements before sessions.' },
          { id: 'ur-c2-g1-c3', name: 'Confident end-to-end session delivery', description: 'Running sessions end-to-end while probing appropriately when important themes emerge. Handling tricky dynamics professionally such as dominant stakeholder observers, participants going off-topic, or sensitive moments. Adjusting moderation style to user needs.' },
          { id: 'ur-c2-g1-c4', name: 'Delivery ownership & risk management', description: 'Coordinating blocks of sessions including scheduling, logistics, materials readiness, and managing observers. Monitoring recruitment quality and acting when it is off. Spotting delivery risks early such as prototype instability or shifting scope, and proposing mitigations.' },
          { id: 'ur-c2-g1-c5', name: 'Delivery standards & team support', description: 'Keeping consent, recording, and documentation consistent across sessions, especially when multiple researchers are involved. Reviewing session notes from others and suggesting improvements. Supporting junior researchers to moderate sessions through pre-briefing and feedback.' },
        ],
      },
      {
        id: 'ur-c2-g2',
        name: 'Analysis & Sense-Making',
        summary: 'Analysing research data with increasing independence, identifying meaningful patterns and insights, and shaping evidence-based findings that teams can act on.',
        components: [
          { id: 'ur-c2-g2-c1', name: 'Structured data capture', description: 'Producing structured notes that highlight key behaviours, quotes, and moments of interest rather than verbatim transcription. Noting emerging patterns or hypotheses directly within notes. Maintaining consistency in how observations are recorded across multiple sessions or researchers.' },
          { id: 'ur-c2-g2-c2', name: 'Active analysis facilitation', description: 'Facilitating or co-facilitating group analysis activities such as affinity mapping, clustering, and thematic review. Grouping observations into meaningful categories and explaining the rationale. Helping the team move from a large volume of data to a focused set of themes.' },
          { id: 'ur-c2-g2-c3', name: 'Developing defensible insights', description: 'Framing insights that clearly describe underlying user needs, problems, or behaviours. Explaining why an insight matters in relation to user goals, service outcomes, or delivery decisions. Validating interpretations by checking against the data, including comparing qualitative themes with supporting quantitative indicators.' },
          { id: 'ur-c2-g2-c4', name: 'Thoughtful use of evidence', description: 'Clearly linking insights back to multiple pieces of supporting evidence. Calling out where findings are indicative rather than conclusive. Highlighting the limits of available evidence, such as small sample sizes, low survey response rates, or directional rather than statistically robust trends.' },
          { id: 'ur-c2-g2-c5', name: 'Turning analysis into usable findings', description: 'Drafting insight statements or findings that are concise, well-structured, and grounded in evidence. Refining findings based on feedback to improve clarity, accuracy, or relevance. Helping ensure findings are prioritised and framed in a way that supports decision-making.' },
        ],
      },
      {
        id: 'ur-c2-g3',
        name: 'Communication of Research',
        summary: 'Communicating research purpose, process, and findings clearly and confidently so that teams and stakeholders can understand, trust, and use research evidence.',
        components: [
          { id: 'ur-c2-g3-c1', name: 'Explaining research goals & methods', description: 'Describing the goals, scope, and methods of a piece of research to team members or stakeholders. Explaining why methods were chosen, including constraints or trade-offs. Clarifying what research will and will not be able to answer at a given stage.' },
          { id: 'ur-c2-g3-c2', name: 'Structured & engaging communication', description: 'Presenting key findings or insights in show-and-tells, playbacks, or workshops with little preparation support. Structuring communication so audiences can quickly grasp what was learned and why it matters. Tailoring the level of detail and language to suit different audiences.' },
          { id: 'ur-c2-g3-c3', name: 'Creating research artefacts', description: 'Producing insight summaries or slide decks that clearly articulate findings and supporting evidence. Writing in a concise, plain-English style that avoids unnecessary jargon. Organising outputs so they are easy to navigate and reuse by others.' },
          { id: 'ur-c2-g3-c4', name: 'Helping teams use evidence', description: 'Referring back to research findings during design or delivery discussions. Clarifying what the evidence suggests when different interpretations arise. Helping the team understand the implications or limitations of findings in decision-making contexts.' },
          { id: 'ur-c2-g3-c5', name: 'Professional & transparent communication', description: 'Confidently answering questions about research findings and their basis in evidence. Acknowledging uncertainty, gaps, or limitations in the research when appropriate. Responding constructively to challenge or critique, with support from more senior colleagues where needed.' },
        ],
      },
      {
        id: 'ur-c2-g4',
        name: 'Team Collaboration & Multidisciplinary Working',
        summary: 'Working confidently and constructively within multidisciplinary teams, contributing research perspective, and supporting effective collaboration across delivery activities.',
        components: [
          { id: 'ur-c2-g4-c1', name: 'Confident cross-disciplinary collaboration', description: 'Working closely with designers, developers, delivery managers, business analysts, performance analysts, or policy colleagues on shared goals. Actively contributing to team rituals such as stand-ups, planning sessions, and retrospectives. Adapting communication and working style to suit different team dynamics.' },
          { id: 'ur-c2-g4-c2', name: 'Bringing research into team discussions', description: 'Sharing relevant user evidence to help inform design or delivery decisions. Asking questions that help the team consider user needs, behaviours, or constraints. Helping clarify how recent research insights relate to current work or priorities.' },
          { id: 'ur-c2-g4-c3', name: 'Active workshop participation', description: 'Supporting the planning and running of workshops with guidance, such as helping structure activities and time-box discussions. Leading parts of collaborative sessions such as small group discussions or playback moments. Adapting facilitation approach in response to how sessions are going.' },
          { id: 'ur-c2-g4-c4', name: 'Constructive conflict resolution', description: 'Engaging in healthy debate while remaining respectful and open to other perspectives. Using research evidence to help navigate disagreements or uncertainty. Recognising when to escalate issues or seek support to resolve blockers.' },
          { id: 'ur-c2-g4-c5', name: 'Ownership & team support', description: 'Taking ownership of agreed actions and seeing them through. Keeping others informed about progress, risks, or changes that affect the team. Stepping in to support teammates when delivery pressures increase.' },
        ],
      },
      {
        id: 'ur-c2-g5',
        name: 'Ethical & Inclusive Research Practice',
        summary: 'Conducting user research responsibly, inclusively, and in line with ethical, legal, and organisational standards.',
        components: [
          { id: 'ur-c2-g5-c1', name: 'Confident ethical practice', description: 'Ensuring participants fully understand the purpose of the research and what participation involves. Adjusting approach during sessions to protect participant wellbeing. Anticipating ethical sensitivities based on the research topic, user group, or context.' },
          { id: 'ur-c2-g5-c2', name: 'Data governance & compliance', description: 'Applying agreed data handling, storage, and access controls consistently across a piece of work. Being mindful of how personal or sensitive information is recorded, shared, and referenced in outputs. Spotting potential data-handling risks and raising them early.' },
          { id: 'ur-c2-g5-c3', name: 'Inclusion & accessibility', description: 'Factoring accessibility or participation needs into recruitment, materials, or session design. Adapting research approaches to accommodate different user needs with guidance. Encouraging teams to consider whose perspectives may be missing or under-represented.' },
          { id: 'ur-c2-g5-c4', name: 'Ethical judgement & action', description: 'Recognising when research activity moves outside agreed ethical or governance parameters. Pausing, adapting, or escalating research activity when ethical concerns arise. Seeking advice or escalation appropriately rather than proceeding with uncertainty.' },
          { id: 'ur-c2-g5-c5', name: 'Reflective research practice', description: 'Considering how personal assumptions or framing could influence interpretation. Acknowledging limitations in samples, methods, or evidence when discussing findings. Encouraging critical discussion of findings within the team to avoid over-claiming.' },
        ],
      },
      {
        id: 'ur-c2-g6',
        name: 'Professionalism & Ways of Working',
        summary: 'Managing own work with confidence and reliability, applying sound professional judgement, and maintaining delivery quality within Capgemini ways of working.',
        components: [
          { id: 'ur-c2-g6-c1', name: 'Independent workload management', description: 'Managing own workload across multiple tasks or workstreams with minimal prompting. Re-prioritising work in response to changing delivery needs and deadlines. Communicating early and clearly when work is at risk, blocked, or dependent on others.' },
          { id: 'ur-c2-g6-c2', name: 'Delivery using standards & tools', description: 'Using agreed tools, templates, and standards without close oversight. Ensuring work is documented and organised so others can easily follow or reuse it. Following delivery, approval, and assurance processes across a piece of work.' },
          { id: 'ur-c2-g6-c3', name: 'Professional output quality', description: 'Reviewing work before sharing to ensure it is clear, complete, and accurate. Responding to feedback and applying it to improve quality over time. Maintaining consistent standards across outputs, even under delivery pressure.' },
          { id: 'ur-c2-g6-c4', name: 'Professional judgement & discretion', description: 'Judging when to proceed independently and when to seek support or escalation. Recognising delivery, client, or reputational risks and raising them appropriately. Handling sensitive information or situations with discretion.' },
          { id: 'ur-c2-g6-c5', name: 'Responsible tool & AI use', description: 'Using AI tools to improve efficiency or quality in line with guidance. Being transparent about tool usage and checking outputs for errors, bias, or risk. Applying judgement when automation is helpful and when it is not appropriate.' },
        ],
      },
      {
        id: 'ur-c2-g7',
        name: 'Commercial & Organisational Awareness',
        summary: 'Operating with a clear understanding of delivery, commercial, and organisational context, and contributing thoughtfully within a consulting environment.',
        components: [
          { id: 'ur-c2-g7-c1', name: 'Understanding project context', description: 'Understanding project goals, constraints, and how research supports them. Being aware of key client stakeholders and their interests. Recognising how research outputs may be used by different audiences.' },
          { id: 'ur-c2-g7-c2', name: 'Scope, time & delivery consideration', description: 'Being mindful of scope, timelines, and budget when proposing or delivering research activity. Identifying when requests or changes may impact delivery expectations. Flagging potential implications to more senior colleagues early.' },
          { id: 'ur-c2-g7-c3', name: 'Internal & account contributions', description: 'Providing accurate information to support staffing, bids, or planning activities. Supporting internal reporting, assurance, or governance tasks. Contributing to reusable assets or learning that supports wider account or practice goals.' },
          { id: 'ur-c2-g7-c4', name: 'Noticing & raising issues', description: 'Flagging emerging delivery risks based on research progress or client signals. Identifying opportunities to extend learning, reuse assets, or support follow-on work. Sharing observations with senior colleagues to inform decisions.' },
          { id: 'ur-c2-g7-c5', name: 'Professional conduct & Capgemini values', description: 'Communicating professionally and confidently with clients and internal stakeholders. Being mindful of how behaviour and outputs reflect on the organisation. Following organisational policies and expectations in client environments.' },
        ],
      },
    ],
  },
  {
    id: 'ur-c3',
    title: 'Senior User Researcher',
    grade: 'C3',
    discipline: 'User Research',
    description:
      "As a C3 Senior User Researcher at Capgemini Invent, you own research delivery across a workstream, shaping the research approach, maintaining quality at scale, and developing others' research capability. You lead analysis and sense-making, influence decisions through credible communication, and take line management responsibility for more junior researchers. You are assessed across seven core competency areas specific to user research.",
    isUR: true,
    disciplineCompetencies: [],
    competencyGroups: [
      {
        id: 'ur-c3-g1',
        name: 'Research Delivery (Methods & Sessions)',
        summary: "Owning research delivery across a workstream, shaping the research approach, maintaining quality at scale, and developing others' research delivery capability alongside client responsibilities.",
        components: [
          { id: 'ur-c3-g1-c1', name: 'Setting the research delivery approach', description: 'Defining the overall method mix and cadence for a phase of work (e.g. when to explore, test, or validate). Making informed decisions about scope, sample, and depth based on delivery risk, timelines, and design maturity. Explaining and defending research trade-offs to stakeholders.' },
          { id: 'ur-c3-g1-c2', name: 'Designing sessions for clear evidence', description: 'Designing research guides and tasks that directly align with research goals and hypotheses. Ensuring tasks are grounded in real user journeys using prior data, analytics, or operational evidence. Reviewing and refining materials produced by others to reduce bias and ensure sessions produce consistent data.' },
          { id: 'ur-c3-g1-c3', name: 'Handling challenging research contexts', description: 'Moderating sessions involving vulnerable users, sensitive topics, or high organisational risk. Managing stakeholder observers to protect session quality and participant experience. Adapting effectively when sessions do not go to plan, such as prototype failures or unexpected participant behaviour.' },
          { id: 'ur-c3-g1-c4', name: 'Accountable research delivery', description: 'Coordinating multi-day or multi-researcher research activity, including recruitment quality, logistics, and materials readiness. Identifying delivery or quality risks early and acting to mitigate them. Setting expectations for session delivery, note quality, and documentation, and intervening when standards risk slipping.' },
          { id: 'ur-c3-g1-c5', name: 'Building delivery capability', description: 'Coaching C1s and C2s on moderation technique, probing, accessibility, and session control. Creating supported stretch opportunities and providing clear, constructive feedback. Leading or contributing to internal initiatives that improve research delivery, such as standards, templates, and shared learning.' },
        ],
      },
      {
        id: 'ur-c3-g2',
        name: 'Analysis & Sense-Making',
        summary: "Leading analysis and sense-making across a workstream, ensuring analytical rigour, shaping insight direction, and developing others' analytical capability.",
        components: [
          { id: 'ur-c3-g2-c1', name: 'Defining the analysis approach', description: 'Designing the overall analysis approach for a phase of work, including how data will be grouped, prioritised, and validated. Clarifying what good evidence and useful insight look like for the context. Making intentional choices about depth, granularity, and confidence thresholds.' },
          { id: 'ur-c3-g2-c2', name: 'Guiding teams through synthesis', description: 'Facilitating analysis sessions that move teams beyond surface-level themes. Helping teams resolve ambiguity or disagreement using evidence and reasoning. Keeping analysis focused on user needs and service implications, not just observations.' },
          { id: 'ur-c3-g2-c3', name: 'Owning insight quality', description: 'Framing insights that clearly articulate underlying user needs or behaviours. Prioritising insights based on impact, risk, or relevance to decisions. Challenging weak or unsupported insights and strengthening them with evidence.' },
          { id: 'ur-c3-g2-c4', name: 'Evidence interpretation & judgement', description: 'Being explicit about confidence levels, assumptions, and limitations in findings. Identifying gaps or weaknesses in the evidence and advising on next steps. Making judgement calls when evidence is partial, contradictory, or time-bound.' },
          { id: 'ur-c3-g2-c5', name: 'Coaching & improving analysis practice', description: 'Coaching C1s and C2s on moving from themes to insights. Providing structured feedback on analysis outputs and insight statements. Leading or contributing to internal work that improves analysis practice, such as guidance, templates, and exemplars.' },
        ],
      },
      {
        id: 'ur-c3-g3',
        name: 'Communication of Research',
        summary: 'Shaping and delivering research narratives that influence decisions, build trust in evidence, and support others to communicate with confidence.',
        components: [
          { id: 'ur-c3-g3-c1', name: 'Framing research narratives', description: 'Crafting clear storylines that link user insight to delivery or strategic implications. Deciding what level of detail different audiences need and why. Framing research outputs around decisions, risks, or trade-offs rather than findings alone.' },
          { id: 'ur-c3-g3-c2', name: 'High-stakes communication', description: 'Leading research playbacks with senior stakeholders or clients. Handling challenge or scepticism confidently using evidence. Explaining uncertainty or limitations without undermining trust in the work.' },
          { id: 'ur-c3-g3-c3', name: 'Helping teams act on research', description: 'Helping teams understand what research does and does not suggest. Supporting prioritisation or decision-making discussions using evidence. Making explicit links between insights and recommended actions or options.' },
          { id: 'ur-c3-g3-c4', name: 'Communication judgement', description: 'Choosing the right moment or forum to share sensitive or unfinished findings. Adapting communication style to political, organisational, or delivery context. Knowing when to simplify, when to go deeper, and when to hold back.' },
          { id: 'ur-c3-g3-c5', name: 'Building team communication capability', description: 'Coaching others on storytelling, structure, and audience-focused communication. Reviewing and improving research decks, summaries, or written outputs. Leading internal sessions or sharing examples of effective research communication.' },
        ],
      },
      {
        id: 'ur-c3-g4',
        name: 'Team Collaboration & Multidisciplinary Working',
        summary: 'Leading collaboration from a user research perspective, enabling effective multidisciplinary working, and supporting team performance and development.',
        components: [
          { id: 'ur-c3-g4-c1', name: 'Research lead in multidisciplinary teams', description: 'Setting clear expectations for how and when research informs design and delivery. Helping teams plan work that appropriately sequences research and delivery activity. Acting as the main research point of contact within the team.' },
          { id: 'ur-c3-g4-c2', name: 'Enabling effective team working', description: 'Facilitating alignment or prioritisation discussions where user needs, delivery constraints, and trade-offs need to be balanced. Recognising when misalignment or tension is affecting progress and addressing it constructively. Supporting teams through ambiguity or uncertainty using evidence and judgement.' },
          { id: 'ur-c3-g4-c3', name: 'Managing disagreement & differing views', description: 'Using research evidence to reframe debate or resolve disagreement. Managing differing stakeholder expectations within team settings. Knowing when to escalate issues or seek support to unblock progress.' },
          { id: 'ur-c3-g4-c4', name: 'Supporting others in team environments', description: 'Supporting line reports or junior researchers to operate confidently in multidisciplinary teams. Giving feedback on collaboration, communication style, or influence. Helping others reflect on and learn from challenging team dynamics.' },
          { id: 'ur-c3-g4-c5', name: 'Strengthening collaboration beyond delivery', description: 'Highlighting patterns that span multiple teams or services and working with senior stakeholders to align priorities or drive coordinated action. Sharing learning about effective collaboration across the practice. Supporting recruitment, onboarding, or capability-building activities that strengthen team working.' },
        ],
      },
      {
        id: 'ur-c3-g5',
        name: 'Ethical & Inclusive Research Practice',
        summary: 'Owning ethical and inclusive research standards across a workstream, exercising strong judgement, and supporting others to develop ethical confidence.',
        components: [
          { id: 'ur-c3-g5-c1', name: 'Setting ethical standards', description: 'Anticipating ethical, safeguarding, or inclusion risks early in planning. Setting clear expectations about consent, participant wellbeing, and data use. Advising teams on ethical considerations and trade-offs.' },
          { id: 'ur-c3-g5-c2', name: 'Ethical judgement under pressure', description: 'Making decisions to adapt, pause, or reshape research activity in response to ethical concerns. Balancing delivery constraints with participant wellbeing and inclusion. Confidently explaining ethical decisions to stakeholders.' },
          { id: 'ur-c3-g5-c3', name: 'Ensuring inclusion across the lifecycle', description: 'Considering whose voices may be missing and adjusting approaches accordingly. Supporting inclusive recruitment and accessible session design as standard practice. Encouraging teams to consider accessibility and inclusion when interpreting findings.' },
          { id: 'ur-c3-g5-c4', name: 'Building ethical awareness in others', description: 'Coaching others on recognising and responding to ethical concerns. Supporting junior researchers after challenging or sensitive sessions. Using line management conversations to reinforce ethical responsibility and reflection.' },
          { id: 'ur-c3-g5-c5', name: 'Strengthening ethical practice organisation-wide', description: 'Leading or contributing to internal guidance on ethics, safeguarding, or inclusion. Sharing learnings or case studies to build collective ethical maturity. Supporting practice-level assurance or governance activities.' },
        ],
      },
      {
        id: 'ur-c3-g6',
        name: 'Professionalism & Ways of Working',
        summary: 'Being accountable for delivery quality, people management, and internal responsibilities, while modelling strong professional judgement and sustainable ways of working.',
        components: [
          { id: 'ur-c3-g6-c1', name: 'Accountability for delivery quality', description: 'Setting expectations for output quality, documentation, and ways of working across a workstream. Ensuring work meets both client and Capgemini standards under delivery pressure. Intervening when quality risks undermining outcomes or credibility.' },
          { id: 'ur-c3-g6-c2', name: 'Confident professional decision-making', description: 'Making judgement calls when trade-offs are required in scope, timing, or confidence. Knowing when to escalate issues and when to resolve them independently. Handling sensitive delivery, client, or people situations with discretion.' },
          { id: 'ur-c3-g6-c3', name: 'Supporting people performance & wellbeing', description: 'Running effective 1:1s focused on development, feedback, and support. Helping individuals set goals, build evidence, and progress professionally. Managing workload and wellbeing responsibly, escalating concerns where needed.' },
          { id: 'ur-c3-g6-c4', name: 'Balancing competing priorities', description: 'Managing competing priorities across client work and internal commitments. Being transparent about capacity and trade-offs. Supporting others to balance responsibilities realistically and sustainably.' },
          { id: 'ur-c3-g6-c5', name: 'Internal contribution & improvement', description: 'Leading or contributing to internal initiatives such as recruitment, onboarding, and capability building. Improving practice-level processes, templates, or quality assurance approaches. Sharing learning that improves consistency and efficiency across teams.' },
        ],
      },
      {
        id: 'ur-c3-g7',
        name: 'Commercial & Organisational Awareness',
        summary: 'Operating with a clear understanding of delivery, commercial, and organisational context, and actively contributing within a consulting environment.',
        components: [
          { id: 'ur-c3-g7-c1', name: 'Positioning research value', description: 'Framing research in terms of client risk, outcomes, and decision-making. Helping teams understand how insights will be used by different stakeholders. Advising on where research effort will have the greatest impact.' },
          { id: 'ur-c3-g7-c2', name: 'Commercial judgement in delivery', description: 'Recognising scope, timeline, or budget implications of research decisions. Advising on trade-offs when delivery constraints shift. Flagging commercial or delivery risks early to account leadership.' },
          { id: 'ur-c3-g7-c3', name: 'Supporting business & account needs', description: 'Contributing to bids, proposals, or shaping work through method inputs, estimates, and case studies. Supporting account planning or assurance activities. Helping coordinate research input across multiple pieces of work.' },
          { id: 'ur-c3-g7-c4', name: 'Spotting issues affecting value & growth', description: 'Identifying follow-on work or unmet client needs based on research activity. Recommending reuse of assets or learning across accounts. Flagging organisational or capability risks that may affect delivery.' },
          { id: 'ur-c3-g7-c5', name: 'Building consulting confidence in others', description: 'Coaching juniors on consulting behaviours and expectations. Helping others understand how to operate professionally with clients. Sharing insight into how Capgemini works across governance, accounts, and opportunities.' },
        ],
      },
    ],
  },
];

export const GRADE_LABELS: Record<Grade, string> = {
  C1: 'C1 · Associate Consultant',
  C2: 'C2 · Consultant',
  C3: 'C3 · Senior Consultant',
  C4: 'C4 · Managing Consultant',
};