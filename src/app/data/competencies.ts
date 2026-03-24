export type Grade = 'C2' | 'C3' | 'C4';
export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Competency {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  title: string;
  grade: Grade;
  discipline: string;
  description: string;
  disciplineCompetencies: Competency[];
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
];

export const GRADE_LABELS: Record<Grade, string> = {
  C2: 'C2 · Consultant',
  C3: 'C3 · Senior Consultant',
  C4: 'C4 · Managing Consultant',
};