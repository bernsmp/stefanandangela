// Angela's detailed pattern data extracted from her Cognitive Fingerprint analysis
// This provides rich frequency/evidence data that supplements the table parsing

export interface PatternDetail {
  name: string;
  frequencyData?: string;
  evidenceQuote?: string;
  processingSpeed?: string;
  strategicValue?: string;
  blindSpotRisk?: string;
  description?: string;
}

export const angelaPatternDetails: Record<string, PatternDetail> = {
  'metrics-to-decision bridge': {
    name: 'Metrics-to-Decision Bridge',
    frequencyData: '80%+ of strategic discussions end with immediate attention allocation',
    processingSpeed: '5-8 seconds from number to decision',
    evidenceQuote: 'Converts numbers to attention decisions in 5-8 seconds',
    strategicValue: 'Rapid strategic prioritization without deliberation',
    description: 'Automatically converts any metric into an immediate attention allocation decision. No deliberation on what matters because the framework executes automatically.',
  },
  'reverse engineering': {
    name: 'Reverse Engineering',
    frequencyData: 'Used in 100% of goal-setting conversations',
    evidenceQuote: 'Give me the destination, not a guided tour of the route.',
    strategicValue: 'Works backward from goal with milestones, always goal-first and execution-oriented',
    description: 'Works backward from desired outcome, identifying milestones and dependencies. Always goal-first, execution-oriented approach.',
  },
  'quantification reflex': {
    name: 'Quantification Reflex',
    frequencyData: 'Converts ANY problem to numbers within 30 seconds',
    processingSpeed: '<30 seconds',
    evidenceQuote: '3000 emails... 70% open... 2100 open, 3% convert... 63 patients... $6,300 a month loss.',
    strategicValue: 'Instant impact assessment enables rapid prioritization',
    blindSpotRisk: 'When data does not exist, decisions stall or get skipped',
    description: 'Automatically converts any problem to specific numbers within 30 seconds, even without complete data. Operates without conscious awareness.',
  },
  'decision-purpose filter': {
    name: 'Decision-Purpose Filter',
    frequencyData: 'Filters useless metrics in <30 seconds',
    processingSpeed: '<30 seconds',
    evidenceQuote: 'What decision are we going to make off of that?',
    strategicValue: 'Eliminates tracking theater and unnecessary complexity',
    blindSpotRisk: 'May miss early-stage research or weak signals without immediate decision utility',
    description: 'Immediately filters any activity or metric that does not lead to a clear decision. Rejects tracking without enforcement mechanism.',
  },
  'ownership assignment sequence': {
    name: 'Ownership Assignment Sequence',
    frequencyData: '100% of decisions lead to ownership assignment',
    processingSpeed: '3 seconds to assign owner',
    evidenceQuote: 'Assigns owners within 3 seconds without questioning capability',
    strategicValue: 'Zero ambiguity on accountability',
    blindSpotRisk: 'May overload high performers without bandwidth discussion',
    description: 'Every decision automatically triggers ownership assignment within 3 seconds. Assumes competence without pre-limiting capacity.',
  },
  '"okay cool" momentum generator': {
    name: '"Okay Cool" Momentum Generator',
    frequencyData: '15-20 instances per hour, 73% at transition points',
    processingSpeed: 'Saves 7-10 minutes per hour',
    evidenceQuote: 'Used as micro-transition tool to maintain meeting velocity',
    strategicValue: 'Accumulated micro-time savings prevent meeting bloat',
    description: 'Unconscious verbal pattern that maintains meeting velocity. Used 15-20 times per hour at key transition points.',
  },
  'loom-over-live documentation': {
    name: 'Loom-Over-Live Documentation',
    frequencyData: 'Preferred for 90%+ of process documentation',
    evidenceQuote: 'I will never read blocks of text because I do not have time',
    strategicValue: 'Async documentation she can consume on demand',
    description: 'Prefers video documentation over live meetings or written docs. Enables consumption at her own pace and timing.',
  },
  'visual system builder': {
    name: 'Visual System Builder',
    frequencyData: 'Applied to every operational system',
    strategicValue: 'Creates clear mental models for complex processes',
    description: 'Unconsciously creates visual representations of systems and processes. Builds clear mental models.',
  },
  'logic-test gatekeeper': {
    name: 'Logic-Test Gatekeeper',
    frequencyData: 'Pass/fail in <1 second on every suggestion',
    processingSpeed: '<1 second',
    evidenceQuote: 'Backlog volume. Does not really make sense to me.',
    strategicValue: 'Instant assessment prevents time waste on illogical ideas',
    blindSpotRisk: 'Binary filter may prematurely dismiss good ideas from unfamiliar frames',
    description: 'Instant pass/fail determination on suggestions. Once someone is mentally filed as limited, hard to rebuild trust.',
  },
  'reliability-scalability-synergy triad': {
    name: 'Reliability-Scalability-Synergy Triad',
    frequencyData: 'Applied to every hiring and role decision',
    strategicValue: 'Unconscious algorithm for talent evaluation',
    description: 'Three-factor unconscious algorithm for evaluating people and roles. Operates automatically without articulation.',
  },
  'time-scarcity operating system': {
    name: 'Time-Scarcity Operating System',
    frequencyData: 'Active 100% of working hours',
    evidenceQuote: 'There is absolutely nothing in this business that I do not think I am capable of solving.',
    strategicValue: 'Extreme efficiency and pressure resistance',
    blindSpotRisk: 'Time-scarcity blocks proper delegation and training investment',
    description: 'Core operating system that treats time as the scarcest resource. Drives extreme efficiency but can block proper training.',
  },
  'comprehension checkpoint system': {
    name: 'Comprehension Checkpoint System',
    frequencyData: '"Does that make sense?" fires every 2-3 minutes during training',
    processingSpeed: 'Every 2-3 minutes',
    strategicValue: 'Ensures understanding without explicit teaching',
    description: 'Unconscious pattern of checking comprehension during explanations. Feels like "being thorough" but is systematic.',
  },
  'impact-first diagnostic': {
    name: 'Impact-First Diagnostic',
    frequencyData: '100% of problem discussions include impact quantification BEFORE solution',
    evidenceQuote: 'That sucks. What is the path? Go handle it.',
    strategicValue: 'Impact calculation determines response urgency in real-time',
    description: 'Every problem discussion must include impact quantification before any solution discussion. Crisis response pattern.',
  },
  'complete feedback loop': {
    name: 'Complete Feedback Loop',
    frequencyData: 'Applied to every delegated task',
    strategicValue: 'Ensures closure on all initiatives',
    description: 'Unconscious sequence that ensures every delegated task has defined feedback loop and completion criteria.',
  },
  'cascade effect map': {
    name: 'Cascade Effect Map',
    frequencyData: 'Active during all strategic discussions',
    strategicValue: 'Maintains mental model of how every metric affects others in chain reactions',
    description: 'Maintains active mental model of how metrics and decisions cascade through the organization.',
  },
  'critical windows framework': {
    name: 'Critical Windows Framework',
    frequencyData: 'Internalized timing for all key processes',
    strategicValue: 'Knows exactly when decisions must be made',
    description: 'Internalized framework for critical decision windows. Knows timing without conscious calculation.',
  },
  'data trust hierarchy': {
    name: 'Data Trust Hierarchy',
    frequencyData: '5-tier system applied to all data sources',
    strategicValue: 'Unconscious filtering of data quality',
    description: 'Operates a 5-tier trust system for data sources without articulating it. Automatically weights information.',
  },
  'impact-based triage': {
    name: 'Impact-Based Triage',
    frequencyData: 'Energy increases when calculating large impact numbers',
    processingSpeed: 'Real-time during crisis',
    evidenceQuote: 'When you look at it that way, that is why I am like, okay, that sucks, but it is okay, we will be okay.',
    strategicValue: 'Wartime operator - shines when stakes are high',
    description: 'Crisis prioritization based on impact calculation. Energy and focus increase with stake level.',
  },
  'test-first risk filter': {
    name: 'Test-First Risk Filter',
    frequencyData: 'Applied to every new initiative',
    strategicValue: 'Automatic risk assessment before commitment',
    description: 'Unconsciously evaluates risk through testing lens before full commitment. Prefers small tests over big plans.',
  },
  'executive-operational firewall': {
    name: 'Executive-Operational Firewall',
    frequencyData: '100% of operational tasks delegated immediately',
    evidenceQuote: 'I do not want to own execution.',
    strategicValue: 'Role protection is absolute - maintains strategic capacity',
    blindSpotRisk: 'Will not invest time to properly train others, creating persistent bottlenecks',
    description: 'Absolute firewall between executive and operational roles. Delegates all execution without exception.',
  },
};

// Helper to find pattern details by name (fuzzy match)
export function findPatternDetails(patternName: string): PatternDetail | undefined {
  const normalized = patternName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  // Try exact match first
  if (angelaPatternDetails[normalized]) {
    return angelaPatternDetails[normalized];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(angelaPatternDetails)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
    // Also try matching on the name field
    const nameNormalized = value.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    if (normalized.includes(nameNormalized) || nameNormalized.includes(normalized)) {
      return value;
    }
  }
  
  return undefined;
}

